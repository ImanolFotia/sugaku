function Renderer() {

		this.m_Shader = new Shader();
		this.m_Shader.initShaders(fragment, vertex);

		this.m_CantidadArticulos = 18;

		this.m_SpriteShader = new Shader();
		this.m_SpriteShader.initShaders(spritef, spritev);

		this.m_RenderNormales = true;
		this.m_RenderEnvMap = false;

		this.m_CubeMap = loacubemap();

		this.texture = loadTexture("Resources/Texturas/mapa.jpg");
		this.texture2 = loadTexture("Resources/Texturas/box3.jpg");
		this.texture3 = loadTexture("Resources/Texturas/box4.jpg");


		this.leche = loadTexture("Resources/Sprites/Botella de Agua clone.png");

		this.m_Model = new Modelo();
		this.m_Model.cargarModelo(Positions, Normals, TexCoords, Binormals, Tangents, Indices);

		this.m_Camara = new Camara();

		this.m_Camara.Init([120,18,14], [0,0,1], 60, 16/9);

		this.m_Articulos = [];

		this.m_Inventario = new Inventario();
		this.m_Inventario.Init();

		this.m_Picking = new Picking();

		for(var i = 0; i < this.m_CantidadArticulos; i++)
		{

		this.m_Articulos[i] = new Articulo();

		var itemIndex = randi(0, 25);

		this.m_Articulos[i].Init(	
									TiposArticulos[itemIndex][0], 
								 	PocisionesArticulos[i], 
								 	TiposArticulos[itemIndex][1], 
								 	TiposArticulos[itemIndex][2]
								);

		this.m_Articulos[i].InitVAO();

		}

		this.m_Picking.Init(this.m_Articulos);
};

Renderer.prototype.DibujarArticulos = function()
{
	for(var i = 0; i < this.m_CantidadArticulos; i++)
	{
		GL.useProgram(this.m_SpriteShader.getshaderID());

		var translation = makeTranslation(0, 0, 0);
		var escala = scale(2,2,2);
		var model = new Float32Array(16);
		model = Identity();
		model = matrixMultiply(model, escala);
		var transInvModel = model;
		transInvModel = makeInverse(transInvModel);
		transInvModel = transpose(transInvModel);

		GL.uniformMatrix4fv(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "model"), GL.FALSE,model);
		GL.uniformMatrix4fv(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "view"), GL.FALSE,this.m_Camara.getViewMatrix());
		GL.uniformMatrix4fv(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "perspective"), GL.FALSE,this.m_Camara.getPerspectiveMatrix());
		GL.uniformMatrix4fv(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "transInvModel"), GL.FALSE,transInvModel);
		GL.uniform3f(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "viewPos"),this.m_Camara.getPosicion()[0], this.m_Camara.getPosicion()[1],this.m_Camara.getPosicion()[2]);
		GL.uniform3f(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "viewDir"),this.m_Camara.getObjetive()[0], this.m_Camara.getObjetive()[1],this.m_Camara.getObjetive()[2]);
		GL.uniform3f(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "SpritePos"), this.m_Articulos[i].m_Posicion[0],
																							this.m_Articulos[i].m_Posicion[1],
																							this.m_Articulos[i].m_Posicion[2]);

		GL.uniform3f(GL.getUniformLocation(this.m_SpriteShader.getshaderID(), "CameraRight"),this.m_Camara.m_Derecha[0], this.m_Camara.m_Derecha[1],this.m_Camara.m_Derecha[2]);

		if(!this.m_Articulos[i].m_Taken)
		this.m_Articulos[i].Render(this.m_SpriteShader.getshaderID(), this);
	}
}

Renderer.prototype.Pick = function()
{
	var index = this.m_Picking.Pick(this.m_Camara.getPosicion(), this.m_Camara.getDireccion());
	if(-1 != index && this.m_Inventario.m_CantItems <= this.m_Inventario.m_MaxItems && this.m_Articulos[index].m_Taken == 0){
	console.log(this.m_Articulos[index].getTipo());
	this.m_Articulos[index].m_Taken = 1;
	this.m_Inventario.AgregarItem(this.m_Articulos[index]);
}
else
	console.log("Inventario Lleno");
}

function Render(now)
	{
		camPos = document.getElementById("Range");
		now *= 0.001;
		deltaTime = now - then;
		then = now;

		GL.useProgram(renderer.m_Shader.getshaderID());
		GL.viewport(0,0,GL.drawingBufferWidth, GL.drawingBufferHeight);
		GL.clearColor(0.8, 1, .5, 1.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		GL.enable(GL.DEPTH_TEST);
		var model = new Float32Array(16);

		renderer.m_Camara.PollEvents();
		renderer.m_Camara.Update();

		//console.log("X: " + renderer.m_Camara.m_Posicion[0] + " Z: " + renderer.m_Camara.m_Posicion[2]);

		model = Identity();

		rot += deltaTime;
		yrot = makeYRotation((rotSpeed) * rot);
		xrot = makeXRotation(degToRad(90));
		zrot = makeZRotation(degToRad(0.0));

		var translation = makeTranslation(0, 0, 0);
		var escala = scale(10,5,10);

		//model = matrixMultiply(model, xrot);
		//model = matrixMultiply(model, yrot);

		model = matrixMultiply(model, zrot);
		model = matrixMultiply(model, escala);
		model = matrixMultiply(model, translation);
		var transInvModel = model;
		transInvModel = makeInverse(transInvModel);
		transInvModel = transpose(transInvModel);

		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "model"), GL.FALSE,model);
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "view"), GL.FALSE,renderer.m_Camara.getViewMatrix());
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "perspective"), GL.FALSE,renderer.m_Camara.getPerspectiveMatrix());
		GL.uniformMatrix4fv(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "transInvModel"), GL.FALSE,transInvModel);
		GL.uniform3f(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "viewPos"),renderer.m_Camara.getPosicion()[0], renderer.m_Camara.getPosicion()[1],renderer.m_Camara.getPosicion()[2]);
		GL.uniform3f(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "viewDir"),renderer.m_Camara.getObjetive()[0], renderer.m_Camara.getObjetive()[1],renderer.m_Camara.getObjetive()[2]);
		GL.uniform1i(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "envmap"),envmap);
		GL.uniform1i(GL.getUniformLocation(renderer.m_Shader.getshaderID(), "normalmapping"),normalmapping);

		renderer.m_Model.Render(renderer.m_Shader.getshaderID(), renderer.m_CubeMap, renderer.texture, renderer.texture2, renderer.texture3);

		renderer.DibujarArticulos();

		window.requestAnimationFrame(Render);
}
