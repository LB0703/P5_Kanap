// Order confirmation
let orderId = getUrlParam('orderId');
if(orderId !== '' && orderId !== null && orderId !== undefined) {
	// Adding orderId to the page
	document.getElementById("orderId").textContent = orderId;
	saveCart([]);
}
else {
	// Adding error message
	document.querySelector('.confirmation p').textContent = "Aucune commande correspondante";
};

      