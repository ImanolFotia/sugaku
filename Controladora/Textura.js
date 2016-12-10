function loadTexture(path)
{
	var texture = GL.createTexture();
	if(!texture)
	{
		alert("No se pudo crear la textura");
		return;
	}

	var image = new Image();
	if(!image)
	{
			alert("no se pudo crear la imagen");
			return;
	}
	image.crossOrigin = "Anonymous";
	image.src = path;
	image.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, texture);

		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_BORDER);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_BORDER);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
		GL.generateMipmap(GL.TEXTURE_2D);
	}


	return texture;

}