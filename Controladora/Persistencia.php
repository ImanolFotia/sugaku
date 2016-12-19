<?php

$usuario = $_GET['user'];  
$name = $_GET['tagNombre'];  
$facebook = $_GET['tagFacebook'];
$score = $_GET['tagScore'];
$action = $_GET['tagAction'];


$hostname = "localhost:3306"; // the hostname you created when creating the database
$username = "sugakuco_sugaku";      // the username specified when setting up the database
$password = "Th1rt3en";      // the password specified when setting up the database
$database = "sugakuco_sugaku";      // the database name chosen when setting up the database 


$link = mysqli_connect($hostname, $username, $password, $database);
if (mysqli_connect_errno()) {
   die("Connect failed: %s\n" + mysqli_connect_error());
   exit();
}

//Chequear si el usuario existe con nombre
$sql = "SELECT * FROM Usuario WHERE Usuario.Nombre = '$name'";
$resn = $link->query($sql);

$sql = "SELECT * FROM Usuario WHERE Usuario.Facebook = '$facebook'";
$resf = $link->query($sql);

//echo $sql;
//echo $res->num_rows;
if($resn->num_rows === 0 || ($resf->num_rows === 0 || $facebook === ""))
{
	$insertUser = "INSERT INTO Usuario(Nombre, Facebook) VALUES ('$name', '$facebook')";
	if($link->query($insertUser) === TRUE)
	{
		//echo "Dato Insertado";
	}
}
else
{
	//echo "El usuario ya existe";
}

$IDsql = "SELECT ID FROM Usuario WHERE Usuario.Nombre = '$name'";
$ID = $link->query($IDsql);
$ID = $ID->fetch_array(MYSQLI_NUM);
$ID = $ID[0];
//echo $ID;
$insertPuntaje = "INSERT INTO Puntaje(ID_Usuario, Puntaje) VALUES ($ID, $score)";
	if($link->query($insertPuntaje) === TRUE)
	{
		//echo "Dato Insertado";
	}
	else
	{
		//echo "Ocurrio un error";
    		
	}

header("Location: http://www.sugaku.co/index.php");
exit();
?>