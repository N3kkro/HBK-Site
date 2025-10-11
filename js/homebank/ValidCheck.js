const TelInput = document.querySelector(".telInput");
const EmailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const invalidText = document.getElementById("InvalidAlert");
const submitBtn = document.getElementById("SubmitButton");
const Radio = document.querySelectorAll('input[name="color"]');
let validPass = false;

    submitBtn.addEventListener("click", ()=>{
        console.log("work");
    })
    submitBtn.addEventListener("click", (event)=>{
    event.preventDefault(); 
    
    const selectedRadio = document.querySelector('input[name="color"]:checked'); 
    if (!selectedRadio) {
        invalidText.style.display = "flex";
        invalidText.textContent = "Пожалуйста выберите метод авторизации!";
        return;
    }else{
        invalidText.style.display = "none";
    }

    if(selectedRadio.value === "loginWithEmail"){
    if(EmailInput.value.includes("@") && EmailInput.value !== ""){
        validPass = true;
        EmailInput.classList.remove("error");
        invalidText.style.display = "none";
        console.log("valid");
    }else{
        console.log("invalid");
        EmailInput.classList.add("error");
        invalidText.textContent = "Неверный почта или пароль";
        invalidText.style.display = "flex";
    }
}else if(selectedRadio.value === "loginWithNumber"){
    const phoneRegex = /^\+7\d{10}$/;    
    if(phoneRegex.test(TelInput.value)){
            validPass = true;
            invalidText.style.display = "none";
            TelInput.classList.remove("error");
        }else{
        console.log("invalid");
        invalidText.style.display = "flex";
        TelInput.classList.add("error");
        invalidText.textContent = "Неверный номер или пароль";
        }
    }
    if(passwordInput.value.length > 2){
        validPass = true;
        passwordInput.classList.remove("error");
    }else{
        passwordInput.classList.add("error");
    }
});

