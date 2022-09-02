// Getting back the cart from localStorage
let cart = getCart();

// Creating a condition that displays a message when the cart is empty
if(cart.length === 0) {
	document.querySelector('.cart').textContent = "Aucun produit";
	document.querySelector('.cart').style = "text-align:center";
}
else {
	// Getting the item that will contain the cart details
	let globatPrice = document.getElementById("#totalPrice");
	const productsOfCart = document.getElementById("cart__items");
	let productsCount = 0;
	let productsPriceTotal = 0;

	// Browse the cart with a for of
	for(let cartItem of cart) {

		// For each product, getting product ID + selected color + filled quantity
		// Sending an HTTP request to the API with fetch() to get product details
		fetch(`http://localhost:3000/api/products/${cartItem.id}`)
		// Returning the response in JSON format
		.then(function(res) {
			if(res.ok) {
				return res.json();
			}
		})
		// Defining the API response as detailsOfProduct and defining the action to be performed for each product in the cart
		.then(function(product) {

			// Adding the different elements in the DOM
			let productArticle = document.createElement ("article");
			productArticle.classList.add("cart__item");
			productArticle.setAttribute("data-id", cartItem.id);
			productArticle.setAttribute("data-color", cartItem.color)
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
			productColor.textContent = `${cartItem.color}`;
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
			productQuantityInput.setAttribute("value", `${cartItem.quantity}`);
			productQuantityInput.classList.add("itemQuantity");
			productSettingsQuantity.appendChild(productQuantityInput);

			///////// Add the products in total quantity///////////
			productsCount = Number(productsCount) + Number(cartItem.quantity);
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

			/////////// Add the prices in total price////////////////
			productsPriceTotal += Number(product.price) * Number (cartItem.quantity);
			document.getElementById('totalPrice').textContent = productsPriceTotal;

			// Listening 'click' event on button "supprimer"
			deleteItem.addEventListener('click', function(event) {
				event.preventDefault();
				deleteProductToCart(cartItem.id, cartItem.color);
				alert("Votre article a été supprimé du panier");
				window.location.reload();
			});

			// Listening 'change' event on button "quantity"
			productQuantityInput.addEventListener('change', function(event) {
				event.preventDefault();
				updateProductQuantityFromCart(cartItem.id, cartItem.color, productQuantityInput.value);
				alert("Votre quantité a été modifiée");
				window.location.reload();
			})
		});
	};

	// #################################################################################################### Form

	// ################################################## Validating form field
	function validateField(fieldId = '', regex) {
		let field = document.getElementById(fieldId);
		let match = regex.test(field.value);
		if(field.value === '' || match === true) {
			document.getElementById(`${fieldId}ErrorMsg`).textContent = "";
			return true;
		}
		else {
			document.getElementById(`${fieldId}ErrorMsg`).textContent = "Votre saisie n'est pas valide";
			return false;
		}
	}

	// ################################################## Regex
	
	const nameRegex = new RegExp("^[a-zA-Z ,.'àâäéèêëïîôöùûüç-]+$");					
	const addressRegex = new RegExp("^[0-9]{0,5}[a-zA-Z ,.'àâäéèêëïîôöùûüç-]+$");			
	const cityRegex = new RegExp("[a-zA-Z0-9 'àâäéèêëïîôöùûüç-]+$");				
	const emailRegex = new RegExp("[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+");

					
	// ################################################## Recover DOM elements
	let firstName = document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let address = document.getElementById("address");
	let city = document.getElementById("city");
	let email = document.getElementById("email");
	let orderBtn = document.getElementById("order");

	// ################################################## Adding event listeners
	firstName.addEventListener("change", function(event) {
		validateField('firstName', nameRegex);
	});

	lastName.addEventListener("change", function(event) {
		validateField('lastName', nameRegex);
	});

	address.addEventListener("change", function(event) {
		validateField('address', addressRegex);
	});

	city.addEventListener("change", function(event) {
		validateField('city', cityRegex);
	});

	email.addEventListener("change", function(event) {
		validateField('email', emailRegex);
	});

	// ################################################## Preparing order
	let productsId = [];
	for(let product of cart) {
		productsId.push(product.id);
	}
	// Listening 'change' event on button "Commander"
	const orderForm = document.querySelector('.cart__order__form');
	orderForm.addEventListener('submit', function(event) {
		event.preventDefault();
		// Creating the contact object + productsId
		const form = {
			contact : {
				firstName: firstName.value,
				lastName: lastName.value,
				address: address.value,
				city: city.value,
				email: email.value,
			},
			products: productsId,
		};
		if(validateForm() === true) {
			sendForm(form);
		}
		else {
			alert("Veuillez corriger les erreurs présentes dans le formulaire");
		}
	});

	// ################################################## Validating form
	function validateForm() {
		let valid = true;
		if(validateField('firstName', nameRegex) === false) valid = false;
		if(validateField('lastName', nameRegex) === false) valid = false;
		if(validateField('address', addressRegex) === false) valid = false;
		if(validateField('city', cityRegex) === false) valid = false;
		if(validateField('email', emailRegex) === false) valid = false;
		return valid;
	}

	// ################################################## Sending form
	function sendForm(form = {}) {
		// Sending an HTTP request to the API with fetch() with method POST
		fetch(`http://localhost:3000/api/products/order`, {
			method : "POST",
			headers : {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body : JSON.stringify(form),
		})
		// Returning the response in JSON format
		.then(function(res) {
			if(res.ok){
				return res.json()
			}
		})
		// Defining the API response as detailsOfProduct and defining the action to be performed for each product in the cart
		.then(function(response) {
			// Getting the orderId from the API
			let orderId = response.orderId;
			if(orderId) {
				document.location.href = `./confirmation.html?orderId=${response.orderId}`;
			}
			else{
				alert("Veuillez remplir le formulaire correctement");
			}
		})
		.catch(function()  {
			console.log("Veuillez réessayer une erreur est survenue");
		});
	}
}




	
	





