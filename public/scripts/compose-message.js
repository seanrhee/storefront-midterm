$(document).ready(() => {
  console.log('ready!');

  const createChatBox = function (messages) {
    // Find the user's id in the url parameters to render messages as recipient
    const pathname = window.location.pathname.split("/");
    const id = pathname[pathname.length - 1];

    const recipient = `${messages.recipient_id}`;
    const creator = `${messages.creator_id}`;

    if (id === creator) {
      const $message = $(`
          <div class="sent"><b>
          ${messages.first_name} ${messages.last_name}: </b> ${messages.message}
          </div>
          <date class="sent-date">${timeago.format(messages.created_at)}</date>
    `);
      return $message;
    }

    if (id === recipient) {
      const $message = $(`
          <div class="received">
          <b>You:</b> ${messages.message}
          </div>
          <date class="received-date">${timeago.format(messages.created_at)}</date>
    `);
      return $message;
    }
  }

  const renderMessages = function (messages) {
    for (const message of messages) {
      $('#message-history').prepend(createChatBox(message));
    }
  };

  function loadMessages() {
    const pathname = window.location.pathname.split("/");
    const id = pathname[pathname.length - 1];

    $.get(`/api/messages/${id}/`).then((result) => {
      renderMessages(result.page);
    })
  }
  loadMessages();
});

