// Getting back the cart from localStorage
let cart = [];
let cartLocalStorage = localStorage.getItem('cart');
if(cartLocalStorage !== null) {
	cart = JSON.parse(cartLocalStorage);
}

// Getting the item that will contain the cart details
let globatPrice = document.getElementById("#totalPrice");
const productsOfCart = document.getElementById("cart__items");
productsOfCart.innerHTML = "";

let productsCount = 0;
let productsPriceTotal = 0;

// Browse the cart with a for of
for (let product of cart) {

	// For each product, getting product ID + selected color + filled quantity + name of product
	let productId = product.id;
	let colorOfProduct = product.color;
	let quantityOfProduct = product.quantity;
	let nameOfProduct = product.name;
  	let productPrice = product.price;

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
		let	productSettingsQuantity = document.createElement("div");
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
		productsCount = Number(productsCount) + Number(quantityOfProduct);
		document.getElementById('totalQuantity').textContent = productsCount;

		// Create div content settings delete
		let contentSettingsDelete = document.createElement("div");
		contentSettingsDelete.classList.add("cart__item__content__settings__delete");
		contentSettings.appendChild(contentSettingsDelete);

		// Create the deleteItem element
		let deleteItem = document.createElement("p");
		deleteItem.classList.add("deleteItem")
		deleteItem.textContent = "Supprimer";
		contentSettingsDelete.appendChild(deleteItem);

		// Create the price element
		let cartPrice = document.createElement("div");
		cartPrice.classList.add("cart__price");
		productArticle.appendChild(cartPrice);
    		productsPriceTotal += Number(product.price) * Number (quantityOfProduct);
		document.getElementById('totalPrice').textContent = productsPriceTotal;



		// Listening 'click' event on button "supprimer"
		deleteItem.addEventListener('click', function(event) {
			event.preventDefault();
			// Checking if product is already in the cart
			const index = cart.findIndex(item => (productId === item.id && colorOfProduct === item.color));
			if(index === -1) {
				// Nothing
			}
			else {
				cart.splice(index, 1);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
			alert("Votre article a été supprimé du panier");
			window.location.reload();
		});

		// Listening 'change' event on button "quantity"
		productQuantityInput.addEventListener('change', function(event) {
			event.preventDefault();
			// Checking if product is already in the cart
			const index = cart.findIndex(item => (productId === item.id && colorOfProduct === item.color));
			if(index === -1) {
				// Nothing
			}
			else {
				cart[index].quantity = Number(productQuantityInput.value);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
			alert("Votre quantité a été modifiée");
			window.location.reload();
		});
	});
}








