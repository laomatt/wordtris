
var letter_mouseover_color="red"
var letter_initial_color=""

var letter_initial_class=""




$(document).on("ready",function(){
//bindings and initial actions
load()



$('body').keypress(return_button);
//mouseover effect for the letters


$('body').on('mouseover', 'div.letter', function(event) {
  event.preventDefault();
  letter_initial_color=$(this).css('color')
  this.style.color=letter_mouseover_color;
});

$('body').on('mouseout', 'div.letter', function(event) {
  event.preventDefault();
  this.style.color=letter_initial_color;
});




//populate the word bank with the current players words
$.ajax({
  url: '/players/'+ $('#player_info').attr('id_player')+'/user_words',
})
.done(function(data) {
  var context = { user_words: data };
  var source = $('#player-word-template').html();
  var template = Handlebars.compile(source);
  var html = template(context);
  document.getElementById('wordbank').innerHTML=html
  // $('#wordbank').html(html)
})

//populates user sentences

$.ajax({
  url: '/players/'+$('#player_info').attr('id_player')+'/sentences',
})
.done(function(data) {
  var context = { sentences: data };
  var source = $('#sentence-template').html();
  var template = Handlebars.compile(source);
  var html = template(context);
  document.getElementById('personal_sentences').innerHTML=html
})


//populates community sentences
$.ajax({
  url: '/sentences',
})
.done(function(data) {
  var context = { sentences: data };
  var source = $('#sentence-template-comm').html();
  var template = Handlebars.compile(source);
  var html = template(context);
  document.getElementById('community_sentences').innerHTML=html
})



$('body').on('click','a.user_word_list_item',function(event) {
  event.preventDefault();
  var id=$(this).attr('id2')
  $.ajax({
    url: '/user_words/get_word/'+$(this).attr('id2')
  })
  .done(function(data) {
    console.log(data);
    sentence_as+=data.name+" "
    sen_array.push(data)
    $("#current_sentence").text(sentence_as)
    $("#user_word"+id).remove()
    $('.sen_con').css('display','block')
  })
});



//show the rules modal
$('body').on('click', '.instructions-modal', function(event) {
  event.preventDefault();
  $('#instructions-id').css('display','block')

});

//hide the rules modal
$('body').on('click', '.hide-rules-modal', function(event) {
  event.preventDefault();
  $('#instructions-id').css('display','none')
});
$('body').on('click', '.selector', function(event) {
  event.preventDefault();
  /* Act on the event */
});

//suggest word

//handle sentence modal
$("body").on('mouseover', '.sen_con', function(event) {
  event.preventDefault();
  $('#current_sentence').css('opacity','0.9')
  $('#sub_sen_butt').css('display','block')
});
$("body").on('mouseout', '.sen_con', function(event) {
  event.preventDefault();
  $('#sub_sen_butt').css('display','none')
  $('#current_sentence').css('opacity','0.9')
});

//submit sentence
$('body').on('click', '.sub_sen', function(event) {
  event.preventDefault();
  $.ajax({
    url: '/players/'+$('#player_info').attr('id_player')+'/sentences',
    type: 'POST',
    data: {content: $('#current_sentence').text()},
  })
  .done(function(data){
    $('#current_sentence').text("")
    var context = { sentences: data };
    var source = $('#sentence-template').html();
    var template = Handlebars.compile(source);
    var html = template(context);
    document.getElementById('personal_sentences').innerHTML=html
/*
Here might be a good place to look up implementing the pusher gem so that sentences in the community div are updated as soon as someone creates a sentence.
*/

for(var g in sen_array){
  $.ajax({
    url: '/players/'+$('#player_info').attr('id_player')+'/user_words/'+sen_array[g].id,
    type: 'DELETE',
  })
  .done(function() {
  })
}
setTimeout(function(){
  $("#sen_con").fadeOut(1500);
})

  })//closes line 338
  $('#current_sentence').text("")
  sentence_as=" "
  sen_array=[]
}); //closes line 331
//



// cancel sentence
$('body').on('click', '.can_sen', function(event) {
  event.preventDefault();

  setTimeout(function(){
    $("#sen_con").fadeOut(1500);
  })


  $.ajax({
    url: '/players/'+ $('#player_info').attr('id_player')+'/user_words',
  })
  .done(function(data) {
    var context = { user_words: data };
    var source = $('#player-word-template').html();
    var template = Handlebars.compile(source);
    var html = template(context);
    document.getElementById('wordbank').innerHTML=html
  })
  $('#current_sentence').text("")
  sentence_as=" "
  sen_array=[]

});


//toggle sentences
$('body').on('click', 'button.your_sentences_link', function(event) {
  // event.preventDefault();
  console.log("ldkjfsa")
  $('#personal_sentences').css('z-index','6')
  $('#community_sentences').css('z-index','5')
})


$('body').on('click', 'button.community_sentences_link', function(event) {
  // event.preventDefault()
  console.log("ldkjfsa")
  $('#personal_sentences').css('z-index','5')
  $('#community_sentences').css('z-index','6')
})




//suggest a word

$('body').on('click', '.suggest-word-link', function(event) {
  event.preventDefault();
  /* Act on the event */
  $.ajax({
    url: '/players/'+$('#player_info').attr('id_player')+'/suggest/'+temp_word,
    type: 'POST',
  })
  .done(function() {
    $("#cprize").text("  Word suggested  !Thank you!  ")
    setTimeout(function(){
      $("#cprize").fadeOut(2500);
    })
  })
});



})

