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
            <h3>${tweet.user.name}</h3>
          </div>
        </div>
        <div class="user-handle">  
          <h3>${tweet.user.handle}</h3>
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


$(function () {
      $('.new-tweet form').on('submit', function (event) {
        event.preventDefault();
        
        const tweetText = $('#tweet-text');
        const tweetTextLength = tweetText.val().length;
        if (tweetTextLength === 0) {
          alert('Please enter a tweet!');
          return;
        }
        if (tweetTextLength > 140) {
          alert('Your tweet is too long!');
          return;
        }
        
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize()
        })
        .then(() => {
          loadTweets();
          tweetText.val('');
        })
        .catch((err) => {
          console.log('Error:', err);
        });

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

        loadTweets();

      });
    });
    