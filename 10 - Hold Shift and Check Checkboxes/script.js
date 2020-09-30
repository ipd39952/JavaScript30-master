const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
  //console.log(checkboxes);

  let lastChecked;

  function handleCheckbox(e){
    let inBetween = false; //flag
    //check if Shift is pressed and if the element selected is checked right now
    if(e.shiftKey && this.checked){
      checkboxes.forEach(checkbox => {
        //console.log(checkbox);
        if(checkbox === this || checkbox === lastChecked){
          inBetween = !inBetween;
          //console.log("All of these are in between!");
        }
        if(inBetween){
          checkbox.checked = true;
        }
      });
    }

    lastChecked = this;
  }

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheckbox));
