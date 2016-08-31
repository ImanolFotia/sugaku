function Renderer() {

		this.m_Shader = new Shader();
		this.m_Shader.initShaders(fragment, vertex);

		this.m_RenderNormales = true;
		this.m_RenderEnvMap = true;

		this.m_CubeMap = loacubemap();

		this.texture = loadTexture("Resources/Texturas/box2.jpg");
		this.texture2 = loadTexture("Resources/Texturas/box3.jpg");
		this.texture3 = loadTexture("Resources/Texturas/box4.jpg");

		this.m_Model = new Modelo();
		this.m_Model.cargarModelo(Positions, Normals, TexCoords, Binormals, Tangents, Indices);
};

function Render(now)
	{
		camPos = document.getElementById("Range");
		now *= 0.001;
		deltaTime = now - then;
		then = now;

		GL.useProgram(renderer.m_Shader.getshaderID());
		GL.viewport(0,0,Canvas.width, Canvas.height);
		GL.enable(GL.DEPTH_TEST);
    	GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "matrix"), GL.FALSE,matrix);
		var model = new Float32Array(16);
		var view = new Float32Array(16);
		var perspective = new Float32Array(16);

		var position = new Float32Array([0, -50, camPos.value-100]);
		var direction = new Float32Array([0,0,0]);
		var up = new Float32Array([0,1,0]);
		model = Identity();
		view = Identity();
		perspective = Identity();

		view = makeLookAt(position, direction, up);
		perspective = makePerspective(degToRad(90), 4.0/3.0, 0.1, 1000.0);

		rot += deltaTime;
		yrot = makeYRotation((rotSpeed) * rot);
		xrot = makeXRotation(degToRad(270));
		zrot = makeZRotation((rotSpeed) * rot);
		var translation = makeTranslation(0, 0, 0);
		model = matrixMultiply(model, xrot);
		model = matrixMultiply(model, yrot);
		//model = matrixMultiply(model, zrot);
		model = matrixMultiply(model, translation);
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "model"), GL.FALSE,model);
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "view"), GL.FALSE,view);
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "perspective"), GL.FALSE,perspective);
		var transInvModel = model;
		transInvModel = makeInverse(transInvModel);
		transInvModel = transpose(transInvModel);
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "transInvModel"), GL.FALSE,transInvModel);
		GL.uniform3f(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "viewPos"),posicion[0], posicion[1],posicion[2]);
		GL.uniform3f(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "viewDir"),direccion[0], direccion[1],direccion[2]);
		GL.uniform1i(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "envmap"),envmap);
		GL.uniform1i(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "normalmapping"),normalmapping);
		GL.viewport(0,0,GL.drawingBufferWidth, GL.drawingBufferHeight);
		GL.clearColor(0, 0, 0, 1.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

		renderer.m_Model.Render(renderer.m_Shader.getshaderID(), renderer.m_CubeMap, renderer.texture, renderer.texture2, renderer.texture3);

		window.requestAnimationFrame(Render);
}
