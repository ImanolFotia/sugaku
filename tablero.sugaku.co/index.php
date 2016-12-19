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

<center>
<br><br>
<table background=img1.jpg border="4" height="70%"   width="85%" ><tr><td> 
<?php
$umbral = $_POST['umbral'];  
if($umbral == null) $umbral = 7;
?>
<FORM class = "can" METHOD="POST" ACTION="pagina1.php">
<p >Umbral: <?php echo $umbral;?> </p>  <input type="text" name="umbral" placeholder="Default = 7"s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="sof" border="4" width="50%" bgcolor="#000" >
<tr>
    <th>Usuario ID</th>
    <th>Puntaje</th>

</tr>
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

$sql = "SELECT ID_Usuario, Puntaje FROM Puntaje ";
$result = $link->query($sql);
$array_productos_precio[15];
$array_productos_nombre[15];
$i = 0;
while ($row = $result->fetch_array(MYSQLI_NUM)){
echo '<tr><td>' .$row[0]. '</td>';
    echo '<td class="can"><img src="cruz.png" class="logo">' .$row[1]. '</td></tr>';
$i++;
}
  ?>
    




</table>
</center>


</table> 
</center>
<center>
<font color="#088A29">
<a href="pagina1.php">Transacciones</a> -
<a href="pagina2.php">Clientes Por Pais</a> - 
<a href="pagina3.php">Sistemas Operativos</a>
</font>
</center>
<br><br><br>
</div>
</body> 
</html>
