
//here we randomly give the player jumble-stamps
var generate_free_jumbles = function(){
  var current_button_color=colors[Math.floor(Math.random()*colors.length)]
  var letter_array=[]
  for(var y=0 ; y<word.length ; y++)
  {
    letter_array.push('c','a')
  }
  while(letter_array.length<=13)
  {
    letter_array.push('b')
  }

  var ran_letter=letter_array[Math.floor(Math.random()*letter_array.length)]

  if(ran_letter=='a')
  {
    jumbles_array.push("<button id=\"free_j\" style=\"color:"+current_button_color+"\" onclick=\"scamble_and_preserve()\"><img src=\"images/jumbleme.png\" class=\"stamp_image\"></button>")

    document.getElementById('podium').innerHTML="STAMPs <br>"+jumbles_array.join("")+arma_array.join("")
  }
  if (ran_letter=='c')
  {
    arma_array.push("<button id=\"free_j\" style=\"color:yellow\" onclick=\"armageddon()\"><img src=\"images/jumgeddon.png\" class=\"stamp_image\"></button>")
    document.getElementById('podium').innerHTML="STAMPs <br>"+jumbles_array.join("")+arma_array.join("")
  }
}
function armageddon(){
  scamble_noise.play()
  for(var t = 0 ; t<ID_array.length ; t++)
  {
    var jumgot=["J","U","M","B","L","E"]
    if(jumgot.indexOf(document.getElementById(ID_array[t]).innerHTML)>=0)
    {
      document.getElementById(ID_array[t]).innerHTML=""
    }
  }
  arma_array.pop()
  document.getElementById('podium').innerHTML="STAMPs <br>"+jumbles_array.join("")+arma_array.join("")
  drop_blox()
}

//actions for the 'jumble me' stamp
var scamble_and_preserve = function(){
  scamble_noise.play()
  current_color=colors[Math.floor(Math.random()*colors.length)]
  curr=[]
  current=""
  document.getElementById("score").innerHTML=player_score
  document.getElementById("wordbank").innerHTML=used_words.reverse().join(", ")
  var ten=0
  var random_animation=ID_arays_animation[Math.floor(Math.random()*ID_arays_animation.length)]
  assign_and_shake()
  function assign_and_shake(){
    word=""
    document.getElementById("word").innerHTML="Jungle Jumble"
    if(ten<64)
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
      // free_jumbles=""
      jumbles_array.pop()
      document.getElementById('podium').innerHTML="STAMPs <br>"+jumbles_array.join("")+arma_array.join("")

    }
