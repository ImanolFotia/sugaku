function Articulo()
{
	this.m_Posicion;
	this.m_Tipo;
	this.m_Precio;
	this.m_Textura;

	this.m_VBO;

	this.m_Vertices;
	this.m_Normals;
	this.m_TexCoords;
}

Articulo.prototype.Init = function(pos, tipo, precio, textura)
{
	this.m_Posicion = pos;
	this.m_Tipo = tipo;
	this.m_Precio = precio;
	this.m_Textura = textura;

	this.m_Vertices = Float32Array[1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
									1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];


	this.m_Normals= Float32Array[0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
								 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];
}

Articulo.prototype.InitVAO = function()
{
	this.m_VBO = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBO);
	GL.bufferData(GL.ARRAY_BUFFER, this.m_Vertices.byteLength, GL.STATIC_DRAW);
	GL.bufferSubData(GL.ARRAY_BUFFER, 0, m_Vertices);

	var a = [0,0,0,0,0];
	var b = [0,0,0];

	GL.vertexAttribPointer(0, 3, GL.FLOAT, false, a.byteLength, 0);
    GL.enableVertexAttribArray(0);
    GL.vertexAttribPointer(1, 3, GL.FLOAT, false, a.byteLength, b.byteLength);
    GL.enableVertexAttribArray(1);


	GL.bindBuffer(GL.ARRAY_BUFFER, 0);
}

Articulo.prototype.Render = function(program)
{
	GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, this.m_Textura);
    GL.uniform1i(GL.getUniformLocation(program, "sampler"),0);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBO);

    GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
}

Articulo.prototype.getPrecio = function()
{
	return this.m_Precio;
}

Articulo.prototype.getTipo = function()
{
	return this.m_Tipo;
}

Articulo.prototype.getPosicion = function()
{
	return this.m_Posicion;
}