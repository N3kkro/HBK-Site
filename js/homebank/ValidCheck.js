const TelInput = document.querySelector(".telInput");
const EmailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const invalidText = document.getElementById("InvalidAlert");
const submitBtn = document.getElementById("SubmitButton");
const Radio = document.querySelectorAll('input[name="color"]');
let validPass = false;
    submitBtn.addEventListener("click", async (event)=>{
    event.preventDefault(); 
    
    const selectedRadio = document.querySelector('input[name="color"]:checked'); 
    if (!selectedRadio) {
        invalidText.style.display = "flex";
        invalidText.textContent = "Пожалуйста выберите метод авторизации!";
        return;
    }else{
//NOTE: I have login with email and now create another api with numbers
    if(selectedRadio.value === "loginWithEmail"){
        try{
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": EmailInput.value,
                "password": passwordInput.value
            }),
        });
        const data = await response.json();
        console.log("Response", data);
    if(data.success){
        validPass = true;
        EmailInput.classList.remove("error");
        invalidText.style.display = "none";
        window.location.href = "CodeRecieve.html";
    }else{
        EmailInput.classList.add("error");
        invalidText.textContent = "Неверный почта или пароль";
        invalidText.style.display = "flex";
    }}catch(err){
        console.error("Error", err);
    }

}else if(selectedRadio.value === "loginWithNumber"){
    const phoneRegex = /^\+7\d{10}$/;    
    if(phoneRegex.test(TelInput.value) && passwordInput.value.length > 2){
          
        validPass = true;
        EmailInput.classList.remove("error");
        invalidText.style.display = "none";
        console.log("valid");
        window.location.href = "CodeRecieve.html";
        }else{
        console.log("invalid");
        invalidText.style.display = "flex";
        TelInput.classList.add("error");
        invalidText.textContent = "Неверный номер или пароль";
        }
    }
}});

