window.addEventListener("keydown", function(e){
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if(audio){
		audio.currentTime = 0;
		audio.play();
		key.classList.add('playing');
	}
});

function removeTransition(e){
	if(e.propertyName !== "transform") return; // skip it if it"s not a transform
	console.log(e.propertyName);
	this.classList.remove("playing");
}
const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
