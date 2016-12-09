function Articulo()
{
	this.m_Posicion;
	this.m_Tipo;
	this.m_Precio;
	this.m_Textura;

	this.m_VBOArticulo;

	this.m_Vertices;
	this.m_Normals;
	this.m_TexCoords;
	this.m_Binormals;
	this.m_Tangents;

	this.m_VerticesOffset;
	this.m_NormalsOffset;
	this.m_TexCoordsOffset;
	this.m_TangentOffset;
	this.m_BinormalOffset;
}

Articulo.prototype.Init = function(pos, tipo, precio)
{
	this.m_Posicion = pos;
	this.m_Tipo = tipo;
	this.m_Precio = precio;

}

Articulo.prototype.InitVAO = function()
{


	m_Vertices = new Float32Array([ 1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0]);

	m_Normals = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	m_TexCoords = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0]);
	
	m_Binormals = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	m_Tangents = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);


	this.m_VBOArticulo = GL.createBuffer();

	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBOArticulo);
	GL.bufferData(GL.ARRAY_BUFFER, 
                  m_Vertices.byteLength +
                  m_Normals.byteLength +
                  m_TexCoords.byteLength +
                  m_Binormals.byteLength +
                  m_Tangents.byteLength, GL.STATIC_DRAW);


    	m_NormalsOffset = m_Vertices.byteLength;
    	m_TexCoordsOffset = m_NormalsOffset + m_Normals.byteLength;
    	m_BinormalOffset = m_TexCoordsOffset +m_TexCoords.byteLength;
    	m_TangentOffset = m_BinormalOffset + m_Binormals.byteLength;

    	GL.bufferSubData(GL.ARRAY_BUFFER, 0, m_Vertices);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_NormalsOffset, m_Normals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_TexCoordsOffset, m_TexCoords);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_BinormalOffset, m_Binormals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_TangentOffset, m_Tangents);

	    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    	GL.enableVertexAttribArray(0);
    	GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, m_NormalsOffset);
		GL.enableVertexAttribArray(1);
    	GL.vertexAttribPointer(2, 2, GL.FLOAT, false, 0, m_TexCoordsOffset);
    	GL.enableVertexAttribArray(2);
    	GL.vertexAttribPointer(3, 3, GL.FLOAT, false, 0, m_BinormalOffset);
    	GL.enableVertexAttribArray(3);
    	GL.vertexAttribPointer(4, 3, GL.FLOAT, false, 0, m_TangentOffset);
    	GL.enableVertexAttribArray(4);

}

Articulo.prototype.Render = function(program, textura)
{
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, textura);
    GL.uniform1i(GL.getUniformLocation(program, "sampler"),0);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBOArticulo);
    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(0);
    GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, m_NormalsOffset);
	GL.enableVertexAttribArray(1);
    GL.vertexAttribPointer(2, 2, GL.FLOAT, false, 0, m_TexCoordsOffset);
    GL.enableVertexAttribArray(2);
    GL.vertexAttribPointer(3, 3, GL.FLOAT, false, 0, m_BinormalOffset);
    GL.enableVertexAttribArray(3);
    GL.vertexAttribPointer(4, 3, GL.FLOAT, false, 0, m_TangentOffset);
    GL.enableVertexAttribArray(4);


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