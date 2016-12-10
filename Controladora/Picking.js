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
	var Closer = [];
	for(var i = 0; i < this.Items.length; i++)
	{
		Closer[i] = [this.DistanciaAItem(playerPos, this.Items[i].getPosicion()), i];
	}

	
	Closer.sort(function(a, b){return a[0]-b[0]});

	var facing = Math.max(dot(InverseVector(playerDir), normalizar(subtractVectors(playerPos, this.Items[Closer[0][1]].getPosicion()))), 0.0);
	var facing2 = Math.max(dot(InverseVector(playerDir), normalizar(subtractVectors(playerPos, this.Items[Closer[1][1]].getPosicion()))), 0.0);

	
	if(facing > 0.0 && facing2 > 0.0) return Closer[0][1];

	if(facing >= 0.7) return Closer[0][1];
	else if(facing2 >= 0.7) return Closer[1][1];
	else return -1;

}

Picking.prototype.DistanciaAItem = function(playerpos, itempos)
{
	return length(subtractVectors(playerpos, itempos));
}