const profileImageInput = document.getElementById('profile-image');
const imagesSection = document.querySelector('.images-section');
const fileUploadButton = document.querySelector('.file-browser-opener');
const dropArea = document.querySelector('.drop-area');

profileImageInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  console.log(e);
  files.forEach((file) => previewImage(file));
});

function previewImage(file) {
  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);

  fileReader.addEventListener('loadend', () => {
    const col4 = document.createElement('div');
    col4.className = 'col-4';

    const image = document.createElement('img');
    image.src = fileReader.result;
    image.className = 'uploaded-image';

    const button = document.createElement('button')
    button.className = 'btn btn-danger mt-2';
    button.innerText = 'Delete';
    button.addEventListener('click', () => {
      const result = confirm("Silmek istediyinizden eminsinizmi?");
      if (result) {
        col4.remove();
      }

    })

    col4.appendChild(image);
    col4.appendChild(button);
    imagesSection.appendChild(col4);
  })
}

fileUploadButton.onclick = function () {
  profileImageInput.click();
};

['dragover', 'dragend', 'dragleave', 'dragenter'].forEach((event) => {
  dropArea.addEventListener(event, (e) => {
    e.preventDefault();
  })
})

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);

  files.forEach((file) => previewImage(file));
});
