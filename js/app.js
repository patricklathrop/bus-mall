'use strict';

console.log('js linked!');

var imageElements = document.getElementsByClassName('productImage');
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;


// bus product constructor

var allProducts = [];

function Product(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allProducts.push(this);
}

// actually create our products

new Product('bag', 'image/bag.jpg');
new Product('banana', 'image/banana.jpg');
new Product('bathroom', 'image/bathroom.jpg');
new Product('boots', 'image/boots.jpg');
new Product('breakfast', 'image/breakfast.jpg');
new Product('bubblegum', 'image/bubblegum.jpg');
new Product('chair', 'image/chair.jpg');
new Product('cthulhu', 'image/cthulhu.jpg');
new Product('dog-stick', 'image/dog-duck.jpg');
new Product('dragon', 'image/dragon.jpg');
new Product('pen', 'image/pen.jpg');
new Product('pet-sweep', 'image/pet-sweep.jpg');
new Product('scissors', 'image/scissors.jpg');
new Product('shark', 'image/shark.jpg');
new Product('sweep', 'image/sweep.jpg');
new Product('tauntaun', 'image/tauntaun.jpg');
new Product('unicorn', 'image/unicorn.jpg');
new Product('usb', 'image/usb.gif');
new Product('water-can', 'image/water-can.jpg');
new Product('wine-glass', 'image/wine-glass.jpg');

var totalClicks = 0;
// create a function to store clicks
function imageWasClicked(event) {
  console.log('an image was clicked');
  totalClicks++;
  if(event.srcElement.id === '1') {
    allProducts[productIndex1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allProducts[productIndex2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allProducts[productIndex3].timesClicked++;
  }

  // pick 3 random products to display
  var nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  while((nextProductIndex1 === productIndex1) || (nextProductIndex1 === productIndex2)) {
    nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  while((nextProductIndex2 === productIndex1) || (nextProductIndex2 === productIndex2) || (nextProductIndex2 === nextProductIndex1)) {
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  while((nextProductIndex3 === productIndex1) || (nextProductIndex3 === productIndex3) || (nextProductIndex3 === nextProductIndex1)) {
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextProductIndex1;
  productIndex2 = nextProductIndex2;
  productIndex3 = nextProductIndex3;



  // display the goats
  imageElements[0].src = allProducts[productIndex1].imageUrl;
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  imageElements[2].src = allProducts[productIndex3].imageUrl;

  if(totalClicks >= 5) {
    // we made it to 5 clicks
    var footerEl = document.getElementsByTagName('footer')[0];
    // loop through all the goats and display how many times each one was picked
    footerEl.textContent = 'You picked things!';
  }
}

// set up our images to call that function when there is a click
// what element, which event, what to do

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}
