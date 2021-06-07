// const listItems = Array.from(document.querySelectorAll('.list-item'));
// const dropZones = Array.from(document.querySelectorAll('.drop-zone'));

// listItems.forEach((listItem) => {
//   listItem.addEventListener('dragstart', (e) => {
//     e.dataTransfer.setData('text', e.target.id);
//   });

//   listItem.addEventListener('dragend', () => {
//     console.log('drag is over');
//   });
// });

// dropZones.forEach(dropZone => {
//   // dropZone.addEventListener('dragover', () => {
//   //   console.log('they dragged over me')
//   // });

//   dropZone.addEventListener('dragenter', (e) => {
//     dropZone.style.backgroundColor = 'green';
//     e.preventDefault();
//   });

//   dropZone.addEventListener('dragover', (e) => {
//     e.preventDefault();
//   });

//   dropZone.addEventListener('dragleave', (e) => {
//     e.preventDefault();
//     dropZone.style.backgroundColor = 'initial';
//   });

//   dropZone.addEventListener('drop', (e) => {
//     dropZone.append(document.getElementById(e.dataTransfer.getData('text')));
//     dropZone.style.backgroundColor = 'initial';
//     e.preventDefault();
//   })
// })


const colorBoxes = Array.from(document.querySelectorAll('.color-box'));

function colorMaker(element, shouldChange = false) {
  const redTone = element.getAttribute('data-red');
  const greenTone = element.getAttribute('data-green');
  const blueTone = element.getAttribute('data-blue');

  if (shouldChange) {
    element.style.backgroundColor = `rgb(${redTone}, ${greenTone}, ${blueTone})`;
  }

  return {
    redTone,
    greenTone,
    blueTone
  };
}

colorBoxes.forEach(colorBox => {
  const rgbObject = colorMaker(colorBox, true);

  colorBox.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', JSON.stringify(rgbObject));
  });
});

const colorCircle = document.querySelector('.color-circle');
colorMaker(colorCircle, true);

['dragenter', 'dragover', 'drop'].forEach(event => {
  colorCircle.addEventListener(event, (e) => {
    e.preventDefault();
  });
});

colorCircle.addEventListener('drop', (e) => {
  const stringifiedRGBObject = e.dataTransfer.getData('text');
  const { redTone: fromRedTone, greenTone: fromGreenTone, blueTone: fromBlueTone } = JSON.parse(stringifiedRGBObject); // {redTone: "120", greenTone: "100", blueTone: "200"}
  const { redTone, greenTone, blueTone } = colorMaker(colorCircle);  // rgb(200,200, 200);

  const finalRed = Math.round((+fromRedTone + +redTone) / 2);
  const finalGreen = Math.round((Number(fromGreenTone) + Number(greenTone)) / 2);
  const finalBlue = Math.round((parseInt(fromBlueTone) + parseInt(blueTone)) / 2);

  colorCircle.setAttribute('data-red', finalRed);
  colorCircle.setAttribute('data-green', finalGreen);
  colorCircle.setAttribute('data-blue', finalBlue);

  const finalRGBString = `rgb(${finalRed}, ${finalGreen}, ${finalBlue})`;
  colorCircle.style.backgroundColor = finalRGBString;
});

