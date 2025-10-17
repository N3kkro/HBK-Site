const languageBox = document.getElementById("options");
const currentLang = document.getElementById("CurrentLanguage");
const listOfLang = document.querySelectorAll(".ListOfLi li");
const arrowDown = document.querySelector(".ArrowDown");
//switch language at header
currentLang.addEventListener('click', ()=>{
    if(languageBox.style.display === "none"){
        languageBox.style.display = "flex";
        arrowDown.textContent = "˄";
    }else{
        languageBox.style.display = "none";
        arrowDown.textContent = "˅";
    }
    
});

listOfLang.forEach(li =>{
    li.addEventListener('click', () =>{
        const choosen = li.innerText.trim();
        const current = currentLang.textContent.replace("˅", "").replace("˄", "").trim();
        currentLang.textContent = choosen + " ";
        li.innerText = current;
        languageBox.style.display = "none";
        arrowDown.textContent = "˅";
    }) 
})