      // Order confirmation

      // Recover order id from document URL
      let params = new URL (document.location).searchParams;
      document.getElementById("orderId").textContent = params.get("id");