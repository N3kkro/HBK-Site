const searchBTN = document.querySelector(".Search_header img");
const SearchModal = document.querySelector(".Search_modal");
searchBTN.addEventListener("click", ()=>{
    SearchModal.classList.toggle("active");
});