$(function() {

  $("#100").hide();
  $("#75").hide();
  $("#50").hide();

var cnt = $("#resultcount").text();
$("#resultcount").hide();

  if(parseInt(cnt)===3){
    $("#100").show();
    $("#75").show();
    $("#50").show();
  }
  else if(parseInt(cnt)===2){
    $("#100").show();
    $("#75").show();
  }
  else if(parseInt(cnt)===1){
    $("#100").show();
    
  }
  else if (parseInt(cnt)===0){
    $("#resultmessage").text("Oops!.. No More Match.");
    $("#friendfound").text("Please Try again to find your friends..")
    
  }
     $(".survey-form").on("submit", function(event) {
   
  
    event.preventDefault();

      var newanswers = {

        name: $("#name").val().trim(),
        img_url: $("#img_url").val().trim(),
        
        question_id1:  $("#q1").text(),
        answer : $("#answer").val(),

        question_id2:  $("#q2").text(),
        answer1 : $("#answer1").val(),

        question_id3:  $("#q3").text(),
        answer2 : $("#answer2").val(),

        question_id4:  $("#q4").text(),
        answer3 : $("#answer3").val(),

        question_id5:  $("#q5").text(),
        answer4 : $("#answer4").val(),

        question_id6:  $("#q6").text(),
        answer5 : $("#answer5").val(),

        question_id7:  $("#q7").text(),
        answer6 : $("#answer6").val(),

        question_id8:  $("#q8").text(),
        answer7 : $("#answer7").val(),

        question_id9:  $("#q9").text(),
        answer8 : $("#answer8").val(),

        question_id10:  $("#q10").text(),
        answer9 : $("#answer9").val()

        
    } 

 
    // Send the POST request.
    $.ajax("/survey", {
      type: "POST",
      data:  newanswers
   }).then(
      function(data) {

      });
   
  });   
  $("#endsurvey").on("click",function(){
    if($("#name").val()!= 0 && $("#img_url").val()!= 0){
     location.assign("/result");
    }
    else
    alert(" Please  Fill Name and/Or Image Url..")
  })

 
}); 