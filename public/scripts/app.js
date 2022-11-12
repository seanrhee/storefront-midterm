// Client facing scripts here
$(document).ready(() => {
  const createItemElement = function(item) {
    const $item = $(`
      <div class="item-div">
          <img class="image-thumb" src=${item.photo_url} alt="item thumbnail">
          <div class="item-info">
            <h3>$${item.price_per_item}</h3>
            <h4 class="item-title">${item.title}</h4>
          </div>
        </div>
      </a>
    `);

    console.log(`${item} has been created`);

    return $item;
  }

  const renderItems = function(items) {
    for (const item of items) {
      $('.item-container').append(createItemElement(item));
      console.log(`${item} has been prepended`);
    }
  }


  const loadItems = function() {
    $.get('/api/items', (data) => {
      renderItems(data.items)
    })
  }

  loadItems();


  $('#categories').hover(function () {
      // over
      $('#category-dropdown').css('display', 'flex');
    }, function () {
      // out
      $('#category-dropdown').css('display', 'none');
    }
  );

  $('#category-dropdown').hover(function () {
    // over
    $('#category-dropdown').css('display', 'flex');
  }, function () {
      // out
      $('#category-dropdown').css('display', 'none');
    }
  );
});