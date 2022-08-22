

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
//function findProductFromCart(productId='', colorOfProduct='') {
	
//	const index = cart.findIndex(item => (productId === item.id && colorOfProduct === item.color));
//	if(index === -1) {
//		// Nothing
//	}
	
	

//	}