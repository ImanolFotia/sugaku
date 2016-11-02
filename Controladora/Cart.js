//función para agregar una fila y luego texto a esa fila
function agregarFila(texto){
	var fila = cart.insertRow(0);
	var celdaDerecha = fila.insertCell(1);
	celdaDerecha.innerHTML = texto;
}
//función para mostrar u ocultar el cart
function hideCart(){
	document.getElementById("TableCart").style.zIndex = -1;
}
function showCart(){
	document.getElementById("TableCart").style.zIndex = 2;
}
