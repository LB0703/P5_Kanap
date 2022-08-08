// Getting back the cart from localStorage
let cart = [];

function getCart() {
  let cartLocalStorage = localStorage.getItem('cart');
		if(cartLocalStorage !== null) {
			return JSON.parse(cartLocalStorage);
	}
}
;

// Getting the item that will contain the cart details
const productsOfCart = document.getElementById("cart__items");
  //!!!!declarer 2 variable globale quantite et globale price 
  
  
  let globalQuantity = document.getElementById("#totalQuantity");
  let globatPrice = document.getElementById("#totalPrice");
  
function createCartPage() {
     
  



  cart = getCart();
  productsOfCart.innerHTML = "";

  // Browse the cart with a for of
  for (let product of cart){

    // For each product, getting product ID + selected color + filled quantity + name of product
    let productId = product.id;
    let colorOfProduct = product.color;
    let quantityOfProduct = product.quantity;
    let nameOfProduct = product.name;
  
    // Sending an HTTP request to the API with fetch() to get product details
    fetch(`http://localhost:3000/api/products/${productId}`)
  
    .then ((response) => response.json()) //Returning the response in JSON format
  
    // Defining the API response as detailsOfProduct and defining the action to be performed for each product in the cart
    .then ((product) => {
  
    // Adding the different elements in the DOM
  
    let productArticle = document.createElement ("article");
    productArticle.classList.add("cart__item");
    productArticle.setAttribute("data-id", productId);
    productArticle.setAttribute("data-color", colorOfProduct)
    productsOfCart.appendChild(productArticle)
  
    // Creating the imgDiv element, adding the cart__item__img class, and setting the productArticle element as a child
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("cart__item__img");
    productArticle.appendChild(imgDiv);
  
    // Creating the productImg element
    let productImg = document.createElement("img")
    productImg.setAttribute("src", product.imageUrl);
    productImg.setAttribute("alt", product.altTxt);
    imgDiv.appendChild(productImg);
  
    // Creating the productContent element, adding the cart__item__content class, and setting the productArticle element as a child
    let productContent = document.createElement("div");
    productContent.classList.add("cart__item__content");
    productArticle.appendChild(productContent);
  
    // Creating the productDescription element, adding the cart__item__content__description class, and setting the productContent element as a child
    let productDescription = document.createElement("div");
    productDescription.classList.add("cart__item__content__description");
    productContent.appendChild(productDescription);
  
    // Creating the productName element, adding the h2 and inserting text content, and setting the productDescription element as a child
    let productName = document.createElement("h2");
    productName.textContent = product.name;
    productDescription.appendChild(productName);
  
    // Creating the productColor element, adding the <p> and inserting text content, and setting the productDescription element as a child
    let productColor = document.createElement("p");
    productColor.textContent = `${colorOfProduct}`;
    productDescription.appendChild(productColor);
  
    // Creating the productPrice element, adding the <p> and inserting text content, and setting the productDescription element as a child
    let productPrice = document.createElement("p");
    productPrice.textContent = `${product.price}€`;
    productDescription.appendChild(productPrice);
  
    // Creating the contentSettings element, adding the cart__item__content__settings class, and setting the productContent element as a child
    let contentSettings = document.createElement("div");
    contentSettings.classList.add("cart__item__content__settings");
    productContent.appendChild(contentSettings);
  
    // Creating the productSettingsQuantity element, adding the cart__item__content__settings__quantity class, and setting the contentSettings element as a child
    let  productSettingsQuantity = document.createElement("div");
    productSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    contentSettings.appendChild(productSettingsQuantity);
  
    // Creating the productQuantity element, adding the <p> and inserting text content, and setting the productSettingsQuantity element as a child
    let productQuantity = document.createElement("p");
    productQuantity.textContent = "Quantité : ";
    productSettingsQuantity.appendChild(productQuantity);
  
    // Creating the productQuantityInput, adding attributes, and setting the productSettingsQuantity element as a child
    let productQuantityInput = document.createElement("input");
    productQuantityInput.setAttribute("type","number");
    productQuantityInput.setAttribute("name", "itemQuantity");
    productQuantityInput.setAttribute("min", 1 );
    productQuantityInput.setAttribute("max", 100);
    productQuantityInput.setAttribute("value", `${quantityOfProduct}`);
    productQuantityInput.classList.add("itemQuantity");
    
    productSettingsQuantity.appendChild(productQuantityInput);
  

    // Create div content settings delete
    let contentSettingsDelete = document.createElement("div");
    contentSettingsDelete.classList.add("cart__item__content__settings__delete");
    contentSettings.appendChild(contentSettingsDelete);
  
    // Create the deleteItem element,
    let deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem")
    deleteItem.textContent = "Supprimer";
    contentSettingsDelete.appendChild(deleteItem);
  
    let cartPrice = document.createElement("div");
    cartPrice.classList.add("cart__price");
    productsOfCart.appendChild(cartPrice);

  
    // Listening 'click' event on  button "supprimer"
  
      deleteItem.addEventListener('click', function(event) {
        event.preventDefault();
        //let currentItem = event.target.closest("article").remove(); 
        let currentItemId = event.target.closest("article").dataset.id;
        let currentItemColor = event.target.closest("article").dataset.color;
        console.log(currentItemId, currentItemColor)
        const newCart = cart.filter(item => !(item.id == currentItemId && item.color == currentItemColor));
        localStorage.setItem("cart", JSON.stringify(newCart));
        alert ("Votre article a été supprimé du panier");
        createCartPage();
     // });


      globalQuantity.textContent = getGlobalQuantity();
      globalQuantity = 0;
      
      let initialQuantity = Number(productQuantityInput.value);
      productQuantityInput.addEventListener("change", () =>{
        
        quantityOfProduct = changedQuantity(product, Number(productQuantityInput.value));
        globatPrice = changedTotalPrice(product,  (productQuantityInput.value));
        initialQuantity = Number(productQuantityInput.value)
        globalQuantity.textContent = getGlobalQuantity;

        function getGlobalQuantity(product, quantity) {
          let cart = getCart();
          let globalQuantity = 0;
          for(let product of cart) {
            globalQuantity += product.quantity;
          }
          localStorage.setItem("cart", JSON.stringify(newCart));
        alert ("Votre article a été ajouté au panier");
        createCartPage();
          return globalQuantity;
        }
      });
        //function globalQuantity() {
     //globalQuantity = 0;
      //for (let product of cart){
      //  globalQuantity+= product.quantity
      //}
        
        //}
      
        //createCartPage();
})
   

 




  });
  }
};






createCartPage();


// Retrieves the elements of the dom
//let totalView = document.querySelector(".cart__price p");
//let totalQuantityOfProduct = document.getElementById("totalQuantity");
//let totalPrice = document.getElementById("totalPrice");











