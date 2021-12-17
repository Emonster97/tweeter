//Function for the character counter
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let count = 140 - this.value.length;
    //We need to ensure the parent we are in contains our target
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


