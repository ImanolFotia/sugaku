function Sprite()
{
	this.m_TexturaSprite;

	this.m_VBOSprite;

	this.m_VerticesSprite;
	this.m_NormalsSprite;
	this.m_TexCoordsSprite;
	this.m_BinormalsSprite;
	this.m_TangentsSprite;

	this.m_VerticesOffsetSprite;
	this.m_NormalsOffsetSprite;
	this.m_TexCoordsOffsetSprite;
	this.m_TangentOffsetSprite;
	this.m_BinormalOffsetSprite;
}

Sprite.prototype.Init = function(textura)
{
    this.m_TexturaSprite = loadTexture(textura);

}

Sprite.prototype.InitVAO = function()
{


	this.m_VerticesSprite = new Float32Array([-1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0]);

	this.m_NormalsSprite = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	this.m_TexCoordsSprite = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);
	
	this.m_BinormalsSprite = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);

	this.m_TangentsSprite = new Float32Array([ 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);


	this.m_VBOSprite = GL.createBuffer();

	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBOSprite);
	GL.bufferData(GL.ARRAY_BUFFER, 
                  this.m_VerticesSprite.byteLength +
                  this.m_NormalsSprite.byteLength +
                  this.m_TexCoordsSprite.byteLength +
                  this.m_BinormalsSprite.byteLength +
                  this.m_TangentsSprite.byteLength, GL.STATIC_DRAW);


    	this.m_NormalsOffsetSprite = this.m_VerticesSprite.byteLength;
    	this.m_TexCoordsOffsetSprite = this.m_NormalsOffsetSprite + this.m_NormalsSprite.byteLength;
    	this.m_BinormalOffsetSprite = this.m_TexCoordsOffsetSprite +this.m_TexCoordsSprite.byteLength;
    	this.m_TangentOffsetSprite = this.m_BinormalOffsetSprite + this.m_BinormalsSprite.byteLength;

    	GL.bufferSubData(GL.ARRAY_BUFFER, 0, this.m_VerticesSprite);
    	GL.bufferSubData(GL.ARRAY_BUFFER, this.m_NormalsOffsetSprite, this.m_NormalsSprite);
    	GL.bufferSubData(GL.ARRAY_BUFFER, this.m_TexCoordsOffsetSprite, this.m_TexCoordsSprite);
    	GL.bufferSubData(GL.ARRAY_BUFFER, this.m_BinormalOffsetSprite, this.m_BinormalsSprite);
    	GL.bufferSubData(GL.ARRAY_BUFFER, this.m_TangentOffsetSprite, this.m_TangentsSprite);

	    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    	GL.enableVertexAttribArray(0);
    	GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, this.m_NormalsOffsetSprite);
		GL.enableVertexAttribArray(1);
    	GL.vertexAttribPointer(2, 2, GL.FLOAT, false, 0, this.m_TexCoordsOffsetSprite);
    	GL.enableVertexAttribArray(2);
    	GL.vertexAttribPointer(3, 3, GL.FLOAT, false, 0, this.m_BinormalOffsetSprite);
    	GL.enableVertexAttribArray(3);
    	GL.vertexAttribPointer(4, 3, GL.FLOAT, false, 0, this.m_TangentOffsetSprite);
    	GL.enableVertexAttribArray(4);

}

Sprite.prototype.Render = function(program)
{
    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_2D, this.m_TexturaSprite);
    GL.uniform1i(GL.getUniformLocation(program, "sampler"),0);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBOSprite);

    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(0);
    GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, this.m_NormalsOffsetSprite);
	GL.enableVertexAttribArray(1);
    GL.vertexAttribPointer(2, 2, GL.FLOAT, false, 0, this.m_TexCoordsOffsetSprite);
    GL.enableVertexAttribArray(2);
    GL.vertexAttribPointer(3, 3, GL.FLOAT, false, 0, this.m_BinormalOffsetSprite);
    GL.enableVertexAttribArray(3);
    GL.vertexAttribPointer(4, 3, GL.FLOAT, false, 0, this.m_TangentOffsetSprite);
    GL.enableVertexAttribArray(4);

    GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
}
