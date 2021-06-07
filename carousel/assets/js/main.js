const carouselItems = Array.from(document.getElementsByClassName('carousel-item'));
const buttons = Array.from(document.getElementsByClassName('button'));
const prevArrow = document.querySelector('.carousel-control-prev');
const nextArrow = document.querySelector('.carousel-control-next');
let current = 0;

buttons.forEach((clickedButton) => {
    clickedButton.addEventListener('click', (e)=>{
        reset(buttons);
        e.target.classList.add('active');

        reset(carouselItems);
        carouselItems[buttons.indexOf(e.target)].classList.add('active');
    });
});

prevArrow.addEventListener('click', (e) => {
    if(current === 0){
        current = carouselItems.length;
    }
    reset(carouselItems);
    reset(buttons);

    carouselItems[current-1].classList.add('active');
    buttons[current-1].classList.add('active');
    current--;
});

nextArrow.addEventListener('click', (e) => {
    if(current === carouselItems.length-1){
        current = -1;
    }
    reset(carouselItems);
    reset(buttons);

    carouselItems[current+1].classList.add('active');
    buttons[current+1].classList.add('active');
    current++;
});


function reset (array) {
    array.forEach((element)=>{
        element.classList.remove('active');
    });
};