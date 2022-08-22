// Order confirmation

//getUrlParam(paramName = 'orderId');
let orderId = getUrlParam(paramName = 'orderId');
console.log(orderId);


// Getting orderId from URL
//let url = new URL(window.location.href);
//let orderId = url.searchParams.get("orderId");

      if(orderId !== '' && orderId !== null && orderId !== undefined) {
	      // Adding orderId to the page
            document.getElementById("orderId").textContent = orderId;
      }
      else {
	      // Adding error message
            document.querySelector('.confirmation p').textContent = "Aucune commande correspondante";
            
      };
      saveCart([]);
      //localStorage.setItem("cart", JSON.stringify([]));