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

	shader = new Shader();
	shader.initShaders(fragment, vertex);
	//VBO = cargarModelo();

	cubemap = loacubemap();
	texture = loadTexture("Resources/Texturas/box2.jpg");
	texture2 = loadTexture("Resources/Texturas/box3.jpg");
	texture3 = loadTexture("Resources/Texturas/box4.jpg");
	prepararMatrices();

	Model = new Modelo();
	Model.cargarModelo(Positions, Normals, TexCoords, Binormals, Tangents, Indices);

	requestAnimationFrame(draw);
	var then = 0;
	var yrot, xrot, zrot;
	var rot = 0.0;
	
	function draw(now)
	{
		camPos = document.getElementById("Range");
		now *= 0.001;
		deltaTime = now - then;
		then = now;

		GL.useProgram(shader.m_Program);
		GL.viewport(0,0,WebGL.width, WebGL.height);
		GL.enable(GL.DEPTH_TEST);
    	GL.uniformMatrix4fv(GL.getUniformLocation(shader.m_Program, "matrix"), GL.FALSE,matrix);
		var model = new Float32Array(16);
		model = Identity();
		console.log(camPos);
		rot += deltaTime;
		yrot = makeYRotation((rotSpeed) * rot);
		xrot = makeXRotation(degToRad(270));
		zrot = makeZRotation((rotSpeed) * rot);
		var translation = makeTranslation(-camPos.value+50, -camPos.value+50, -camPos.value+50);
		model = matrixMultiply(model, xrot);
		model = matrixMultiply(model, yrot);
		//model = matrixMultiply(model, zrot);
		model = matrixMultiply(model, translation);
		GL.uniformMatrix4fv(GL.getUniformLocation(shader.m_Program, "model"), GL.FALSE,model);
		var transInvModel = model;
		transInvModel = makeInverse(transInvModel);
		transInvModel = transpose(transInvModel);
		GL.uniformMatrix4fv(GL.getUniformLocation(shader.m_Program, "transInvModel"), GL.FALSE,transInvModel);
		GL.uniform3f(GL.getUniformLocation(shader.m_Program, "viewPos"),posicion[0], posicion[1],posicion[2]);
		GL.uniform3f(GL.getUniformLocation(shader.m_Program, "viewDir"),direccion[0], direccion[1],direccion[2]);
		GL.uniform1i(GL.getUniformLocation(shader.m_Program, "envmap"),envmap);
		GL.uniform1i(GL.getUniformLocation(shader.m_Program, "normalmapping"),normalmapping);
		GL.viewport(0,0,GL.drawingBufferWidth, GL.drawingBufferHeight);
		GL.clearColor(0, 0, 0, 1.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

		Model.Render(shader.m_Program, cubemap, texture, texture2, texture3);

		window.requestAnimationFrame(draw);
}

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
