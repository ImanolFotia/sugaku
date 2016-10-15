function Punto()
{
	this.m_Posicion;
	this.m_Punto0;
	this.m_Punto1;
	this.m_Punto2;
	this.m_Punto3;
}

Punto.prototype.Init = function(pos, p0, p1, p2, p3)
{
	this.m_Posicion = pos;
	this.m_Punto0 = p0;
	this.m_Punto1 = p1;
	this.m_Punto2 = p2;
	this.m_Punto3 = p3;
}