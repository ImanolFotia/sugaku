function Inventario()
{
	this.m_MaxItems;
	this.m_Items;
	this.m_CostoTotal;
	this.m_CantItems;
}

Inventario.prototype.Init = function()
{
	this.m_CostoTotal = 0;
	this.m_CantItems = 0;
	this.m_Items = [];
	this.m_MaxItems = 5;
}

Inventario.prototype.AgregarItem = function(item)
{
	if(this.m_CantItems <= this.m_MaxItems)
	{
		this.m_CantItems+=1;
		this.m_Items[this.m_CantItems - 1] = item;
		this.m_CostoTotal += item[1];
	}

}

Inventario.prototype.getPrecioItem = function(index)
{
	if(index <= this.m_MaxItems)
	{
		return this.m_Items[index];
	}
}