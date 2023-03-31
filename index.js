// CAROUSEL
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex-1].style.display = 'block';
}

var prev = document.getElementsByClassName("prev")[0];
var next = document.getElementsByClassName("next")[0];

prev.addEventListener('click', function () {
  showSlides(slideIndex -= 1);
});

next.addEventListener('click', function () {
  showSlides(slideIndex += 1);
});

// MODAL
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modal-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// PRODUCTS
var products = [];
var cart = [];

function listProducts() {
  var container = document.getElementById('products');

  products = productsJson.products;

  for (var i = 0; i < products.length; i++) {
    var product = '<div class="column">' +
        '<img src="' + products[i].image + '" style="width:100%">' +
        '<h2 class="product-title">' + products[i].name + '</h2>' +
        '<p class="product-price">₱' + products[i].price +
        '<button class="cart-btn" productId="' + products[i].id + '"><i class="fa-solid fa-cart-shopping fa-xl"></i></button></p>' +
      '</div>';

    container.innerHTML += product;
  };

  var cartBtns = document.getElementsByClassName('cart-btn');

  for (var i = 0; i < cartBtns.length; i ++) {
    cartBtns[i].addEventListener('click', function () {
      var productId = this.getAttribute('productId');

      var cartItem = cart.find(function(item, index) {
        if (item.id == productId) {
          return item;
        }
      });

      if (!cartItem) {
        var productItem = products.find(function(product, index) {
          if (product.id == productId) {
            return product;
          }
        });

        cart.push(productItem);

        var modalContent = document.getElementsByClassName('modal-content-ul')[0];
        modalContent.innerHTML += '<li>' + productItem.name + ' @ ₱' + productItem.price + '</li>';

        alert("Added to Cart");
      }

      else {
        alert("Item Already in Cart");
      }
    });
  }
}

listProducts();

var place = document.getElementById('place');

place.addEventListener('click', function () {

  if (cart.length > 0) {
    if (confirm("Place Order?") == true) {
      alert("Order Placed");
  
      cart = [];
  
      var modalContent = document.getElementsByClassName('modal-content-ul')[0];
      modalContent.innerHTML = '';
      modal.style.display = "none";
    }
  } 

  else {
    alert("Cart Empty");
  }
});

var clear = document.getElementById('clear');

clear.addEventListener('click', function () {
  if (cart.length > 0) {
    if (confirm("Delete Item(s) From Cart?") == true) {
      alert("Item(s) Deleted");

      cart = [];

      var modalContent = document.getElementsByClassName('modal-content-ul')[0];
      modalContent.innerHTML = '';
      modal.style.display = "none";
    }
  }

  else {
    alert("Cart Empty");
   }
});

import productsJson from './products.json' assert { type: 'json' };