function play(id, format)//le paso el id a través del botón
{
  if(format != null && format == "mp3" || format == "wav"){
      var audio = new Audio("Resources/Audio/"+id+"."+format)
      audio.play();
    }
    else {
    document.getElementById(id).play();//reproduce el sonido con el id que pasó el botón
  }
}
