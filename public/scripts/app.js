// Client facing scripts here
$(document).ready(() => {
  const createItemElement = function(item) {
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
  
  const renderItems = function(items) {
    for (const item of items) {
      $('.item-container').append(createItemElement(item));
    }
  }
  
  async function loadItems(page) {
    console.log('loadItems')
    return $.get('/api/items', (data) => {
      renderItems(data.items[page]);
    });
  }
  
  async function loadCategory(category, page) {
    $.get(`/api/items/${category}`, (data) => {
      renderItems(data.items[page]);
    });
  }

  // keep track of current page
  let currentPage = 0
  // load items on page load
  loadItems(currentPage).then(res => {
    if (currentPage < res.items.length) {
      $('.load-more').css('display', 'flex');
    }
  })

  // click load more to load more pages
  $('.load-more').click(function (e) { 
    e.preventDefault();
    currentPage++;
    loadItems(currentPage).then(res => {
      if (currentPage === res.items.length-1) {
        $('.load-more').css('display', 'none');
      }
    })
  });

  // category dropdown selector
  $('.dropdown-button').click(function (e) { 
    e.preventDefault();
    //reset currentPage
    currentPage = 0

    let categorySelector = $(this).attr('id');

    $('.item-container').empty();
    
    loadCategory(categorySelector, 0);
  });

  // start category drop down on hover
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
  // end category drop down on hover

  // start category buttons
  $('.dropdown-button').click(function (e) { 
    e.preventDefault();
    
  });
});