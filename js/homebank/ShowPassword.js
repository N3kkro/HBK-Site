const eyeShow = document.querySelector(".eye");
const eyeHide = document.querySelector(".hideeye");
const password = document.querySelector(".passwordInput");
eyeHide.style.display = "none";
eyeShow.addEventListener("click", ()=>{
    password.type = "text";
    eyeHide.style.display = "flex";
    
    eyeShow.style.display = "none";
})
eyeHide.addEventListener('click', () => {
    password.type = "password";
    eyeHide.style.display = "none";
    
    eyeShow.style.display = "flex";
});