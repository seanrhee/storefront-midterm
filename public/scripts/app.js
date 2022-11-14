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
  
  async function loadItems(page = 0, category = null) {
    console.log('loadItems')
    if (category) {
      return $.get(`/api/items/${category}`, (data) => {
        renderItems(data.items[page]);
      });
    }
    return $.get('/api/items', (data) => {
      renderItems(data.items[page]);
    });
  }

  // keep track of current page + category
  let currentPage = 0
  let categorySelector;

  // load items on page load
  loadItems(currentPage, categorySelector).then(res => {
    if (currentPage < res.items.length - 1) {
      $('.load-more').css('display', 'flex');
    }
  })

  // click to load more pages
  $('.load-more').click(function (e) { 
    e.preventDefault();
    currentPage++;
    loadItems(currentPage, categorySelector).then(res => {
      if (currentPage === res.items.length-1) {
        $('.load-more').css('display', 'none');
      }
    })
  });


  // START category dropdown selector
  $('.dropdown-button').click(function (e) { 
    e.preventDefault();
    //reset currentPage
    currentPage = 0

    categorySelector = $(this).attr('id');

    $('.item-container').empty();

    $('.category-label').append(`<p>${categorySelector}</p>`);
    
    loadItems(currentPage, categorySelector).then(res => {
      console.log(res);
      if (currentPage < res.items.length - 1) {
        $('.load-more').css('display', 'flex');
      } else if (currentPage === res.items.length - 1) {
        $('.load-more').css('display', 'none');
      }
    });
  });
  // END category dropdown selector


  // START category drop down on hover
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
  // END category drop down on hover


  // START top button
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      $('.top').css('display', 'flex');
    } else {
      $('.top').css('display', 'none');
    }
  }

  // on click event
  $('.top').click(function (e) { 
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  // END top button
});