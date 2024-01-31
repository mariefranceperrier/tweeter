/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {  
  let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <div class="user-avatar">
            <img src="${tweet.user.avatars}" alt="user avatar">
          </div>
          <div class="user-name">
            <span>${tweet.user.name}</span>
          </div>
        </div>
        <div class="user-handle">  
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <div class="tweet-content">
        <p>${$('<div>').text(tweet.content.text).html()}</p>
      </div>
      <footer>
        <div class="tweet-date">
          <h4>${timeago.format(tweet.created_at)}</h4>
        </div>
        <div class="tweet-actions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
}

const renderTweets = function (tweets) {
  const $tweetContainer = $('#tweet-container');
  $tweetContainer.empty();

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet);
  }
}

const loadTweets = function () {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json'
  })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log('Error:', err);
    });
};

$(document).ready(function () {
  loadTweets();
});

$(document).ready(function () {
  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault();
        
    const tweetText = $('#tweet-text');
    const tweetTextLength = tweetText.val().length;
    const $errorMessage = $('.error-message');
    
    // Slide up the error message before validation
    $errorMessage.slideUp('slow');

    if (tweetTextLength === 0) {
      $errorMessage.text('⚠️ Please enter a tweet ⚠️').slideDown('slow');
      return;
    }
    if (tweetTextLength > 140) {
      $errorMessage.text('⚠️ Your tweet is too long: MAX 140 characters ⚠️').slideDown('slow');
      return;
    }
    
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        // Load the tweets and empty the input field
        loadTweets();
        tweetText.val('');
        // Reset counter character and counter color
        const $counter = tweetText.parent().find(".counter");
        $counter.text(140);
        $counter.css('color', '#545149');
    })
      .catch((err) => {
        console.log('Error:', err);
    })
  });
});