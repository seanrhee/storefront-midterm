// Create HTML for Inbox
const createInboxElement = message => {
  const $inbox = $(`
  <div class="message-container">
   <div class="contact-container">
    <div class="user-name"> ${message.first_name} ${message.last_name} </div>
      <div class="contact">
        <div class="phone-number"> ${message.phone_number} </div>
        <div class="email"> ${message.email} </div>
        <div id="address"> ${message.city}, ${message.province}</div>
      </div>
    </div>
    <div class="response">
      <article class="message">${message.message}</article>
      <form class="reply" action="/compose-message/${message.creator_id}" method="GET">
        <button type="submit" id="reply-button">Reply</button>
      </form>
    </div>
    <date class="date"> Received ${timeago.format(message.created_at)} </date>
   </div>
  </div>
    `);
  return $inbox;
}

const renderMessages = messages => {
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
