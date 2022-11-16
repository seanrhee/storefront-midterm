// Client facing scripts here
$(() => {
  const createInboxElement = function(message) {
    const $message = $(`
    <div class="message-container">
     <img src="${message.photo_url}" class="item-picture">
       <div class="contact-container">
         <div class="user-name"> ${message.full_name} </div>
         <dialogue>${message.message}</dialogue>
       </div>
     <form class="reply" action="/compose-message" method="GET">
       <button type="submit" id="reply-button">Reply</button>
     </form>
    </div>
    `);

    const renderMessages = function(inbox) {
      for (const message of inbox) {
        $('.inbox-container').append(createInboxElement(message));
      }
    }

    async function loadMessages(userId) {
      console.log('load messages')
      if (userId) {
        return $.get(`/api/items/${category}`, (data) => {
          renderItems(data.items[page]);
        });
      }
      return $.get('/api/items', (data) => {
        renderItems(data.items[page]);
      });
    }

    return $item;
  }

});



//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });
