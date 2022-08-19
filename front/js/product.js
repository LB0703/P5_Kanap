// Getting productId from url
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
//let productId = getUrlParam(paramName = 'id');

// Recover api elements
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
		product.colors.forEach(function(color) {
			document.createElement("option");
			let choiceColor = document.createElement("option");
			choiceColor.innerHTML = `${color}`;
			choiceColor.value = `${color}`;
			colorSelect.appendChild(choiceColor);
		});
	
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

			// Getting back the cart from localStorage
			let cart = [];
				let cartLocalStorage = localStorage.getItem('cart');
				if(cartLocalStorage !== null) {
					cart = JSON.parse(cartLocalStorage);
				}
				// Checking if product is already in the cart
				const index = cart.findIndex(item => (cartItem.id === item.id && cartItem.color === item.color));
				if(index === -1) {
					cart.push(cartItem);
				}
				else {
					cart[index].quantity = parseInt(cart[index].quantity) + parseInt(cartItem.quantity);
				}
			// Storing those data in LocalStorage
			localStorage.setItem("cart", JSON.stringify(cart));
			console.log(cart);
			//Confirming customer
			alert("Produit(s) ajouté(s) au panier");
			window.location.href = "cart.html"
		});
	})
	.catch(function() {
		document.querySelector('.item').textContent = "Produit introuvable";
	});