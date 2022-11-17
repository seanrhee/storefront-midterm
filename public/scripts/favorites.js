// Client facing scripts here
$(document).ready(() => {
  const createItemElement = function (item) {
    const $item = $(`
      <a class="item-link" href="/items/${item.id}">
        <div class="item-div">
            <img class="image-thumb" src=${item.photo_url} alt="item thumbnail">
            <div class="item-info">
              <h3>$${item.price_per_item}</h3>
              <h4 class="item-title">${item.title}</h4>
            </div>
          </div>
      </a>
    `);

    return $item;
  }

  const renderItems = function (items) {
    for (const item of items) {
      $('.favorite-container').append(createItemElement(item));
    }
  }

  renderItems(items);

})
