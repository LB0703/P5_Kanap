// Getting productId from url
let productId = getUrlParam('id');

// Getting specific product data from backend
fetch(`http://localhost:3000/api/products/${productId}`)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let product = value;

		// Recover api elements
		const imgContainer = document.querySelector(".item__img");
		imgContainer.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;

		const title = document.getElementById("title");
		title.textContent = product.name;

		const price = document.getElementById("price");
		price.textContent = product.price;
	
		const description = document.getElementById("description");
		description.textContent = product.description;
	
		//create a loop for the choice of color
		const colorSelect = document.getElementById("colors")
		
		product.colors.forEach(function(color) {
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
			if(quantity.value == 0) {
				alert("Veuillez saisir une quantité supérieur à 0 et inférieur à 100");
				return false;
			}
			
			// Adding product to cart
			if(quantity.value >0 && quantity.value <= 100){ 
			addProductToCart(productId, colors.value, quantity.value);
			// Confirming customer
			if(confirm("Produit(s) ajouté(s) au panier, souhaitez-vous vous diriger vers le panier ?")) {
				window.location.href = "cart.html";
			}
			}else{
				alert("La quantité n'est pas valide, veuillez selectionner une quantité comprise entre 1 et 99")
			}
			
		});
	})
	.catch(function() {
		document.querySelector('.item').textContent = "Produit introuvable";
	});
	