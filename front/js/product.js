// Getting productId from url
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

const img = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const quantity = document.getElementById("quantity");


// Getting specific product data from backend
fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	let product = value;
	
	const imgContainer = document.querySelector(".item__img");
	imgContainer.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;

	const title = document.getElementById("title");
	title.textContent = product.name;

	const price = document.getElementById("price");
	price.textContent = product.price
	
	const description = document.getElementById("description");
	description.textContent = product.description
	
	//create a loop for the choice of color
	const colorSelect = document.getElementById("colors")
	product.colors.forEach((color) => {
		document.createElement("option");
		let choiceColor = document.createElement("option");
		choiceColor.innerHTML = `${color}`;
		choiceColor.value = `${color}`;
		colorSelect.appendChild(choiceColor);
	});
	
	//console.log(quantity);

	// Listening 'click' event on cart button
	const addToCartBtn = document.getElementById('addToCart');
	addToCartBtn.addEventListener('click', function(event) {
		event.preventDefault();
		// Testing customer inputs (quantity + color)
		if(document.getElementById("colors").value == '') {
			alert("Veuillez saisir une couleur");
			return false;
		}
		if(quantity.value == 0){
			alert("Veuillez saisir une quantité supérieur à 0");
			return false;
		}

		// Getting product ID + selected color + filled quantity
		let cartItem = {
			
			name: product.name,
			id: productId,
			color: colors.value,
			quantity: quantity.value
		};
		console.log(cartItem);
		//alert("produit ajouter");

		// Getting back the cart from localStorage
		let cart = [];
		let cartLocalStorage = localStorage.getItem('cart');
		if(cartLocalStorage !== null) {
			cart = JSON.parse(cartLocalStorage);
		}

		// Checking if product is already in the cart
		

		let isProductAlreadyInCart = false;
		cart.forEach((value, index) => {
			if(cartItem.id == value.id && cartItem.color == value.color) {
				isProductAlreadyInCart = true;
				console.log(index);
				// Il est déjà dans le panier
				value.quantity = parseInt(value.quantity) + parseInt(cartItem.quantity);
			}
		});
		
			if(isProductAlreadyInCart == true) {
			// Updating existing product quantity Mise à jour de la quantité de produit existante
			cartItem.id++;
			}
			else {
			// Pushing a new product in cart
			cart.push(cartItem);
			}

		// Storing those data in LocalStorage
		localStorage.setItem("cart", JSON.stringify(cart));
		console.log(cart);
		//Confirming customer
		alert("Produit(s) ajouté(s) au panier");
		//window.location.href = "cart.html"
	});
	
})
.catch(function(err) {
	console.log(err);
});









