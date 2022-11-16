// Client facing scripts here

// Create HTML for Inbox
const createInboxElement = function (message) {
  const $inbox = $(`
    <div class="message">
     <img src="${message.photo_url}" class="item-picture">
       <div class="contact-container">
       <div class="name-and-date">
         <div class="user-name"> ${message.full_name} </div>
         <date class="date"> ${timeago.format(message.date_sent)} </date>
         </div>
         <article>${message.message}</article>
       </div>
     <form class="reply" action="/compose-message" method="GET">
       <button type="submit" id="reply-button">Reply</button>
     </form>
    </div>
    `);
  return $inbox;
}

const renderMessages = function (messages) {
  for (const message of messages) {
    $('.inbox-container').append(createInboxElement(message));
  }
};


$(() => {
  function loadMessages() {
    $.get('/api/messages').then((result) => {
      renderMessages(result.messages);
    });
  }
  loadMessages();

  $('#reply-button').click(function() {
    $.get('compose-message');
  })

});
