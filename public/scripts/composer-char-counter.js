
$(document).ready(function() { 
  // --- our code goes here ---
  $("#tweet-text").on("input", function() {
    let count = 140 - this.value.length;
    let counter = $(this).parent().parent().find(".counter")[0];
    counter.innerHTML = count;
    if (count < 0) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "unset");
    }
    console.log(counter);
    console.log(count);
  });
});


