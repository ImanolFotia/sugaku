<html> 
<head><meta http-equiv="Content-Type" content="text/html; charset=gb18030"> 
<head>
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link rel="icon" href="favicon.ico" type="image/x-icon">
<title>Tablero Sugaku</title> 
<LINK href="style.css" rel="stylesheet" type="text/css">

</head> 

<body link="#088A29" vlink="#088A29" alink="#088A29"> 

<div id="Container">

<?php

$hostname = "localhost:3306"; // the hostname you created when creating the database
$username = "sugakuco_sugaku";      // the username specified when setting up the database
$password = "Th1rt3en";      // the password specified when setting up the database
$database = "sugakuco_sugaku";      // the database name chosen when setting up the database 


$link = mysqli_connect($hostname, $username, $password, $database);
if (mysqli_connect_errno()) {
   die("Connect failed: %s\n" + mysqli_connect_error());
   exit();
}

$umbral1 = -1;
$umbral2 = -1;
?>
<center>
<br><br>
<table background=img.jpg border="4" height="70%"   width="85%" ><tr><td> 
<FORM class = "can" METHOD="POST" ACTION="index.php">
<p >Ingresar ID de usuario: </p>  <input type="text" name="umbral1" placeholder=""s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="top5" border="4" width="50%" bgcolor="#000" >
<tr>
	<th id="titulo1">Usuario ID</th>
	<th id="titulo2">Top 5 Puntajes Altos</th>
</tr>

<?php
$umbral1 = $_POST['umbral1'];  
if($umbral1 == null) $umbral1 = -1;
$sql;
if($umbral1 == -1){
$sql = "SELECT DISTINCT Usuario.Nombre, PUNTAJE
FROM Puntaje
INNER JOIN Usuario ON Puntaje.ID_Usuario = Usuario.ID
ORDER BY Puntaje.PUNTAJE DESC 
LIMIT 5;";
}
else
{
$sql =  "SELECT DISTINCT Usuario.Nombre, PUNTAJE
FROM Puntaje
INNER JOIN Usuario ON Puntaje.ID_Usuario = Usuario.ID
WHERE Puntaje.ID_Usuario = '$umbral1'
ORDER BY Puntaje.PUNTAJE DESC 
LIMIT 5;";
}
$result = $link->query($sql);
$array_productos_precio[15];
$array_productos_nombre[15];
$i = 0;
while($row = $result->fetch_array(MYSQLI_NUM)){
echo '<tr><th id="top1user">' .$row[0]. '</td>';
    echo '<th id="top1score">' .$row[1]. '</td></tr>';

}
?>
</table>
</center>
<br>
<br>
<center>
<table class="top5" border="4" width="50%" bgcolor="#000" >
<tr>
	<th id="titulo1">Usuario ID</th>
	<th id="titulo2">Top 5 Puntajes Bajos</th>
</tr>

<?php
$umbral1 = $_POST['umbral1'];  
if($umbral1 == null) $umbral1 = -1;
$sql;
if($umbral1 == -1){
$sql = "SELECT DISTINCT Usuario.Nombre, PUNTAJE
FROM Puntaje
INNER JOIN Usuario ON Puntaje.ID_Usuario = Usuario.ID
ORDER BY Puntaje.PUNTAJE ASC
LIMIT 5;";
}
else
{
$sql =  "SELECT DISTINCT Usuario.Nombre, PUNTAJE
FROM Puntaje
INNER JOIN Usuario ON Puntaje.ID_Usuario = Usuario.ID
WHERE Puntaje.ID_Usuario = '$umbral1'
ORDER BY Puntaje.PUNTAJE ASC
LIMIT 5;";
}
$result = $link->query($sql);
$array_productos_precio[15];
$array_productos_nombre[15];
$i = 0;
while($row = $result->fetch_array(MYSQLI_NUM)){
echo '<tr><th id="top1user">' .$row[0]. '</td>';
    echo '<th id="top1score">' .$row[1]. '</td></tr>';

}
?>
</table>
</center>
<br>
<br>
<FORM class = "can" METHOD="POST" ACTION="index.php">
<p >Ingresar ID de usuario: </p>  <input type="text" name="umbral2" placeholder=""s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="top5" border="4" width="50%" bgcolor="#000" >
<tr>
	<th id="titulo5">&Uacute;ltimos 5 Puntajes</th>
</tr>

<?php
$umbral2 = $_POST['umbral2'];  
if($umbral2 == null) $umbral2 = -1;
$sql;
if($umbral2 == -1){
$sql = "SELECT PUNTAJE
FROM Puntaje
ORDER BY Puntaje.ID DESC 
LIMIT 5;";
}
else
{
$sql =  "SELECT PUNTAJE
FROM Puntaje
WHERE Puntaje.ID_Usuario = '$umbral2'
ORDER BY Puntaje.PUNTAJE DESC 
LIMIT 5;";
}
$result = $link->query($sql);
$array_productos_precio[15];
$array_productos_nombre[15];
$i = 0;
while($row = $result->fetch_array(MYSQLI_NUM)){
echo '<tr><th id="ultimoscore1">' .$row[0]. '</td>';

}
?>
</table>
</center>
<br>
<br>
<button type="button" id="btnmostrar" onclick="mostrar();">Mostrar todos los puntajes</button>
<button type="button" id="btnocultar" onclick="ocultar();">Ocultar todos los puntajes</button>
<script type="text/javascript"> 
    function mostrar()
    { document.getElementById("allscores").style.visibility="visible";
      document.getElementById("btnocultar").style.visibility="visible";
      document.getElementById("btnmostrar").style.visibility="hidden"; }
</script>
<script type="text/javascript"> 
    function ocultar()
    { document.getElementById("allscores").style.visibility="hidden";
      document.getElementById("btnocultar").style.visibility="hidden";
      document.getElementById("btnmostrar").style.visibility="visible"; }
</script>
<div id="allscores">
<?php
$umbral = $_POST['umbral'];  
if($umbral == null) $umbral = 7;
?>
<br>
<br>
<center>
<table class="sof" border="4" width="50%" bgcolor="#000" >
<tr>
    <th id="titulo3">Usuario ID</th>
    <th id="titulo4">Puntaje</th>

</tr>
<?php

$sql = "SELECT Usuario.Nombre, Puntaje.PUNTAJE FROM Puntaje
INNER JOIN Usuario ON Puntaje.ID_Usuario=Usuario.ID
ORDER BY Puntaje.ID
DESC";
$result = $link->query($sql);
while ($row = $result->fetch_array(MYSQLI_NUM)){
echo '<tr><td>' .$row[0]. '</td>';
    echo '<td class="can">' .$row[1]. '</td></tr>';
}
  ?>
    
</table>
</center>
</div>


</table> 
</center>
<center>
</center>
<br><br><br>
</div>
</body> 
</html>
