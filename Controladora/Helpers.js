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