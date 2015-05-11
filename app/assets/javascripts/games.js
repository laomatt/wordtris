//using rails and active record I can store the work bank in a database, on a rails app.  Might even be able to scrape a dictionary website, or use an api to get words.
// console.log('adasdf')


var sentence_as=""
var sen_array=[]
var temp_word=""


var alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
var player_score=0
var noise_array=["crash1","crash2","crash3","crash4","crash5","crash6"]
// var hit_noise = new Audio("sounds/"+noise_array[Math.floor(Math.random()*noise_array.length)]+".wav")
var hit_noise=new Audio("sounds/coin.wav")
var scamble_noise = new Audio("sounds/bubbles2.wav")
var ID_array=["11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28","31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48","51","52","53","54","55","56","57","58","61","62","63","64","65","66","67","68","71","72","73","74","75","76","77","78","81","82","83","84","85","86","87","88"]
var ID_array_ripple=["55","54","44","45","46","56","66","65","64","63","53","43","33","34","35","36","37","47","57","67","77","76","75","74","73","72","62","52","42","32","22","23","24","25","26","27","28","38","48","58","68","78","88","87","86","85","84","83","82","81","71","61","51","41","31","21","11","12","13","14","15","16","17","18"]
var ID_arays_animation=[ID_array, ID_array.reverse(), ID_array_ripple, ID_array_ripple.reverse()]
var initials=document.getElementsByClassName("letter")

//function that handles 'enter' keys
var return_button = function(event){
  if(event.keyCode==13)
  {
    submit()
  }
  if (event.keyCode==8)
  {
    reset_colors()
  }
}

var word=""
var curr=[]
var current=""
var current_color="white";
var colors=["white", "#E6E0F8", "#E0F8F7", "#ECF6CE","#F5F6CE","#CEE3F6","#8FFDEB","#FDBB8F","#E2FD8F","#CD8FFD"]

var time_inc=0
// var load = function(){
  function load(){


    if(time_inc<64){
      td=document.getElementById(ID_array[time_inc])
      td.innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
      td.addEventListener("click",function(){
        if(((current=="")||(parseInt(current)+1==parseInt(this.id))||(parseInt(current)-1==parseInt(this.id))||(parseInt(current)+10==parseInt(this.id))||(parseInt(current)-10==parseInt(this.id))||((parseInt(current)-9==parseInt(this.id)))||((parseInt(current)-11==parseInt(this.id)))||((parseInt(current)+9==parseInt(this.id)))||((parseInt(current)+11==parseInt(this.id))))&&(curr.indexOf(this.id)<0))
        {
          this.className="letter pushed"
          word+=this.innerHTML
          current=this.id
          curr.push(this.id)
          document.getElementById("word").innerHTML=word
        // debugger
        $("#word").css("right",""+(parseInt($("#"+curr[curr.length-1]).attr('x'))+15)+"%")
        $("#word").css("top",""+$("#"+curr[curr.length-1]).attr('y')+"%")
        $("#word").css("display","block")
      }
    })
      shake_side_ways(ID_array[time_inc])
      document.getElementById('podium').innerHTML="STAMPs <br>"+jumbles_array.join("")+arma_array.join("")
      time_inc+=1
      setTimeout(load,20)
    }
  }

  function reset_colors(){
    word=""
    curr=[]
    current=""
    document.getElementById("word").innerHTML=word
    for (var t = 0; t < 64; t++)
    {
      document.getElementById(ID_array[t]).style.color=current_color
    }

  }
  var first_row=["81","82","83","84","85","86","87","88"]
  var last_row=["11","12","13","14","15","16","17","18"]
  var used_words=[];

  var jumbles_array=[]
  var arma_array=[]

  var new_score=0;

//this function runs when a word is submitted
var submit = function(){
  $.ajax({
    url: '/words/check_this/'+word
  })
  .done(function(data) {
    console.log(data)
    console.log("success");

    if((data.outcome)&&(word.length>1))
    {
      hit_noise.play()
      used_words.push(""+word+"")
      new_score = player_score+word.length

// here we assign the valid word to the current player.
$.ajax({
  url: '/players/'+ $('#player_info').attr('id_player') +'/words/'+word,
  type: 'POST',
})
.done(function(data) {
  console.log("success");
  console.log(data);
        //append the data word to the #wordbank div
        var context = { user_words: data };
        var source = $('#player-word-template').html();
        var template = Handlebars.compile(source);
        var html = template(context);
        document.getElementById('wordbank').innerHTML=html
      })

        //make this fade out
        document.getElementById("word").innerHTML="Score! +"+word.length+"pts"

        // debugger
        $("#word").css("right",""+$("#"+curr[curr.length-1]).attr('x')+"%")
        $("#word").css("top",""+$("#"+curr[curr.length-1]).attr('y')+"%")
        $("#word").css("display","block")
        setTimeout(function(){
          $("#word").fadeOut(2500);
        })

        slide_score()

        $.ajax({
          url: '/players/'+$('#player_info').attr('id_player')+'/games/'+$('#player_info').attr('id_game'),
          type: 'PATCH',
          data: {score: new_score},
        })
        .done(function(data) {
          console.log(data);
        })

        // generate_free_jumbles()
        for (var t = 0; t < curr.length; t++)
        {
          document.getElementById(curr[t]).innerHTML=""
          document.getElementById(curr[t]).className="letter"
          document.getElementById(curr[t]).style.color=current_color;
        }
        word=""
        curr=[]
        current=""
        drop_blox()
      }
      else if((word.length==1)&&(data.outcome))
      {
        $.ajax({
          url: '/players/'+ $('#player_info').attr('id_player') +'/words/'+word,
          type: 'POST',
        })
        .done(function(data) {
          console.log("success");
          console.log(data);
        //append the data word to the #wordbank div
        var context = { user_words: data };
        var source = $('#player-word-template').html();
        var template = Handlebars.compile(source);
        var html = template(context);
        document.getElementById('wordbank').innerHTML=html
        setTimeout(function(){
          $("#word").fadeOut(2500);
        })
      })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });
        word=""
        current=""

        for (var t = 0; t < curr.length; t++)
        {
          document.getElementById(curr[t]).innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
          document.getElementById(curr[t]).className="letter"
          document.getElementById(curr[t]).style.color=current_color;
          shake(curr[t])
        }
        curr=[]
      }
      else
      {
        for (var tea = 0; tea < curr.length; tea++)
        {
          temp_word=word
          $("#cprize").css('display','block');
          document.getElementById("cprize").innerHTML=word+" is not a word :( <a class='suggest-word-link' href='#'>suggest this word</a>"
            document.getElementById(curr[tea]).className="letter"
            document.getElementById(ID_array[tea]).style.color=current_color
          }
        }
        word=""
        curr=[]
        current=""
        setTimeout(function(){
          $("#word").fadeOut(2500);
        })
      })
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

}



$(document).on("ready",function(){

  load()

  $('body').keypress(return_button);


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



