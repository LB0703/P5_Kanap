// Getting param url value
function getUrlParam(paramName ='') {
	let url = new URL(window.location.href);
	let value = url.searchParams.get(paramName);
	return value;
}

// Getting cart from LocalStorage
function getCart() {
	let cart = [];
	let cartLocalStorage = localStorage.getItem('cart');
	if(cartLocalStorage !== null) {
		cart = JSON.parse(cartLocalStorage);
	}
	return cart;
}

// Saving cart to LocalStorage
function saveCart(cart = []) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

// Finding product from cart
function findProductFromCart(productId = '', productColor = '') {
	let cart = getCart();
	const index = cart.findIndex(item => (productId === item.id && productColor === item.color));
	return index;
}

// Deleting product from cart
function deleteProductToCart(productId = '', productColor = '') {
	let cart = getCart();
	// Checking if product is already in the cart
	const index = findProductFromCart(productId, productColor);
	if(index !== -1) {
		cart.splice(index, 1);
		saveCart(cart);
	}
}

// Updating product from cart
function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {
	let cart = getCart();
	// Checking if product is already in the cart
	const index = findProductFromCart(productId, productColor);
	if(index !== -1) {
		cart[index].quantity = Number(quantity);
		saveCart(cart);
	}
}

// Adding product from cart
function addProductToCart(productId = '', productColor = '', quantity = 0) {
	// Getting cart from LocalStorage
	let cart = getCart();
	// Checking if product is already in the cart
	const index = findProductFromCart(productId, productColor);
	if(index === -1) {
		let cartItem = {
			id: productId,
			color: productColor,
			quantity: quantity
		};
		cart.push(cartItem);
	}
	else {
		cart[index].quantity = parseInt(cart[index].quantity) + parseInt(quantity);
	}
	saveCart(cart);
}