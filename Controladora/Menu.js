function audioChangeMute() {

	if(audiomute == 0)
	{
		audiomute = 1;
		background.Pause();
		document.getElementById("menumute").style.zIndex = -1;
		document.getElementById("menuunmute").style.zIndex = 2;

	} 
	else
	{
		audiomute = 0;
		document.getElementById("menuunmute").style.zIndex = -1;
		document.getElementById("menumute").style.zIndex = 2;		
	}
}

function mostrarInstrucciones() 
{
	if(popup == 0)
	{
		popup = 1;
		document.getElementById("Instrucciones").style.zIndex = 2;
		document.getElementById("menuabout").style.visibility = 'hidden';
		document.getElementById("menumute").style.visibility = 'hidden';
		document.getElementById("menuunmute").style.visibility = 'hidden';
		document.getElementById("controlup").style.visibility = 'hidden';
		document.getElementById("controldown").style.visibility = 'hidden';
		document.getElementById("controlleft").style.visibility = 'hidden';
		document.getElementById("controlright").style.visibility = 'hidden';
		document.getElementById("controltake").style.visibility = 'hidden';
		document.getElementById("store").style.visibility = 'hidden';
	}
	else
	{
		popup = 0;
		document.getElementById("Instrucciones").style.zIndex = -1;
		document.getElementById("Acerca").style.zIndex = -1;
		document.getElementById("menuabout").style.visibility = 'visible';
		document.getElementById("menumute").style.visibility = 'visible';
		document.getElementById("menuunmute").style.visibility = 'visible';
		document.getElementById("controlup").style.visibility = 'visible';
		document.getElementById("controldown").style.visibility = 'visible';
		document.getElementById("controlleft").style.visibility = 'visible';
		document.getElementById("controlright").style.visibility = 'visible';
		document.getElementById("controltake").style.visibility = 'visible';
		document.getElementById("store").style.visibility = 'visible';
	}
}

function mostrarAcerca()
{
	if(popup == 0)
	{
		popup = 1;
		document.getElementById("Acerca").style.zIndex = 2;
		document.getElementById("menuinstrucciones").style.visibility = 'hidden';
		document.getElementById("menumute").style.visibility = 'hidden';
		document.getElementById("menuunmute").style.visibility = 'hidden';
		document.getElementById("controlup").style.visibility = 'hidden';
		document.getElementById("controldown").style.visibility = 'hidden';
		document.getElementById("controlleft").style.visibility = 'hidden';
		document.getElementById("controlright").style.visibility = 'hidden';
		document.getElementById("controltake").style.visibility = 'hidden';
		document.getElementById("store").style.visibility = 'hidden';
	}
	else
	{
		popup = 0;
		document.getElementById("Instrucciones").style.zIndex = -1;
		document.getElementById("Acerca").style.zIndex = -1;
		document.getElementById("menuinstrucciones").style.visibility = 'visible';
		document.getElementById("menumute").style.visibility = 'visible';
		document.getElementById("menuunmute").style.visibility = 'visible';
		document.getElementById("controlup").style.visibility = 'visible';
		document.getElementById("controldown").style.visibility = 'visible';
		document.getElementById("controlleft").style.visibility = 'visible';
		document.getElementById("controlright").style.visibility = 'visible';
		document.getElementById("controltake").style.visibility = 'visible';
		document.getElementById("store").style.visibility = 'visible';
	}	
}