var GL;
var shader;
var VBO;
var envmap = 1;
var normalmapping = 1;
var camPos = 0;
var deltaTime;
var rotation;
var rotSpeed = 1.0;
var cubemap, texture;
var model = new Float32Array(16);
var view = new Float32Array(16);
var projection = new Float32Array(16);
var matrix = new Float32Array(16);
var direccion = new Array(3);
var arriba = new Array(3);
var Model;
var renderer;

	var then = 0;
	var yrot, xrot, zrot;
	var rot = 0.0;
(function(){main();});

function main()
{
	var WebGL = document.getElementById("WebGL");

  	var style = WebGL.style;
	style.marginLeft = "auto";
	style.marginRight = "auto";
	var parentStyle = WebGL.parentElement.style;
	parentStyle.textAlign = "center";
	parentStyle.width = "100%";
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
	GL = WebGL.getContext("experimental-webgl");

	//VBO = cargarModelo();
	renderer = new Renderer;
	prepararMatrices();

	requestAnimationFrame(Render);
	
	

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

function prepararMatrices()
{
	model = Identity();
	view = Identity();
	projection = Identity();

	direccion = [0.0, 20.0, 0.0];
	posicion = [70.0, 80.0, 70.0];
	var cameraMatrix = Identity();
	//cameraMatrix = makeTranslation(posicion[0], posicion[1], posicion[2]);
	var yrot = makeYRotation(degToRad(0));
	cameraMatrix = makeLookAt(posicion, direccion, [0,1,0]);//matrixMultiply(cameraMatrix, yrot);
	var invView = makeInverse(cameraMatrix);
	var projection = makePerspective(degToRad(45), GL.drawingBufferWidth / GL.drawingBufferHeight, 0.1, 2000);
	matrix = makeTranslation(0, 0, 0);//makeLookAt([1, 1, 1], posicion, [0,1,0]);
	matrix = matrixMultiply(matrix, invView);
  	matrix = matrixMultiply(matrix, projection);

}
