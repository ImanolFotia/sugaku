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

Articulo.prototype.Init = function(pos, tipo, precio)
{
	this.m_Posicion = pos;
	this.m_Tipo = tipo;
	this.m_Precio = precio;

	this.m_Vertices = Float32Array[ 1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
								    1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];

	this.m_Normals = Float32Array[ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
								   0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];

	this.m_TexCoords = Float32Array[1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
						     		1.0, 0.0, 0.0, 0.0, 1.0, 1.0];
}

Articulo.prototype.InitVAO = function()
{
	this.m_VBO = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBO);
	GL.bufferData(GL.ARRAY_BUFFER, 
                  this.m_Vertices.byteLength +
                  this.m_Normals.byteLength +
                  this.m_TexCoords.byteLength +
                  m_Binormals.byteLength +
                  m_Tangents.byteLength, GL.STATIC_DRAW);


    	var g_normalsOffset = m_Positions.byteLength;
    	var g_texCoordsOffset = g_normalsOffset + m_Normals.byteLength;
    	var g_binormalsOffset = g_texCoordsOffset + m_TexCoords.byteLength;
    	var g_tangentsOffset = g_binormalsOffset + m_Binormals.byteLength;

    	GL.bufferSubData(GL.ARRAY_BUFFER, 0, this.m_Vertices);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_normalsOffset, this.m_Normals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_texCoordsOffset, this.m_TexCoords);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_binormalsOffset, m_Binormals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_tangentsOffset, m_Tangents);

	    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    	GL.enableVertexAttribArray(0);
    	GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, g_normalsOffset);
		GL.enableVertexAttribArray(1);
    	GL.vertexAttribPointer(2, 2, GL.FLOAT, false, 0, g_texCoordsOffset);
    	GL.enableVertexAttribArray(2);
    	GL.vertexAttribPointer(3, 3, GL.FLOAT, false, 0, g_binormalsOffset);
    	GL.enableVertexAttribArray(3);
    	GL.vertexAttribPointer(4, 3, GL.FLOAT, false, 0, g_tangentsOffset);
    	GL.enableVertexAttribArray(4);


	GL.bindBuffer(GL.ARRAY_BUFFER, 0);
}

Articulo.prototype.Render = function(program, textura)
{
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, textura);
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