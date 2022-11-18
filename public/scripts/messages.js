// Create HTML for Inbox
const createInboxElement = function (message) {
  const $inbox = $(`

  <div class="message-container">

  <div class="contact-container">
  <div class="contact">
  <div class="phone-number"> ${message.phone_number} </div>
  <div class="email"> ${message.email} </div>
  <div id="address"> ${message.city} ${message.province}</div>
  </div>
  <div class="user-name"> ${message.first_name} ${message.last_name} </div>
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
