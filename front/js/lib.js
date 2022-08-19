

// Function to getting productId from url
function getUrlParam(paramName ='') {
	let url = new URL(window.location.href);
	let value = url.searchParams.get(paramName);
	return value;
}
getUrlParam();

// Function to get cart
function getCart() {
	let cart = [];
	let cartLocalStorage = localStorage.getItem('cart');
	if(cartLocalStorage !== null) {
		cart = JSON.parse(cartLocalStorage);
	}
	return cart;
}