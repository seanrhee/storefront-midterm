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
  
  async function loadItems(page = 0, id = null) {
    console.log('my Ads')
    return $.get(`/api/users/${id}`, (data) => {
      console.log('user_id get')
      renderItems(data.items[page])
    })
  }

  // keep track of current page + category
  let currentPage = 0
  let categorySelector = null;
  let filter = null;
  let id = null;

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
