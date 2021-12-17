/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  const loadTweets = function() {
    $.getJSON( "/tweets", function( data ) {
      let arr = [];
      for (d in data) {
        arr.push(data[d]);
      }
      
     renderTweets(arr); 
    }); 
  }
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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



  // jQuery methods go here...
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweets-container').empty();
    for (tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  }


const createTweetElement = function(tweetData) {
const $tweet = $(`<article>
<header>
  <span><img src="${tweetData.user.avatars}"><span style="margin-left: 10px">${tweetData.user.name}</span></span>
  <address>${tweetData.user.handle}</address> 
</header>
<p>
${escape(tweetData.content.text)}
</p>
<footer>
  ${timeago.format(tweetData.created_at)}
  <div>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-flag"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>
</article>`);
return $tweet
}

loadTweets();
});