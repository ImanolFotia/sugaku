function Picking()
{
	this.Items = [];
}

Picking.prototype.Init = function(items)
{
	this.Items = items;
}

Picking.prototype.Pick = function(playerPos, playerDir)
{
	var item1 = [100, 0], item2 = [100, 0];
	for(var i = 0; i < Items.length(); i++)
	{
		var tmpPos = DistanciaAItem(playerpos, items[i].getPosicion());
		if(item1 >= tmpPos) item1 = [tmpPos, i];
		if(item2 >= item1) item2 = [item1];
	}

	var facing = Math.max(Math.clamp(dot(playerDir, normalizar(sumVectors(playerpos, item1[0])))), 0.0);
	var facing2 = Math.max(Math.clamp(dot(playerDir, normalizar(sumVectors(playerpos, item2[0])))), 0.0);

	if(facing > 0.5)
		return item1[1];
	else
		return item2[1];

}

Picking.prototype.DistanciaAItem = function(playerpos, itempos)
{
	return length(playerpos + itempos);
}