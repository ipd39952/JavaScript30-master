let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds){
	// clear any exisitng timers
	clearInterval(countdown);

	const now = Date.now();
	// 'now' is in milliseconds
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);


	countdown = setInterval(() => {
		// we run Date.now because the now varible is storing the old time and not the
		// the current one
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0){
			clearInterval(countdown);
			return;
		}
		// display the seconds left
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainerSeconds = seconds % 60;
	const display = `${minutes}:${remainerSeconds < 10 ? '0' : ''}${remainerSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
	// console.log({minutes, remainerSeconds});
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At: ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e) {
	e.preventDefault();
	// console.log(e);
	const mins = this.minutes.value;
	timer(mins * 60);
	// to clear the input field
	this.reset();
});
