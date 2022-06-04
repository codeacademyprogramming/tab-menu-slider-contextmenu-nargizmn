const buttons = Array.from(document.querySelectorAll('button'));
const tabs = Array.from(document.getElementsByClassName('tab'));


buttons.forEach((clickedButton) => {  
    clickedButton.addEventListener('click', (e) =>{
        buttons.forEach((button)=>{
            button.classList.remove('active');
        })
        e.target.classList.add('active');

        tabs.forEach((tab)=>{
            tab.classList.remove('show', 'active');
        })
        tabs[buttons.indexOf(e.target)].classList.add('show', 'active');
    });
});

