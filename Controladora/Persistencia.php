<?php
function Guardar($idUsuario, $Nombre, $idFacebook, $puntaje)
{
	//Chequear si el ID existe
	$bd = new SQLite3('/Resources/Base_De_Datos/Sugaku.sqlite');


	$sql = "SELECT TOP 1 Usuario.id FROM Usuario WHERE Usuario.id = '$idUsuario';";
	$result = $bd->query($sql);

	if(result == 0)
	{
		$NuevoUsuarioSQL = "INSERT INTO Usuario (ID, Nombre, Facebook)
							VALUES ('$idUsuario', '$Nombre', '$idFacebook');";
		$bd->exec($NuevoUsuarioSQL);
	}

	$guardarPuntaje = "INSERT INTO Puntaje (ID_Usuario, Puntaje)
							VALUES ('$idUsuario', '$puntaje');";
	$bd->exec($guardarPuntaje);


}

$usuario = $_GET['user'];  
$name = $_GET['name'];  
$facebook = $_GET['face'];
$score = $_GET['sc'];
$action = $_GET['act'];

switch($action)
	case 1:
		Guardar($usuario, $name, $facebook, $score);
	//case 2:
		//Obtener();
?>