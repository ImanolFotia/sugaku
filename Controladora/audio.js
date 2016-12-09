function InicializarSistemaAudio()
{
	plop.Init(1, "plop", "mp3", false, 1, 1);
	background.Init(2, "Background", "mp3", true, 1, 0.5);
	math.Init(3, "Math", "mp3", false, 1, 1);
	menu.Init(4, "Menu", "mp3", false, 1, 1);
	final.Init(5, "Final", "mp3", false, 1, 1);
}

function Sound()
{
	this.id;
	this.name;
	this.format;
	this.loop;
	this.velocity;
	this.volume;
	this.audio;
}

Sound.prototype.Init = function(id, name, format, loop, velocity, volume)
{
	this.id = id; //int
	this.name = name; //name of the file
	this.format = format; //file extension
	this.loop = loop; //boolean
	this.velocity = velocity; //decimal, -bwd, +fwd, default:1
	this.volume = volume; //number range from 0 to 1
	this.audio = new Audio("Resources/Audio/"+this.name+"."+this.format);
	this.audio.loop = this.loop;
	this.audio.playbackRate = this.velocity;
	this.audio.volume = this.volume;
}

Sound.prototype.Play = function()
{
    this.audio.play();
}

Sound.prototype.Pause = function()
{
	this.audio.pause();
}