//using rails and active record I can store the work bank in a database, on a rails app.  Might even be able to scrape a dictionary website, or use an api to get words.


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
var load = function(){

  if(time_inc<64){
    td=document.getElementById(ID_array[time_inc])
    td.innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
        // td.innerHTML="_"
        // td.innerHTML=ID_array[t]
        // adds event listener
        td.addEventListener("click",function(){
          // this ensures that only adjacent squares may be selected
          if(((current=="")||(parseInt(current)+1==parseInt(this.id))||(parseInt(current)-1==parseInt(this.id))||(parseInt(current)+10==parseInt(this.id))||(parseInt(current)-10==parseInt(this.id))||((parseInt(current)-9==parseInt(this.id)))||((parseInt(current)-11==parseInt(this.id)))||((parseInt(current)+9==parseInt(this.id)))||((parseInt(current)+11==parseInt(this.id))))&&(curr.indexOf(this.id)<0))
          {
            this.style.color="red"
            word+=this.innerHTML
            current=this.id
            curr.push(this.id)
            document.getElementById("word").innerHTML=word
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
  // if((dictionary.indexOf(word)>=0)&&(word.length>1))
  $.ajax({
    url: '/words/check_this/'+word,
  })
  .done(function(data) {
    console.log(data)
    console.log("success");

    if((data.outcome)&&(word.length>1))
    {
      hit_noise.play()
      used_words.push(""+word+"")
      new_score = player_score+word.length
      document.getElementById("wordbank").innerHTML=used_words.reverse().join(", ")
      document.getElementById("word").innerHTML="Score! +"+word.length+"pts"
      slide_score()
      generate_free_jumbles()
      for (var t = 0; t < curr.length; t++)
      {
        document.getElementById(curr[t]).innerHTML=""
        document.getElementById(curr[t]).style.color=current_color;
      }
      word=""
      curr=[]
      current=""
      drop_blox()
    }
    else if((word.length==1)&&(data.outcome))
    {
      word=""
      current=""

      for (var t = 0; t < curr.length; t++)
      {
        document.getElementById(curr[t]).innerHTML=alpha[Math.floor(Math.random()*alpha.length)]
        document.getElementById(curr[t]).style.color=current_color;
        shake(curr[t])
      }
      curr=[]
    }
    else
    {
      reset_colors()
      for (var tea = 0; tea < 64; tea++)
        {
        document.getElementById("word").innerHTML="not a word :("
        document.getElementById(ID_array[tea]).style.color=current_color
        }
    }
    // reset_colors()

})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

}
