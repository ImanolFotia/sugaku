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
<table background=img.jpg border="4" height="70%"   width="85%" ><tr><td> 
<FORM class = "can" METHOD="POST" ACTION="pagina1.php">
<p >Ingresar ID de usuario: <?php echo $umbral;?> </p>  <input type="text" name="umbral" placeholder=""s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="top5" border="4" width="50%" bgcolor="#000" >
<tr>
	<th id="titulo1">Usuario ID</th>
	<th id="titulo2">Top 5 Puntajes</th>
</tr>
<tr>
	<th id="top1user"></th>
	<th id="top1score"></th>
</tr>
<tr>
	<th id="top2user"></th>
	<th id="top2score"></th>
</tr>
<tr>
	<th id="top3user"></th>
	<th id="top3score"></th>
</tr>
<tr>
	<th id="top4user"></th>
	<th id="top4score"></th>
</tr>
<tr>
	<th id="top5user"></th>
	<th id="top5score"></th>
</tr>
</table>
</center>
<br>
<br>
<FORM class = "can" METHOD="POST" ACTION="pagina1.php">
<p >Ingresar ID de usuario: <?php echo $umbral;?> </p>  <input type="text" name="umbral" placeholder=""s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="top5" border="4" width="50%" bgcolor="#000" >
<tr>
	<th id="titulo5">&Uacute;ltimos 5 Puntajes</th>
</tr>
<tr>
	<th id="ultimoscore1"></th>
</tr>
<tr>
	<th id="ultimoscore2"></th>
</tr>
<tr>
	<th id="ultimoscore3"></th>
</tr>
<tr>
	<th id="ultimoscore4"></th>
</tr>
<tr>
	<th id="ultimoscore5"></th>
</tr>
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
<FORM class = "can" METHOD="POST" ACTION="pagina1.php">
<p >Umbral: <?php echo $umbral;?> </p>  <input type="text" name="umbral" placeholder="Default = 7"s>
<input type="submit" value="Actualizar"> </FORM>
<br>
<br>
<center>
<table class="sof" border="4" width="50%" bgcolor="#000" >
<tr>
    <th id="titulo3">Usuario ID</th>
    <th id="titulo4">Puntaje</th>

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
</div>


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
