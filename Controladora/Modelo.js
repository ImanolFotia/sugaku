
function Modelo(){
this.m_VBO;

this.m_Positions;
this.m_Normals;
this.m_TexCoords;
this.m_Binormals;
this.m_Tangents;
this.m_Indices;
}



Modelo.prototype.Render = function(program, cubemap, texture, texture2, texture3)
{

    GL.activeTexture(GL.TEXTURE0);
    GL.bindTexture(GL.TEXTURE_CUBE_MAP, cubemap);
    GL.uniform1i(GL.getUniformLocation(program, "cubemap"),0);
    GL.activeTexture(GL.TEXTURE1);
    GL.bindTexture(GL.TEXTURE_2D, texture);
    GL.uniform1i(GL.getUniformLocation(program, "sampler"),1);
    GL.activeTexture(GL.TEXTURE2);
    GL.bindTexture(GL.TEXTURE_2D, texture2);
    GL.uniform1i(GL.getUniformLocation(program, "sampler2"),2);
    GL.activeTexture(GL.TEXTURE3);
    GL.bindTexture(GL.TEXTURE_2D, texture3);
    GL.uniform1i(GL.getUniformLocation(program, "sampler3"),3);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBO);

    GL.drawElements(GL.TRIANGLES, m_Indices.length, GL.UNSIGNED_SHORT, 0);

}

Modelo.prototype.cargarModelo = function(Position, Normals, TexCoords, Binormals, Tangents, Indices)
{

      m_Indices = Indices;
      m_Tangents = Tangents;
      m_Binormals = Binormals;
      m_Positions = Positions;
      m_TexCoords = TexCoords;
      m_Normals = Normals;

		  this.m_VBO = GL.createBuffer();

    	GL.bindBuffer(GL.ARRAY_BUFFER, this.m_VBO);
    	GL.bufferData(GL.ARRAY_BUFFER,
                  m_Positions.byteLength +
                  m_Normals.byteLength +
                  m_TexCoords.byteLength +
                  m_Binormals.byteLength +
                  m_Tangents.byteLength,
                  GL.STATIC_DRAW);

    	g_normalsOffset = m_Positions.byteLength;
    	g_texCoordsOffset = g_normalsOffset + m_Normals.byteLength;
    	g_binormalsOffset = g_texCoordsOffset + m_TexCoords.byteLength;
    	g_tangentsOffset = g_binormalsOffset + m_Binormals.byteLength;
    	GL.bufferSubData(GL.ARRAY_BUFFER, 0, m_Positions);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_normalsOffset, m_Normals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_texCoordsOffset, m_TexCoords);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_binormalsOffset, m_Binormals);
    	GL.bufferSubData(GL.ARRAY_BUFFER, g_tangentsOffset, m_Tangents);

    	var EBO = GL.createBuffer();
		  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, EBO);
		  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, m_Indices, GL.STATIC_DRAW);

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

    	return this.m_VBO;

}