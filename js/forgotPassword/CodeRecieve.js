//go back
const back = document.querySelector(".goBack span");
back.addEventListener("click", ()=>{
    window.history.back();
})
//Timer
let time = 120;
const timer = document.querySelector(".timer");
const countDown = setInterval(()=>{
    time--;
    const minutes = Math.floor(time/60);
    const sec = time%60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if(time <= 0){
        clearInterval();
        timer.textContent = "00:00";
    }
},1000);