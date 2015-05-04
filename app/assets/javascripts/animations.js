//this is a double recursive function to drop my letters
function drop_blox(){
  var g=0
  the_loop()
  function the_loop()
  {
    if(g<ID_array.length)
    {
      var t=0
      the_drop()
      function the_drop(){
        if(t<ID_array.length)
        {
          if(document.getElementById(ID_array[t]).innerHTML=="")
          {
            if(last_row.indexOf(ID_array[t])>=0)
            {
             var temp_letter = alpha[Math.floor(Math.random()*alpha.length)]
           }
           else
           {
             var temp_letter = document.getElementById(ID_array[t+8]).innerHTML.toString()
             document.getElementById(ID_array[t+8]).innerHTML=""
           }
           document.getElementById(ID_array[t]).innerHTML=temp_letter
           slide_down(ID_array[t])
         }
         t+=1
         setTimeout(the_drop,20)
       }
     }
     g+=1
     setTimeout(the_loop,300)
   }
 }
}

//another recursive funtion,  THIS FUNCTION ANIMATES THE SCORE TABLE
var slide_score = function(){
    //start with player_score, and new_score
    if(player_score!=new_score)
    {
      player_score+=1
      document.getElementById("score").innerHTML=player_score
      setTimeout(slide_score,50)
    }
    else
    {
      document.getElementById("score").innerHTML=player_score
    }
  }

//shakes all dives in sequence (not used, but still useful)
function shock_wave(){
  var f=0
  var random_animation=ID_arays_animation[Math.floor(Math.random()*ID_arays_animation.length)]
  if(f<random_animation.length)
  {
    shake_this()
    function shake_this(){
      shake(random_animation[f])
      f+=1
      setTimeout(shake_this,10)
    }
  }
}


//shakes a single div
var shake = function(indexID){
  var initial=0
  var incre=0
  quibble()
  function quibble(){
    if(incre<20)
    {
      if(incre%2==0)
      {
        initial+=5
      }
      else
      {
        initial-=5
      }
      document.getElementById(indexID).style.top=initial+"%"
      incre+=1
      setTimeout(quibble,20)
    }
  }
}

//slides the letters down when they are sitting on an empty div
var slide_down = function(indexID){
  var initial=0
  var incre=0
  quibble()
  function quibble(){
    if(incre<=3)
    {
      if(incre==3)
        {initial=0}
      else
        {initial+=1}
      document.getElementById(indexID).style.top=initial+"%"
      incre+=1
      setTimeout(quibble,20)
    }
  }
   // document.getElementById(indexID).style.top='0%'
 }

//shake sideways
var shake_side_ways = function(indexID){
  var initial=0
  var incre=0
  quibble()
  function quibble(){
    if(incre<20)
    {
      if(incre%2==0)
      {
        initial+=5
      }
      else
      {
        initial-=5
      }
      document.getElementById(indexID).style.left=initial+"%"
      incre+=1
      setTimeout(quibble,20)
    }
  }
}



//scrambles to a new game
var scamble = function(){
  scamble_noise.play()
  current_color=colors[Math.floor(Math.random()*colors.length)]
        // shock_wave()
        player_score=0
        used_words=[]
        curr=[]
        current=""
        document.getElementById("score").innerHTML=player_score
        document.getElementById("wordbank").innerHTML=used_words.reverse().join(", ")
        var ten=0
        var random_animation=ID_arays_animation[Math.floor(Math.random()*ID_arays_animation.length)]
        assign_and_shake()
        function assign_and_shake(){
          word=""
          document.getElementById("word").innerHTML="WoRd Jumble"
          if(ten<=64)
          {
            document.getElementById(random_animation[ten]).style.color=current_color
            document.getElementById(random_animation[ten]).innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
            shake(random_animation[ten])
            ten+=1
            setTimeout(assign_and_shake,20)
          }
        }
        word=""
        curr=[]
        current=""
        document.getElementById("word").innerHTML=word
    // reset_colors()
  }
