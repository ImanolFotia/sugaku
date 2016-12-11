
function loacubemap()
{
	var texture = GL.createTexture();
	if(!texture)
	{
		alert("No se pudo crear la textura");
		return;
	}

	var image = new Image();
	image.crossOrigin = "Anonymous";
	image.src = "Resources/skybox/right.jpg";
	image.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 0, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	var image2 = new Image();
	image2.crossOrigin = "Anonymous";
	image2.src = "Resources/skybox/left.jpg";
	image2.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 1, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image2);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	var image3 = new Image();
	image3.crossOrigin = "Anonymous";
	image3.src = "Resources/skybox/top.jpg";
	image3.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 2, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image3);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	var image4 = new Image();
	image4.crossOrigin = "Anonymous";
	image4.src = "Resources/skybox/bottom.jpg";
	image4.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 3, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image4);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	var image5 = new Image();
	image5.crossOrigin = "Anonymous";
	image5.src = "Resources/skybox/back.jpg";
	image5.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 4, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image5);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	var image6 = new Image();
	image6.crossOrigin = "Anonymous";
	image6.src = "Resources/skybox/front.jpg";
	image6.onload = function()
	{
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
		GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + 5, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image6);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    		GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	};

	return texture;
}

function loadcubeimage(i, texture, image)
{
	GL.activeTexture(GL.TEXTURE0);
	GL.bindTexture(GL.TEXTURE_CUBE_MAP, texture);
	GL.texImage2D(GL.TEXTURE_CUBE_MAP_POSITIVE_X + i, null, GL.RGB, GL.RGB, GL.UNSIGNED_BYTE, image);
	GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
	GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
}