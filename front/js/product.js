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
	product.colors.forEach((colors) => {
		document.createElement("option");
		let choiceColor = document.createElement("option");
		choiceColor.innerHTML = `${colors}`;
		choiceColor.value = `${colors}`;
		colorSelect.appendChild(choiceColor);
	});
	
	
	console.log(quantity);

	// Listening 'click' event on cart button
	const addToCartBtn = document.getElementById('addToCart');
	addToCartBtn.addEventListener('click', function(event) {
		event.preventDefault();
		
		const choiceQuantity = document.getElementById("quantity").value;
		quantity.textContent = product.quantity;

		if (choiceQuantity == 0){    
			alert("Veuillez ajouter un produit à votre panier");
			return false
		}if (choiceQuantity == 1)
		{
			alert("Votre produit a été ajouté à votre panier")
		}
		else  
		{
			alert("Vos produits ont été ajouté à votre panier")
			return false;
		}
		

		// Getting product ID + selected color + filled quantity
		
		let cartItem = {
			id: productId,
			color: colors.value,
			quantity: quantity.value
			
		};
		console.log(cartItem);
		//alert("produit ajouter");

		// Storing those data in LocalStorage
		let cart = JSON.parse(localStorage.getItem('cartItem')) ;
		
		// If the localStorage is empty
		if (cart === null || cart === 0 ){  
		cart = [];
		cart.push(cartItem);
		localStorage.setItem("cartItem", JSON.stringify(cart));
		console.log(cart)

	}
		cart.push(cartItem);
		localStorage.setItem('cart', cart);
		
	});

	


})

.catch(function(err) {
	console.log(err);
});














	





