$(document).ready(function () {
  
  $("#tweet-text").on("input", function () {
    const $counter = $(this).parent().find(".counter");
    const counter = 140 - $(this).val().length;
    $counter.text(counter);
    if (counter < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
  });
});