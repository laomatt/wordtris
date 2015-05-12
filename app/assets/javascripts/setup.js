
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