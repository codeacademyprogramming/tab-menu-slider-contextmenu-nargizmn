const addButtons = Array.from(document.getElementsByClassName('add-button'));
const modal = document.querySelector('.modal');
const modalCloseButtons = Array.from(document.getElementsByClassName('modal-close-button'));
const overlay = document.getElementById('overlay');
const input = document.querySelector('.task-adding-input');
const modalSaveButton = document.querySelector('.modal-save-button')
const taskLists = Array.from(document.getElementsByClassName('task-list'));
const contextMenu = document.getElementById('context-menu');
const body = document.querySelector('body');
const deleteItem = document.getElementById('delete-item');
const archiveItem = document.getElementById('archive-item');
const restoreButton = document.querySelector('.restore-button');
const icon = document.querySelector('.chevron-icon');
const moveItemMenu = document.getElementById('move-item-menu');
const toDo = document.querySelector('.to-do-list');
const inProgress = document.querySelector('.in-progress-list');
const doneList = document.querySelector('.done-list');


addButtons.forEach((button) =>{
    button.addEventListener('click', (e) =>{
        modal.className = 'd-block w-100 position-fixed top-50 start-50 translate-middle';
        overlay.className = 'd-block position-fixed top-0 start-0 w-100 h-100'

        modalSaveButton.onclick = function () {
            const newTask = document.createElement('div');
            e.target.parentElement.append(newTask);
            newTask.innerText = input.value;
            newTask.style.cursor = 'pointer';
            newTask.id =`${input.value}`;
            input.value = '';
            newTask.className = 'border d-block m-2 p-2 rounded-3';
            newTask.setAttribute('draggable', 'true');
            modal.className = 'd-none';
            overlay.className = 'd-none';

            newTask.addEventListener('dragstart', (e) =>{
                e.dataTransfer.setData('text', e.target.id)
            });

            newTask.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                const { clientX: mouseX, clientY: mouseY } = e;
                contextMenu.style.top = `${mouseY}px`;
                contextMenu.style.left = `${mouseX}px`;

                contextMenu.classList.remove('d-none');

                deleteItem.onclick = function () {
                    e.target.remove();
                    contextMenu.classList.add('d-none');
                };

                archiveItem.onclick = function () {
                    e.target.classList.add('d-none');
                    contextMenu.classList.add('d-none');
                };

                icon.addEventListener('mouseover', (e) =>{
                    const { clientX: mouseX, clientY: mouseY } = e;
                    moveItemMenu.style.top = `${mouseY}px`;
                    moveItemMenu.style.left = `${mouseX}px`;
                    moveItemMenu.classList.remove('d-none');
                });

                restoreButton.addEventListener ('click', () => {
                    e.target.classList.remove('d-none');
                });

                toDo.onclick = function(){
                    taskLists[0].append(document.getElementById(e.target.id));
                };

                inProgress.onclick = function(){
                    taskLists[1].append(document.getElementById(e.target.id));
                };

                doneList.onclick = function(){
                    taskLists[2].append(document.getElementById(e.target.id));
                };

            });

        }

    })
});

input.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        modalSaveButton.click();
    }
})

modalCloseButtons.forEach((button) =>{
    button.addEventListener('click', (e) => {
        modal.className = 'd-none';
        overlay.className = 'd-none';
    })
});

taskLists.forEach((taskList) => {
    ['dragenter', 'dragover', 'drop'].forEach(event => {
        taskList.addEventListener(event, (e) => {
          e.preventDefault();
        });
    });

    taskList.addEventListener('drop', (e) => {
        taskList.append(document.getElementById(e.dataTransfer.getData('text')));
    })
});

body.addEventListener('click', (e) => {
    if (e.target.offsetParent != contextMenu){
        contextMenu.classList.add('d-none');
    };

    if (e.target.offsetParent != icon){
        moveItemMenu.classList.add('d-none');
    };
});








