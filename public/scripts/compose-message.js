// Create HTML for Messaging
const createChatBox = function (messages) {
  const $message = $(`

  <div class="sent">
  ${messages.first_name}
  </div>
  <div class="received">received</div>


    `);
  return $message;
}

const renderMessages = function (messages) {
  for (const message of messages) {
    $('#message-history').append(createChatBox(message));
  }
};

$(() => {
  const userId = $(window.location.pathname.slice(13))
  console.log(userId)
  console.log('document ready');
  function loadMessages(id) {
    $.get(`/api/messages/${id}`).then((result) => {
      console.log(result);
      renderMessages(result.page);
    });
  }
  loadMessages(id);
});




