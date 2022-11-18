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
      $('.item-container').append(createItemElement(item));
    }
  }
  
  async function loadItems(page = 0, category = null, filter = false, id = null) {
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
    if (id) {
      return $.get(`/api/users/${id}`, (data) => {
        console.log('user_id get')
        renderItems(data.items[page])
      })
    }

    // if homepage
    return $.get('/api/items', (data) => {
      renderItems(data.items[page]);
    });
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

// START top button
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

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
    $('.no-results').empty();

    loadItems(currentPage, null, filter).then(res => {
      console.log(res);

      if (res.items.length === 0) {
        $('.no-results').append('<h1>NO RESULTS</h1>')
        $('.load-more').css('display', 'none');

      }

      if (currentPage < res.items.length - 1) {
        $('.load-more').css('display', 'flex');
      } else if (currentPage === res.items.length - 1) {
        $('.load-more').css('display', 'none');
      }
    });;
  });

  // reset button
  $('.reset-button').click(function (e) {
    e.preventDefault();
    $('#filter-form')[0].reset();
  });
// END filter
});

