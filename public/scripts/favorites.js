//change heart icon to red on click
$(document).ready(() => {
  const changeHeartColor = () => {
    const heart = document.getElementById('heart');
    console.log('click', heart)
      heart.classList.toggle('red');
      heart.classList.toggle('grey');
  };

  $('#heart').click(function (e) {
    e.preventDefault();
    changeHeartColor();
    const itemId = e.target.dataset.itemid;

    $.ajax({
      url: '/favorites',
      method: 'POST',
      data: { itemId },
      success: () => {
        console.log('success!')
      },
      error: () => {
        console.log('ERROR!')
      }
    });
  });
});
