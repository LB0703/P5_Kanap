// Function to getting productId from url
function getUrlParam(paramName ='') {
	let url = new URL(window.location.href);
	let value = url.searchParams.get(paramName);
	return value;
}


// Function to get cart
function getCart() {
	let cart = [];
	let cartLocalStorage = localStorage.getItem('cart');
	if(cartLocalStorage !== null) {
		cart = JSON.parse(cartLocalStorage);
	}
	return cart;
}

// Function save cart
function saveCart(cart = []) {
	localStorage.setItem("cart", JSON.stringify(cart));
}


// Function find product from cart
function findProductFromCart() {
	let cart = getCart();

	for (let product of cart) {
		let cartItem = {	
			name: product.name,
			id: productId,
		color: colors.value,
		quantity: quantity.value
		};
		const index = cartFindIndex
		if(cart.findIndex (item => (cartItem.id === item.id && cartItem.color === item.color)));
		console.log(index);
	}
}

	



// Function delete product to cart
//function deleteProductToCart(productId='', productColor=''){
//	let cart = getCart();
	
	
	//if(cart = cart.findIndex(item => (cartItem.id === item.id && cartItem.color === item.color)))
				//saveCart();
	//		};
			





// Function update product quantity from cart

// Function add product to cart 
