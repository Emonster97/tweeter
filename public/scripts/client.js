/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Loads up the current roster of tweets, calls them to be rendered
  const loadTweets = function() {
    $.getJSON("/tweets", function(data) {
      let arr = [];
      for (let d in data) {
        arr.unshift(data[d]);
      }
      
      renderTweets(arr);
    });
  };
  
  //escape function for string querys
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Tweet button, feeds the counter character data and posts the new tweet to tweets, then calls the loadTweets to render the tweets again with the new one added, also contains relevant error messages
  $("#tweetButton").submit(async function(event) {
    event.preventDefault();
    $('#error').slideUp(300, () => $('#error').hide());
    

    let tweetText = ($(this).find("#tweet-text").val());
    
    if (tweetText === "" || tweetText === null) {
      $('#error').slideDown(300);
      $('#error').show();
      $('#error').text("Error, your tweet is empty!");
      return;
    }

    if (tweetText.length > 140) {
      $('#error').slideDown(300);
      $('#error').show();
      $('#error').text("Error, your tweet is too long!");
      return;
    }

    await $.post("/tweets", $(this).serialize());
    
    loadTweets();
    $(this).find("#tweet-text").val("");
    $(".counter").text("140");
  });


//adds the tweet to the tweet roster to be loaded by loadTweets
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

//creates the tweet so that it is displayed on the page properly
  const createTweetElement = function(tweetData) {
    const $tweet = $(`
      <article>
          <header>
            <div>
              <img src="${tweetData.user.avatars}">
              <span style="margin-left: 10px"> ${tweetData.user.name}</span>
            </div>
            <span>${tweetData.user.handle}</span> 
          </header>
          <p>${escape(tweetData.content.text)}</p>
          <footer>
            <span>${timeago.format(tweetData.created_at)}</span>
            <div>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-flag"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
      </article>`);
    return $tweet;
  };

  loadTweets();
});