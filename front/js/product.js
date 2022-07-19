//récupérer l'id dans l'url
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");



//variable de l'id img
const imgId = document.querySelector(".item__img");

//variable de l'id title
const titleId = document.querySelector("#title");

//variable de l'id price
const priceID = document.querySelector("#price");

//variable de l'id description
const descriptionId = document.querySelector("#description");

//variable de l'id color
const colorsId = document.querySelector("#colors");

//variable de l'id quantity
const quantityID = document.querySelector("#quantity");





//Fonction qui permet d'envoyer une requête au navigateur pour récupérer l'api d'un produit

fetch("http://localhost:3000/api/products/" + productId )
.then((res) => {
	if(res.ok) {
		return res.json();
	}
})
.then((product) => {
	//on injecte les données dans le html
      imgId.innerHTML = `<img scr="${product.imageUrl}" alt="${product.altTxt}"/>`
      titleId.innerHTML = `${product.name}`
      priceID.innerHTML = `${product.price}`
      descriptionId.innerHTML = `${product.description}`
      colorsId.innerHTML = `${product.name}`
      console.log(product.name)
})

//message d'erreur si la requête ne répond pas
.catch(function(err) {
	console.log('Une erreur est survenue');
	console.log(err);
});


