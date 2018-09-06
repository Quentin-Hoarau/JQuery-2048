
// gestion des musiques
var cnt_music = 1;
var music = new Audio("audio/music1.mp3");
music.play();
music.volume = 0.7;
console.log(music.volume);
music.onended = function(){
	cnt_music++;
	music.src = "audio/music"+cnt_music+".mp3";
	music.play();
	if(cnt_music == 3){
		cnt_music = 1;
	}
}
