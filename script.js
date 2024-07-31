const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pausetBtn = document.querySelector('.pausetBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const workCountsDisplay = document.querySelector('.workCountsDisplay');


// making variables (global varibale)
const WORK_TIME = 30 * 60;
// const WORK_TIME = 1 * 60;
const BREAK_TIME = 5 *60;
let timerID = null;
let oneRoundCompleted = false;  //here one round mens one round = work time + break time
let totalCount = 0;
let paused = false; //making variable for resume button to checking pause btn clicked or not



// function to update tittle
const updateTitle = (msg) => {
}

//function to save workpausetimer count to local storage
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("workCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("workCounts", JSON.stringify(counts));
}


// function to countdown
const countDown = (time) => {
    return () => {
        const mins = Math.floor(time/60).toString().padStart(2, '0');
        // const mins = Math.floor(time/60);
        const secs = Math.floor(time % 60).toString().padStart(2, '0');
        // const secs = Math.floor(time % 60);
        // timer.textContent = time;
         timer.textContent = `${mins}:${secs}`;
         time--;
         if(time < 0) {
            stopTimer();
            if(!oneRoundCompleted) {
                timerID = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle("its break time!");
            }
            else{
                updateTitle("completed one round of workpause time!");
                setTimeout(() => updateTitle("start timer again"), 2000);
                totalCount++;
                saveLocalCounts();
                workCountsDisplay();
            }
            
         }
    }
    
}

// function to start timer
const startTimer = (startTime) => {
    if(timerID !== null){
        stopTimer();
    }
  return setInterval(countDown(startTime), 1000);
}


// function to stop timer
const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
}

//function to get time in seconds
const getTimeInSeconds = (timeString) => {
    const[minutes, seconds] = timeString.split(":");
    return parseInt(minutes *60) + parseInt(seconds);
}
// adding event listner to start button
startBtn.addEventListener('click',()=>{
      timerID = startTimer(WORK_TIME);
      updateTitle("its work time!!");
});
// adding event listner to reset button
resetBtn.addEventListener('click', () =>{
    stopTimer();
    timer.textContent = "30.00";
    })
// adding event listner to pause button
pausetBtn.addEventListener('click', () =>{
    stopTimer();
    paused = true;
    updateTitle("timer paused");
    })
// adding event listner to resume button
resumeBtn.addEventListener('click', () =>{
    if (paused){        //(paused = true) are same (paused)
       const currentTime = getTimeInSeconds(timer.textContent);
       timerID = startTimer(currentTime);
       paused = false;
       (!oneRoundCompleted) ? updateTitle("its work time") : updateTitle("its break time");
    }
       })


// function for workcounts and show work counts and work counts to screen from local stroage
const showWorkCounts = () =>{
    const counts = JSON.parse(localStorage.getItem("workCounts"));
    if(counts > 0){
        workCountsDisplay.style.display = "flex";
    }
    workCountsDisplay.firstElementChild.textContent = counts;
}
//  workCountsDisplay();
