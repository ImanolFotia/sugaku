<?php

$usuario = $_GET['user'];  
$name = $_GET['name'];  
$facebook = $_GET['face'];
$score = $_GET['sc'];
$action = $_GET['act'];


function Guardar(){
$hostname = "localhost:3306"; 
$username = "sugakuco_sugaku";      
$password = "Th1rt3en";      
$database = "sugakuco_sugaku";      

global $usuario, $name, $facebook, $score, $action;

$link = mysqli_connect($hostname, $username, $password, $database);
if (mysqli_connect_errno()) {
   die("Connect failed: %s\n" + mysqli_connect_error());
   exit();
}

//Chequear si el usuario existe con nombre
$sql = "SELECT * FROM Usuario WHERE Usuario.Nombre = $name";
$res = $link->query($sql);
if($res->num_rows === 0)
{
	$insertUser = "INSERT INTO Usuario(Nombre, Facebook) VALUES ($name, $facebook)";
	if($link->query($insertUser) === TRUE)
	{
		echo "Dato Insertado";
	}
}
else
{
	echo "El usuario ya existe";
}

$IDsql = "SELECT ID FROM Usuario WHERE Usuario.Nombre = $name";
$ID = $link->query($IDsql);
$ID = $ID->fetch_array(MYSQLI_NUM);
$ID = $ID[0];
$insertPuntaje = "INSERT INTO Puntaje(ID_Usuario, Puntaje) VALUES ($ID, $score)";
	if($link->query($insertPuntaje) === TRUE)
	{
		echo "Dato Insertado";
	}
	else
	{
		echo "Ocurrio un error";
	}
}

Guardar();

?>