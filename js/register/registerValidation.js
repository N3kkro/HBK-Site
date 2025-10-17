//if the input is not valid then show error and don't run 
//number if doesn't startwith +7 and doesn't has twelve numbers then error
//if password is less than 2 letter then error
//if UserName empty then error ("Please enter a username") 
const UserNameInput = document.querySelector(".nameInput");
const RegisterSubmitBtn = document.getElementById("SubmitButton");
let RegisterAlertError = document.getElementById("InvalidAlert");
const RegisterTelInput = document.querySelector(".telInput");
const RegisterEmailInput = document.querySelector(".emailInput");
const RegisterPasswordInput = document.querySelector(".passwordInput");
RegisterSubmitBtn.addEventListener("click", async ()=>{
    const selectedRadio = document.querySelector('input[name="color"]:checked'); 
    if (!selectedRadio) {
        RegisterAlertError.style.display = "flex";
        RegisterAlertError.textContent = "Пожалуйста выберите метод регистрации!";
        return;
    }else{

    if(selectedRadio.value === "loginWithEmail"){ 
    if(UserNameInput.value === "" || !RegisterEmailInput.includes("@") || RegisterPasswordInput.value.length < 2){
        RegisterAlertError.textContent = "Please enter a username";
        UserNameInput.classList.add("error");
        RegisterEmailInput.classList.add("error");
        RegisterPasswordInput.classList.add("error");
    }else{
        UserNameInput.classList.remove("error");
        RegisterEmailInput.classList.remove("error");
        RegisterPasswordInput.classList.remove("error");
        const response = fetch("http://localhost:3000/registerWithEmail",{
            method: "POST",
            headers: {"Content/Type": "application/json"},
            body: JSON.stringify({
                "username": UserNameInput,
                "email": RegisterEmailInput,
                "password": RegisterPasswordInput
            }),
        }
    )
    const data = await responce.json();
    if(data.success){
        
        window.location.href = "HomeBank.html"
    }
    }
}
//Create a two endpoint registerWithEmail and withPhoneNum and make the phone number value
if(selectedRadio.value === "loginWithNumber"){
    //login
    const user = UserNameInput.value.trim();
    const phoneNum = RegisterTelInput.value.trim();
    const password = RegisterPasswordInput.value.trim();
    if(user === "" || phoneNum.length !== 12 || password.length < 2 ){
        RegisterAlertError.style.display = "flex";
        RegisterAlertError.textContent = "Неправильно введены данные";
        UserNameInput.classList.remove("error");
        RegisterTelInput.classList.remove("error");
        RegisterPasswordInput.classList.remove("error");
    if(user === ""){
        UserNameInput.classList.add("error");
    }
    if(phoneNum.length !== 12){
        RegisterTelInput.classList.add("error");
    }
    if(password.length < 2){
        RegisterPasswordInput.classList.add("error");
    }}
    else{
        RegisterAlertError.style.display = "none";
        UserNameInput.classList.remove("error");
        RegisterTelInput.classList.remove("error");
        RegisterPasswordInput.classList.remove("error");
        const response = fetch("http://localhost:3000/registerWithPhoneNumber",{
            method: "POST",
            headers: {"Content/Type": "application/json"},
            body: JSON.stringify({
                "username": UserNameInput,
                "phoneNumber": RegisterTelInput,
                "password": RegisterPasswordInput
            }),
        });
    }
}
}});//create two endpoint and create sending code function after register instead of sign in and don't forget about meeting in the evening