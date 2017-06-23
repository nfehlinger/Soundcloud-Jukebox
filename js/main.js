Song = function(id, title){
	this.id = id;
	this.title = title;
}

Jukebox = function(){
	this.songs = [];
	this.players = [];
	this.currentSong = 0;
	this.SC = SC;
	this.SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });
}

Jukebox.prototype.addSong = function(){
  for( let i=0; i<arguments.length; i++){
    this.songs.push( arguments[i] );
	}
}

Jukebox.prototype.play = function(){
	const self = this;
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
		current = document.querySelector("#current");
	if(player){
		player.play();
	}else{
		this.SC.stream('/tracks/'+song.id).then(function(p){
			self.players[self.currentSong] = p;
			self.play();
		});
	}
	current.innerText = song.title;
}

Jukebox.prototype.pause = function(){
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
	player.pause();
};

Jukebox.prototype.stop = function(){
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong]
		current = document.querySelector("#current");
	player.pause();
	this.currentSong = 0;
	player.seek(0);
	current.innerText = " "
};

Jukebox.prototype.forward = function(){
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
	if(this.currentSong < this.songs.length - 1){
		this.currentSong += 1;
	}else{
		this.currentSong = 0;
	};
	player.seek(0);
	this.play();
	console.log(this.currentSong);
};

Jukebox.prototype.back = function(){
	let player = this.players[this.currentSong],
		song = this.songs[this.currentSong];
	if(this.currentSong > 0){
		this.currentSong -= 1;
	}else{
		this.currentSong = this.songs.length - 1;
	};
	player.seek(0);
	this.play();
	console.log(this.currentSong);
}

var sweetJamzRadio = new Jukebox();
sweetJamzRadio.addSong(new Song('155182743','Butterfly - Crazy Town'), new Song('80640389','Butterfly - DMX feat. Crazy Town'), new Song('226248515', 'Butterfly - Tupac feat. Crazy Town'), new Song("268015652","Crazy Town - Butterfly (Nigel Stately & Mad Morello)"), new Song("229643044","Crazy Town - Butterfly (Filibusta Remix)"), new Song("118666866","Butterfly - Crazy Town (VAN-G Remix)"), new Song("53684662","CRAZY TOWN BUTTERFLY(COME MY LADY) DJKONVICT 512 REMIX000"), new Song("265861156","Crazy Town - Butterfly (Kalus Remix)"), new Song("247349190","Crazy Town - Butterfly (Obszöne Töne Edit)"), new Song("190632801",'RiFF RAFF -  "How To Be The Man"  & Crazy Town -  "Butterfly"(Borlini Mix)'));

document.addEventListener("DOMContentLoaded",function(){
  document.querySelector('.play').addEventListener('click',function(event){
    sweetJamzRadio.play();
  });
  document.querySelector('.pause').addEventListener('click',function(event){
    sweetJamzRadio.pause();
  });
  document.querySelector('.stop').addEventListener('click',function(event){
    sweetJamzRadio.stop();
  });
  document.querySelector('.forward').addEventListener('click',function(event){
  	console.log("I heard that");
    sweetJamzRadio.forward();
  });
  document.querySelector('.back').addEventListener('click',function(event){
  	console.log("I heard that");
    sweetJamzRadio.back();
	});
});
