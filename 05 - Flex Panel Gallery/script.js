const panels = document.querySelectorAll('.panel');
function toggleOpen(){
	this.classList.toggle("open");
}

function toggleActive(event){
	if(event.propertyName.includes('flex')){
		this.classList.toggle('open-active');
	}
}

panels.forEach(item => item.addEventListener('click', toggleOpen));
panels.forEach(item => item.addEventListener('transitionend', toggleActive));