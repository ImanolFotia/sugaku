//función para agregar una fila y luego texto a esa fila
function agregarFila(texto1, texto2){
	var table = document.getElementById("TableCart");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	//a partir de acá se reemplazaría con el objeto objetoCompra, o como se llame. Utilizaría el path de la imagen y el nombre del objeto.
    var img = document.createElement('img');
    img.src = "Resources/Texturas/box.jpg";
    cell1.appendChild(img);
	cell2.innerHTML = texto2;
}
//función para mostrar u ocultar el cart
function hideCart(){
	document.getElementById("TableCart").style.zIndex = -1;
}
function showCart(){
	document.getElementById("TableCart").style.zIndex = 2;
}
