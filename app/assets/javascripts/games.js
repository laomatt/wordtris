//using rails and active record I can store the work bank in a database, on a rails app.  Might even be able to scrape a dictionary website, or use an api to get words.

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


