// Create HTML for Inbox
const createInboxElement = function (message) {
  const $inbox = $(`

       <div class="contact-container">

         <div class="user-name"> ${message.first_name} ${message.last_name} </div>
         <div class="email"> ${message.email} </div>
         <div class="phone-number"> ${message.phone_number} </div>
         <date class="date"> ${timeago.format(message.created_at)} </date>

         <div id="address">
         ${message.street, message.city, message.province, message.country, message.postal_code}
         </div>

         </div>
         <article>${message.message}</article>
       </div>
     <form class="reply" action="/compose-message/${message.creator_id}" method="GET">
       <button type="submit" id="reply-button">Reply</button>
     </form>
    </div>
    `);
  return $inbox;
}

// Render the messages
const renderMessages = function (messages) {
  for (const message of messages) {
    $('.inbox-container').append(createInboxElement(message));
  }
};

$(() => {
  console.log("ready!")
  function loadMessages() {

    $.get('/api/messages').then((result) => {
      renderMessages(result.messages);
    });
  }

  loadMessages();
});


      // console.log(result);
      // rows: [
      //   {
      //     id: 44,
      //     first_name: 'Derward',
      //     last_name: 'Birden',
      //     email: 'dbirden17@vinaora.com',
      //     password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u',
      //     phone_number: '828-516-4687',
      //     street: '3104 Sullivan Lane',
      //     city: 'Kamloops',
      //     province: 'British Columbia',
      //     country: 'Canada',
      //     postal_code: 'H9P3S9'
      //   }
      // ],
