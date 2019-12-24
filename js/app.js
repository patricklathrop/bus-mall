'use strict';
// initial code setup assisted by Michelle Ferreirae with in-class demo

console.log('js linked!');

var imageElements = document.getElementsByClassName('productImage');
var productIndex1 = 0;
var productIndex2 = 1;
var productIndex3 = 2;

// bus product constructor

var allProducts = [];

// this funtion adds new items to the end of an array with a unique 'trick' shared by Michelle during class - adds two  variables with number type equal to zero '0'//
function Product(name, extension = 'jpg', timesClicked = 0, imageViews = 0) {
  this.name = name;
  this.imageUrl = `image/${name}.${extension}`;
  this.timesClicked = timesClicked;
  this.imageViews = imageViews;
  allProducts.push(this);
}

// create our products from local storage (this code  is based off the in-class demo of GOATS/ Gina assisted in placement and logic/ Michelle assisted with the crescendo of code magic with 'slice') //
// stretch goal - add click event button to [localStorage.clear ()] //

var savedTesterString=localStorage.getItem('savedTester');
if (savedTesterString) {
  var arrayOfNotTester = JSON.parse(savedTesterString);
  for (var i = 0; i < arrayOfNotTester.length; i++) {new Product(arrayOfNotTester[i].name, arrayOfNotTester[i].imageUrl.slice(arrayOfNotTester[i].imageUrl.length-3), arrayOfNotTester[i].timesClicked, arrayOfNotTester[i].imageViews);
  }
} else {


  // actually create our products from scratch

  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb','gif');
  new Product('water-can');
  new Product('wine-glass');
}

var totalClicks = 0;
// create a function to store clicks

function imageWasClicked(event) {
  function checkDuplication(product) {
    if (product === productIndex1 || product === productIndex2 || product === productIndex3) {
      return false;
    }
    return true;
  }

  totalClicks++;
  console.log(totalClicks);
  if(event.srcElement.id === 'img1') {
    allProducts[productIndex1].timesClicked++;
  } else if (event.srcElement.id === 'img2') {
    allProducts[productIndex2].timesClicked++;
  } else if (event.srcElement.id === 'img3') {
    allProducts[productIndex3].timesClicked++;
  }

  allProducts[productIndex1].imageViews++;
  allProducts[productIndex2].imageViews++;
  allProducts[productIndex3].imageViews++;

  // pick 3 random products to display and compare to avoid repetitiveness
  var nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  while(!checkDuplication(nextProductIndex1)) {
    nextProductIndex1 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  while(!checkDuplication(nextProductIndex2) || (nextProductIndex2 === nextProductIndex1)) {
    nextProductIndex2 = Math.floor(Math.random() * allProducts.length);
  }
  var nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  while(!checkDuplication(nextProductIndex3) || (nextProductIndex3 === nextProductIndex2) || nextProductIndex3 === nextProductIndex1) {
    nextProductIndex3 = Math.floor(Math.random() * allProducts.length);
  }

  productIndex1 = nextProductIndex1;
  productIndex2 = nextProductIndex2;
  productIndex3 = nextProductIndex3;

  // display the products

  imageElements[0].src = allProducts[productIndex1].imageUrl;
  imageElements[1].src = allProducts[productIndex2].imageUrl;
  imageElements[2].src = allProducts[productIndex3].imageUrl;

  // totalClicks controls how many sets of pictures are selected //
  if(totalClicks >= 25) {

    localStorage.setItem('savedTester', JSON.stringify(allProducts));

    for (var i = 0; i < imageElements.length; i++) {
      imageElements[i].removeEventListener('click', imageWasClicked);
    }

    // calls makeChart function
    makeChart();
  }
}
// set up our images to call that function when there is a click
// what element, which event, what to do

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}

// // // // Fun with charts // // //
// this section sets up the charts
function makeChart(){

  var label = [], views = [], select = [];
  for (i in allProducts) {
    label.push(allProducts[i].name);
    views.push(allProducts[i].imageViews);
    select.push(allProducts[i].timesClicked);
  }

// chart design
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: '# of votes',
        data: select,
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1.0,
        barPercentage: 1.0
      }, {
        label: '# of views',
        data: views,
        backgroundColor: 'blue',
        borderColor: 'red',
        borderWidth: 1.0,
        borderPercentage: 1.0
      }]
    },

    option: {
      scales: {
        xAxis: [{ stacked: true }],
        yAxis: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
