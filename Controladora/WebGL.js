(function(){main();});

function main()
{
	GL = crearContextoOpenGL();
	
	Canvas = obtenerDatosDeCanvas();
	
	renderer = new Renderer;
	
	prepararMatrices();

	requestAnimationFrame(Render);
}

