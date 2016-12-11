function Articulo()
{
	this.m_Posicion;
	this.m_Tipo;
	this.m_Precio;
	this.m_Textura;
	this.m_Taken;

	this.m_VBOArticulo;

	this.m_VerticesArticulo;
	this.m_NormalsArticulo;
	this.m_TexCoordsArticulo;
	this.m_BinormalsArticulo;
	this.m_TangentsArticulo;

	this.m_VerticesOffset;
	this.m_NormalsOffset;
	this.m_TexCoordsOffset;
	this.m_TangentOffset;
	this.m_BinormalOffset;
}

Articulo.prototype.Init = function(textura, pos, tipo, precio)
{
	this.m_Posicion = pos;
	this.m_Tipo = tipo;
	this.m_Precio = precio;
    this.m_Textura = loadTexture(textura);
    this.m_Taken = 0;

}

Articulo.prototype.InitVAO = function()
{


	m_VerticesArticulo = new Float32Array([-1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0]);

	m_NormalsArticulo = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	m_TexCoordsArticulo = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);
	
	m_BinormalsArticulo = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	m_TangentsArticulo = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);


	this.m_VBOArticulo = GL.createBuffer();

	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBOArticulo);
	GL.bufferData(GL.ARRAY_BUFFER, 
                  m_VerticesArticulo.byteLength +
                  m_NormalsArticulo.byteLength +
                  m_TexCoordsArticulo.byteLength +
                  m_BinormalsArticulo.byteLength +
                  m_TangentsArticulo.byteLength, GL.STATIC_DRAW);


    	m_NormalsOffset = m_VerticesArticulo.byteLength;
    	m_TexCoordsOffset = m_NormalsOffset + m_NormalsArticulo.byteLength;
    	m_BinormalOffset = m_TexCoordsOffset +m_TexCoordsArticulo.byteLength;
    	m_TangentOffset = m_BinormalOffset + m_BinormalsArticulo.byteLength;

    	GL.bufferSubData(GL.ARRAY_BUFFER, 0, m_VerticesArticulo);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_NormalsOffset, m_NormalsArticulo);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_TexCoordsOffset, m_TexCoordsArticulo);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_BinormalOffset, m_BinormalsArticulo);
    	GL.bufferSubData(GL.ARRAY_BUFFER, m_TangentOffset, m_TangentsArticulo);

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

Articulo.prototype.Render = function(program)
{
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, this.m_Textura);
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