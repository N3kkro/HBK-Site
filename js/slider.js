const slide = document.querySelectorAll(".slide");
const ArrowLeft = document.querySelector(".arrow.left");
const ArrowRight = document.querySelector(".arrow.right");
let countSlide = 0;
function activeSlide(index){
    slide.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    })
}
function SlidesMove(){
    ArrowLeft.addEventListener('click', () =>{
        countSlide = (countSlide - 1 + slide.length) % slide.length;
        activeSlide(countSlide);
    });
    ArrowRight.addEventListener('click', ()=>{
        countSlide = (countSlide + 1) % slide.length;
        activeSlide(countSlide);
    });
}
activeSlide(countSlide);
SlidesMove();
//future function if screen size more or lower that hundred percent then we just remove a picture from slider