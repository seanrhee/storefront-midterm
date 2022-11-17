// Client facing scripts here


// Create HTML for Inbox
const createInboxElement = function (message) {
  const $inbox = $(`
    <div class="message">
     <img src="${message.photo_url}" class="item-picture">
       <div class="contact-container">
       <div class="name-and-date">
         <div class="user-name"> ${message.first_name} ${message.last_name} </div>
         <date class="date"> ${timeago.format(message.created_at)} </date>
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
  function loadMessages() {
    $.get('/api/messages').then((result) => {
      renderMessages(result.messages);
    });
  }
  loadMessages();
});



////////////////////////////////////////////////////////////////
// FOR COMPOSE-MESSAGE
////////////////////////////////////////////////////////////////

// Create HTML for Messaging
const recipientDetails = function (page) {
  const $recipientInfo = $(`

  <div id="ad-info">
  <div class="ad-display">
    <img src="photo-here" class="item-picture">
    <div class="item-price">price here</div>
  </div>
    <div class="ad-title">title here</div>
  </div>
  <div class="recipient-name">${page.creator_id}</div>

    `);
  return $recipientInfo;
}

// Render the messages
const renderPage = function (page) {
    $('#message-container').append(recipientDetails(page));
};

$(() => {
  function loadMessages() {
    $.get('/api/messages/:creator_id').then((result) => {
      renderMessages(result.page);
    });
  }
  loadMessages();
});
