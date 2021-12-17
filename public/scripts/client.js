/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(function(){

  // jQuery methods go here...


const createTweetElement = function() {
const $tweet = $(`<article class="tweet">Hello world</article>`);
return $tweet
}

/*
  <header>
            <span><img src="https://i.imgur.com/73hZDYK.png"><span style="margin-left: 10px">Wilfred Emonts</span></span>
            <address>@Emonster97</address> 
          </header>
          <p>
            If you build a man a fire he stays warm for a day, set a man on fire and he will be warm for the rest of his life.
          </p>
          <footer>
            22 days 
            <div>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
            <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
*/


const $tweet = createTweetElement(tweetData);


// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});