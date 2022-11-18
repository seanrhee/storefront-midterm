// Create HTML for Messaging
const recipientDetails = function (page) {
  const $recipientInfo = $(`

  <div id="ad-info">
  <div class="ad-display">
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
    $.get('/api/messages/:id').then((result) => {
      renderMessages(result.page);
    });
  }
  loadMessages();
});
