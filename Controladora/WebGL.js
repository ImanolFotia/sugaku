(function(){main();});

function main()
{
	GL = crearContextoOpenGL();
	
	Canvas = obtenerDatosDeCanvas();
	
	renderer = new Renderer;

	requestAnimationFrame(Render);
}

