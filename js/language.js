//Language modal
const LanguageChange = document.querySelector(".modal_changeLang");
const CurrentLang = document.querySelector(".language");
const ArrowLang = document.querySelector(".arrow_down");
const OptionLanguage = document.querySelectorAll(".changeLang"); 
function modalOptions(){
    CurrentLang.addEventListener('click', ()=>{
        if(!LanguageChange.classList.contains("active")){
        LanguageChange.classList.add("active");
        ArrowLang.innerText="˄";
        }
        else{
        LanguageChange.classList.remove("active");
        ArrowLang.innerText="˅";
      }
      });
         OptionLanguage.forEach(li => {
         li.addEventListener('click', ()=>{
            const chosen = li.innerText.trim();
               const current = CurrentLang.innerText.replace("˅","").replace("˄", "").trim();

               CurrentLang.innerText = chosen + " ˅";
               li.innerText = current;

               LanguageChange.classList.remove("active");
            

         });
      });
   }
//Switching languages
 const translations = {
    Рус: {
        card: "Карты",
        dep: "Депозит",
        loans: "Кредиты",
        installment: "Рассрочка"
    },
    ENG: {
        card: "Cards",
        dep: "Deposit",
        loans: "Loans",
        installment: "Installments"
    }
 }
    let cur = "Рус";
 function changeLanguage(lang){
    cur = lang;
    document.getElementById("card").innerText = translations[cur].card;
    document.getElementById("dep").innerText = translations[cur].dep;
    document.getElementById("loans").innerText = translations[cur].loans;
    document.getElementById("installment").innerText = translations[cur].installment;
    CurrentLang.innerText = cur;
 }
 document.querySelectorAll(".changeLang").forEach((h) =>{
    h.addEventListener("click", () => {
        changeLanguage(h.innerText.trim());
        LanguageChange.classList.remove("active");
    });
 });
 modalOptions();
 changeLanguage(cur);
