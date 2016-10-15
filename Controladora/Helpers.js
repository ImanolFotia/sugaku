function crearContextoOpenGL()
{
	return WebGL.getContext("experimental-webgl");
}

function obtenerDatosDeCanvas()
{
	var WebGL = document.getElementById("WebGL");

  	var style = WebGL.style;
	style.marginLeft = "auto";
	style.marginRight = "auto";
	var parentStyle = WebGL.parentElement.style;
	parentStyle.textAlign = "center";
	parentStyle.width = "100%";

	return WebGL;
}

window.onresize = function()
{
		var WebGL = document.getElementById("WebGL");

  		var style = WebGL.style;
		style.marginLeft = "auto";
		style.marginRight = "auto";
		var parentStyle = WebGL.parentElement.style;
		parentStyle.textAlign = "center";
		parentStyle.width = "100%";

		GL = WebGL.getContext("experimental-webgl");
	}

	
function updatePosition()
{
	camPos = document.getElementById("Range");
}

function showEnvMap()
{
	envmap = !envmap;
}

function showNormalMapping()
{
	normalmapping = !normalmapping;
}

var keyboard =
{
	pressed : null,
	released : null,
	press : function (evt) 
	{
		keyboard.pressed = evt.code;
		console.log(evt.code);
	},
	release : function (evt) 
	{
		keyboard.pressed = null;
		keyboard.released = evt.code;
	}
}

var mouse =
{
	x : null,
	y : null,
	move : function (evt) 
	{
		mouse.x = evt.screenX;
		mouse.y = evt.screenY;
		//console.log(evt.screenX);
	}
}



