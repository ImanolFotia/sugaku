function Camara()
{
	this.m_Posicion;
	this.m_PosicionSiguiente;
	this.m_Direccion;
	this.m_Up;
	this.m_AnguloHorizontal;
	this.m_AnguloVertical;
	this.m_FoV;
	this.m_ViewMatrix;
	this.m_PerspectiveMatrix;
	this.m_Aspecto;
	this.m_NearPlane;
	this.m_FarPlane;
	this.m_LastY;
	this.m_LastX;
	this.m_MouseSpeed;
	this.m_Derecha;
	this.m_VectorGiro;
	this.m_VectorMovimiento;
	this.m_VectorMovimientoAnterior;
	this.m_CameraSpeed;

	this.m_GiroIzquierda;
	this.m_GiroDerecha;
	this.m_Avanza;
	this.m_Retrocede;
	this.m_Tienda;
}

Camara.prototype.Init = function(pos /*Float32Array([x, y, z])*/, dir /*Float32Array([x, y, z])*/, FoV /*float*/, Asp /*float*/)
{
	this.m_Posicion = pos;
	this.m_PosicionSiguiente = new Float32Array([0.0,0.0,0.0,-1.0]);
	this.m_Direccion = dir;
	this.m_FoV = degToRad(FoV);
	this.m_Up = new Float32Array([0,1,0]);
	this.m_Aspecto = Asp;

	this.m_NearPlane = 0.1;
	this.m_FarPlane = 1000.0;

 	this.m_ViewMatrix = new Float32Array(16);
	this.m_ViewMatrix = Identity();

	this.m_PerspectiveMatrix = new Float32Array(16);
	this.m_PerspectiveMatrix = Identity();

	this.m_AnguloHorizontal = 0.0;
	this.m_AnguloVertical = 0.0;

	this.m_LastY = 0.0;
	this.m_LastX = 0.0;

	this.m_VectorGiro = 0.0;
	this.m_VectorMovimiento = [0.0, 0.0, 0.0];
	this.m_MouseSpeed = 0.01;

	this.m_CameraSpeed = 0.5;
	this.m_Derecha = [0.0, 0.0, 0.0];

	this.m_VectorMovimiento[0] = this.m_Posicion[0];
	this.m_VectorMovimiento[1] = 0.0;
	this.m_VectorMovimiento[2] = this.m_Posicion[2];


	this.m_VectorMovimientoAnterior = pos;

	
	this.m_GiroIzquierda = true;
	this.m_GiroDerecha = true;
	this.m_Tienda = false;
}

Camara.prototype.MoverAdelante = function()
{
	var obj = normalizar(this.m_Direccion);


	this.m_Posicion[0] += obj[0] * this.m_CameraSpeed; 
	this.m_Posicion[1] += obj[1] * this.m_CameraSpeed; 
	this.m_Posicion[2] += obj[2] * this.m_CameraSpeed; 
}


Camara.prototype.MoverDerecha = function()
{
	var obj = normalizar(this.m_Derecha);

	this.m_Posicion[0] -= obj[0] * this.m_CameraSpeed;
	this.m_Posicion[1] -= obj[1] * this.m_CameraSpeed;
	this.m_Posicion[2] -= obj[2] * this.m_CameraSpeed;
}

Camara.prototype.MoverIzquierda = function()
{	
	var obj = normalizar(this.m_Derecha);

	this.m_Posicion[0] += obj[0] * this.m_CameraSpeed;
	this.m_Posicion[1] += obj[1] * this.m_CameraSpeed;
	this.m_Posicion[2] += obj[2] * this.m_CameraSpeed;
}

Camara.prototype.MoverAtras = function()
{
	var obj = normalizar(this.m_Direccion);
	this.m_Posicion[0] -= obj[0] * this.m_CameraSpeed;
	this.m_Posicion[1] -= obj[1] * this.m_CameraSpeed;
	this.m_Posicion[2] -= obj[2] * this.m_CameraSpeed;
}

Camara.prototype.GirarDerecha = function()
{
	this.m_VectorGiro -= degToRad(90.0);

	this.m_GiroDerecha = true;

    this.m_Up = [0,1,0];

}

Camara.prototype.GirarIzquierda = function()
{
	this.m_VectorGiro += degToRad(90.0);

	this.m_GiroIzquierda = true;

    this.m_Up = [0,1,0];
}


Camara.prototype.Avanzar = function()
{
	var b = Math.round(Math.sin(this.m_VectorGiro));
	var c = Math.round(Math.cos(this.m_VectorGiro));

	this.m_VectorMovimiento[0] = this.m_VectorMovimiento[0] + b * 21.0;
	this.m_VectorMovimiento[1] = 18;
	this.m_VectorMovimiento[2] = this.m_VectorMovimiento[2] + c * 21.0;


	this.m_Avanza = true;

    this.m_Up = [0,1,0];

}


Camara.prototype.Retroceder = function()
{
	var b = Math.round(Math.sin(this.m_VectorGiro));
	var c = Math.round(Math.cos(this.m_VectorGiro));

	this.m_VectorMovimiento[0] = this.m_VectorMovimiento[0] - b * 21.0;
	this.m_VectorMovimiento[1] = 18;
	this.m_VectorMovimiento[2] = this.m_VectorMovimiento[2] - c * 21.0;

	this.m_Retrocede = true;

    this.m_Up = [0,1,0];

}

Camara.prototype.IrTienda = function(items)
{
	if(items >= 5){
	var b = Math.round(Math.sin(this.m_VectorGiro));
	var c = Math.round(Math.cos(this.m_VectorGiro));
	this.m_VectorMovimiento[0] = 15;
	this.m_VectorMovimiento[1] = 18;
	this.m_VectorMovimiento[2] = 35;

	this.m_Tienda = true;

    this.m_Up = [0,1,0];

    return true;
}
return false;
}

Camara.prototype.ComputarDireccion = function()
{
	this.m_AnguloHorizontal += this.m_MouseSpeed * ( this.m_LastX - mouse.x ) ;
    this.m_AnguloVertical   -= this.m_MouseSpeed * ( this.m_LastY - mouse.y ) ;


	this.LockCamera();
	this.m_Direccion = 	[
                    		Math.cos( this.m_AnguloVertical ) * Math.sin( this.m_AnguloHorizontal ),
                    		Math.sin( this.m_AnguloVertical ),
                    		Math.cos( this.m_AnguloVertical ) * Math.cos( this.m_AnguloHorizontal )
                	   	];
                	   	
    this.m_Derecha 	= 	[
                			Math.sin(this.m_AnguloHorizontal     -       3.14*0.5),
                			0,
                			Math.cos(this.m_AnguloHorizontal     -       3.14*0.5)
            			];
    this.m_Up = cross(this.m_Direccion, this.m_Derecha);

    this.m_LastY = mouse.y;
    this.m_LastX = mouse.x;
}

Camara.prototype.Interpolar = function()
{

		//console.log(this.m_Posicion[0], this.m_Posicion[2]);
		if(this.m_Tienda)
		{
			this.m_Posicion = lerp(this.m_Posicion, [15, 18, 35], 0.05);
			this.m_Direccion = [0,0,-1];

			//console.log(this.m_Posicion[1], this.m_Posicion[2], this.m_Direccion[0], this.m_Direccion[2]);
		}
		else{
		if(this.m_GiroDerecha)
		{
			var b = Math.round(Math.sin(this.m_VectorGiro));
			var c = Math.round(Math.cos(this.m_VectorGiro));
			
			this.m_Direccion = slerp(this.m_Direccion, [b, 0, c], 0.05);
			this.m_Derecha = 	[
                				Math.sin(this.m_VectorGiro     -       3.14*0.5),
                				0,
                				Math.cos(this.m_VectorGiro    -       3.14*0.5)
            					];
            //console.log("Direccion: x:" + this.m_Direccion[0] + " y: " + this.m_Direccion[1] + " z: " + this.m_Direccion[2]);
            //console.log("Derecha: x:" + this.m_Derecha[0] + " y: " + this.m_Derecha[1] + " z: " + this.m_Derecha[2]);


				if(Math.round(this.m_Direccion[0]) == b && Math.round(this.m_Direccion[2]) == c)
					this.m_GiroDerecha = false;
		}

		if(this.m_GiroIzquierda)
		{
			var b = Math.round(Math.sin(this.m_VectorGiro));
			var c = Math.round(Math.cos(this.m_VectorGiro));
			
			this.m_Direccion = slerp(this.m_Direccion, [b, 0, c], 0.05);
			this.m_Derecha = 	[
                				Math.sin(this.m_VectorGiro     -       3.14*0.5),
                				0,
                				Math.cos(this.m_VectorGiro    -       3.14*0.5) 
            					];
            //console.log("Direccion: x:" + this.m_Direccion[0] + " y: " + this.m_Direccion[1] + " z: " + this.m_Direccion[2]);
            //console.log("Derecha: x:" + this.m_Derecha[0] + " y: " + this.m_Derecha[1] + " z: " + this.m_Derecha[2]);

			if(Math.round(this.m_Direccion[0]) == b && Math.round(this.m_Direccion[2]) == c)
				this.m_GiroDerecha = false;
		}

		if(this.m_Avanza)
		{
			/*if(Math.round(this.m_VectorMovimiento[2]) < 10 || Math.round(this.m_VectorMovimiento[2]) > 80 || Math.round(this.m_VectorMovimiento[0]) < 10 || Math.round(this.m_VectorMovimiento[0]) > 125){
				console.log("No se puede avanzar");
				this.m_VectorMovimiento = this.m_VectorMovimientoAnterior;
				console.log(this.m_VectorMovimientoAnterior[0], this.m_VectorMovimientoAnterior[2]);
				this.m_Avanza = false;
			}else{*/
				this.m_Posicion = lerp(this.m_Posicion, this.m_VectorMovimiento, 0.05);
				this.m_VectorMovimientoAnterior = this.m_VectorMovimiento;
            //console.log("m_Posicion: x:" + this.m_Posicion[0] + " y: " + this.m_Posicion[1] + " z: " + this.m_Posicion[2]);
			//}

		}

		if(this.m_Retrocede)
		{
			/*if(Math.round(this.m_VectorMovimiento[2]) < 10 || Math.round(this.m_VectorMovimiento[2]) > 80 || Math.round(this.m_VectorMovimiento[0]) < 10 || Math.round(this.m_VectorMovimiento[0]) > 125){
				console.log("No se puede avanzar");
				//this.m_VectorMovimiento = this.m_VectorMovimientoAnterior;
				this.m_Retrocede = false;
			}else{*/
				this.m_Posicion = lerp(this.m_Posicion, this.m_VectorMovimiento, 0.05);
            //console.log("m_Posicion: x:" + this.m_Posicion[0] + " y: " + this.m_Posicion[1] + " z: " + this.m_Posicion[2]);
				//this.m_VectorMovimientoAnterior = this.m_VectorMovimiento;
			//}
		}
	}



}

Camara.prototype.LockCamera = function()
{
    if(this.verticalAngle > 1.4208)
        this.verticalAngle = 1.4208;

    if(this.verticalAngle < -1.4508)
        this.verticalAngle = -1.4508;

    if(this.horizontalAngle < -3.1416)
        this.horizontalAngle = 3.1414;

    if(this.horizontalAngle>3.1416)
        this.horizontalAngle = -3.1414;

}

Camara.prototype.PollEvents = function()
{
	document.onmousemove = mouse.move;

	document.onkeydown = keyboard.press;
	document.onkeyup = keyboard.release;

	if(noclip)
		this.ComputarDireccion();
	else
		this.Interpolar();


	if(keyboard.pressed == "KeyW")
		this.MoverAdelante();
	if(keyboard.pressed == "KeyS")
		this.MoverAtras();
	if(keyboard.pressed == "KeyA")
		this.MoverIzquierda();
	if(keyboard.pressed == "KeyD")
		this.MoverDerecha();

	//console.log(mouse.x);

}

Camara.prototype.Update = function()
{
	var objetivo = sumVectors(this.m_Direccion, this.m_Posicion);
	//objetivo = normalizar(objetivo);

	this.m_ViewMatrix = makeLookAt(this.m_Posicion, objetivo, this.m_Up);

	this.m_PerspectiveMatrix = makePerspective(this.m_FoV, this.m_Aspecto, 0.1, 1000.0);
/*
	console.log("Posicion " + "x: " + this.m_Posicion[0] + " y: " + this.m_Posicion[1] + " z: "  + this.m_Posicion[2]);
	console.log("Direccion " + "x: " + this.m_Direccion[0] + " y: " + this.m_Direccion[1] + " z: "  + this.m_Direccion[2]);*/
}

/** Getters*/
Camara.prototype.getPosicion = function()
{
	return this.m_Posicion;
}

Camara.prototype.getDireccion = function()
{
	return this.m_Direccion;
}

Camara.prototype.getObjetive = function()
{
	return normalizar(sumVectors(this.m_Posicion, this.m_Direccion));
}

Camara.prototype.getViewMatrix = function()
{
	return this.m_ViewMatrix;
}

Camara.prototype.getPerspectiveMatrix = function()
{
	return this.m_PerspectiveMatrix;
}

/** Setters*/
Camara.prototype.setFoV = function(FoV)
{
	this.m_FoV = FoV;
}

Camara.prototype.setPosicion = function(pos)
{
	this.m_Posicion = pos;
}

Camara.prototype.setDireccion = function(dir)
{
	this.m_Direccion = dir;
}