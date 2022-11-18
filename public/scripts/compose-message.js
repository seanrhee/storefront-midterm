
$(document).ready(() => {
  console.log('ready!');

  const createChatBox = function (messages) {
    // Find the user_id in the url parameters for the recipient
    const pathname = window.location.pathname.split("/");
    const id = pathname[pathname.length - 1];
    
    const recipient = `${messages.recipient_id}`;
    const creator = `${messages.creator_id}`;

    if (id === creator) {
      const $message = $(`
          <div class="sent">
          ${messages.first_name} ${messages.last_name}
          ${messages.message}
          </div>
    `);
      return $message;
    }

    if (id === recipient) {
      const $message = $(`
          <div class="received">
          ${messages.first_name} ${messages.last_name}
          ${messages.message}
          </div>
    `);
      return $message;
    }
  }

  const renderMessages = function (messages) {
    for (const message of messages) {
      $('#message-history').append(createChatBox(message));
    }
  };

  function loadMessages() {
    const pathname = window.location.pathname.split("/");
    const id = pathname[pathname.length - 1];

    $.get(`/api/messages/${id}/`).then((result) => {
      renderMessages(result.page);
    });
  }

  loadMessages();
});

