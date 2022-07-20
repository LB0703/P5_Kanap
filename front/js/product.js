

//récupérer l'id dans l'url
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

console.log(url)

//Fonction qui permet d'envoyer une requête au navigateur pour récupérer l'api d'un produit
const getProductById = async (id) => {
	let result = await fetch(`http://localhost:3000/api/product/${id}`);
	return await result.json();
      
}






//variable de l'id img
const imgId = document.querySelector(".item__img");

//variable de l'id title
const titleId = document.getElementById("#title");

//variable de l'id price
const priceID = document.getElementById("#price");

//variable de l'id description
const descriptionId = document.getElementById("#description");

//variable de l'id color
const colorsId = document.getElementById("#colors");

//variable de l'id quantity
const quantityID = document.getElementById("#quantity");







	





