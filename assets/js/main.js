const wrapper1 = document.querySelector('.wrapper-1');
const wrapper2 = document.querySelector('.wrapper-2');
const form = document.querySelector('.form');
const button = document.querySelector('button');

button.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('clicked me');
})

form.onclick = function () {
  console.log('form clicked');
}

document.body.onclick = function () {
  console.log('body clicked')
}

wrapper2.onclick = function () {
  console.log('wrapper2 clicked')
}


wrapper1.onclick = function () {
  console.log('wrapper1 clicked')
}

form.addEventListener('submit', (e) => {
  console.log('form successfully submitted');
  e.preventDefault();
});

