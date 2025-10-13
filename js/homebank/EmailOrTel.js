const radio = document.querySelectorAll('input[name="color"]');
const email = document.querySelector(".Email_label");
const Tel = document.querySelector(".Tel_label");
let telInput = document.querySelector(".telInput");
let emailInput = document.querySelector(".emailInput");
Tel.style.display = "none";
radio.forEach((r)=>{
    r.addEventListener("change", ()  =>{
        if(r.value === "loginWithNumber" && r.checked){
            Tel.style.display = "block";
            email.style.display = "none";
            telInput.style.display = "block";
            emailInput.style.display = "none";
            if(telInput.value === ""){
                telInput.value = "+7";
            }
            telInput.addEventListener("input", ()=> {
                if(!telInput.value.startsWith("+7")){
                    telInput.value = "+7";
                }
            });
        }else if(r.value == "loginWithEmail" && r.checked){
            Tel.style.display = "none";
            email.style.display = "block";
            telInput.style.display = "none";
            emailInput.style.display = "block";
        }
    })
})

//