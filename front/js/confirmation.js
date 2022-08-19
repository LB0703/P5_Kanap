// Order confirmation

// Getting orderId from URL
let url = new URL(window.location.href);
let orderId = url.searchParams.get("orderId");

      if(orderId !== '' && orderId !== null && orderId !== undefined) {
	      // Adding orderId to the page
            document.getElementById("orderId").textContent = orderId;
            console.log(orderId)
      }
      else {
	      // Adding error message
            document.querySelector('.confirmation p').textContent = "Aucune commande correspondante";
      };
