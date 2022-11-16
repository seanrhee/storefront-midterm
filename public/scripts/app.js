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
  
  async function loadItems(page = 0, category = null, filter = false) {
    console.log('loadItems')
    // if category selector
    if (category) {
      return $.get(`/api/items/${category}`, (data) => {
        renderItems(data.items[page]);
      });
    }
    if (filter) {
      return $.get(`/api/filter/${filter}`, (data) => {
        console.log('filter get');
        renderItems(data.items[page])
      })
    }

    // if homepage
    return $.get('/api/items', (data) => {
      renderItems(data.items[page]);
    });
  }

  // search item function
  async function searchItems(search) {
    console.log('searchItems called on', search)
    return $.get(`/api/search/${search}`, (data) => {
      console.log('search get')
      renderItems(data.items[0])
    });
  }

  async function filterItems(filter, page = 0) {
    console.log('filterItems called');
    return $.get(`/api/filter/${filter}`, (data) => {
      console.log('filter get');
      renderItems(data.items[page])
    })
  }

  // keep track of current page + category
  let currentPage = 0
  let categorySelector = null;
  let filter = null;

  // load items on page load
  loadItems(currentPage, categorySelector, filter).then(res => {
    if (currentPage < res.items.length - 1) {
      $('.load-more').css('display', 'flex');
    }
  });

  // click to load more pages
  $('.load-more').click(function (e) { 
    e.preventDefault();
    currentPage++;
    loadItems(currentPage, categorySelector, filter).then(res => {
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
    $('.dropdown-button').css('color', '');

    
    categorySelector = $(this).attr('id');

    $('#categories').unbind('mouseenter mouseleave');
    $('#category-dropdown').unbind('mouseenter mouseleave');
        
    $('.item-container').empty();

    $(this).css('color', '#808080');
    
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
  });

  $('#category-dropdown').hover(function () {
    // over
    $('#category-dropdown').css('display', 'flex');
  }, function () {
      // out
      $('#category-dropdown').css('display', 'none');
  });
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

// START search
  $('.searchButton').click(function (e) {
    const searchQuery = $('.searchTerm').val();

    if (!searchQuery){
      loadItems(currentPage, categorySelector).then(res => {
        if (currentPage < res.items.length - 1) {
          $('.load-more').css('display', 'flex');
        }
      });
    }
    $('.item-container').empty();

    console.log(searchQuery)
    e.preventDefault();
    searchItems(searchQuery).then(res => {
      console.log(res);
      if (currentPage < res.items.length - 1) {
        $('.load-more').css('display', 'flex');
      } else if (currentPage === res.items.length - 1) {
        $('.load-more').css('display', 'none');
      }
    });
  });
// END search

// START filter
  // click to open filter
  $('.open-filter').click(function (e) { 
    e.preventDefault();
    $('.filter-bar').css('display', 'flex');
  });

  // click to close filter
  $('.close-filter').click(function (e) { 
    e.preventDefault();
    $('.filter-bar').css('display', 'none');
  });

  // click apply
  $('#filter-form').submit(function (e) { 
    e.preventDefault();
    filter = $(this).serialize();

    currentPage = 0;
    $('.item-container').empty();

    loadItems(currentPage, null, filter).then(res => {
      console.log(res);
      if (currentPage < res.items.length - 1) {
        $('.load-more').css('display', 'flex');
      } else if (currentPage === res.items.length - 1) {
        $('.load-more').css('display', 'none');
      }
    });;
  });
});