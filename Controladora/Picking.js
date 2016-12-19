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

	
	if(facing > 0.0 && facing2 > 0.0) {coll = true;return Closer[0][1];} else{coll = false;}

	if(facing >= 0.7){coll = true; return Closer[0][1];}
	else if(facing2 >= 0.7){ coll = true; return Closer[1][1];}
	else{coll = true; return -1;}

}

Picking.prototype.testCollision = function(playerPos, playerDir)
{
	var Closer = [];
	for(var i = 0; i < this.Items.length; i++)
	{
		Closer[i] = [this.DistanciaAItem(playerPos, this.Items[i].getPosicion()), i];
	}

	
	Closer.sort(function(a, b){return a[0]-b[0]});

	var facing = Math.max(dot(InverseVector(playerDir), normalizar(subtractVectors(playerPos, this.Items[Closer[0][1]].getPosicion()))), 0.0);
	var facing2 = Math.max(dot(InverseVector(playerDir), normalizar(subtractVectors(playerPos, this.Items[Closer[1][1]].getPosicion()))), 0.0);

	
	//if(facing > 0.0 && facing2 > 0.0) {coll = true;} else{coll = false;}

	if(facing >= 0.975){coll = true;}
	else if(facing2 >= 0.975){ coll = true;}
	else{coll = false;}

}

Picking.prototype.DistanciaAItem = function(playerpos, itempos)
{
	return length(subtractVectors(playerpos, itempos));
}