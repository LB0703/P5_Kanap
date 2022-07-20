


//Fonction qui permet d'envoyer une requête au navigateur pour récupérer l'api
fetch('http://localhost:3000/api/products')
.then(function(res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	let products = value;
 console.log(products);
 for (const product of products) {
  //console.log(product); //Afficher les produits
  //console.log(product.name); //Afficher le nom de chaque produit
  //console.log(product.colors[1]);//Afficher les couleurs de chaque produit
  //console.log(product["name"]);//Afficher le nom de chaque produit
  //console.log(product.description);//Afficher la description
  console.log(product.imageUrl);

document.getElementById("items").innerHTML += `<a href=./product.html?id=42"${product._id}">
 <article>
 <img scr="product.imageUrl"${product.imageUrl} alt=""${product.altTxt}/>
 <h3 class="productName">${product.name}</h3>
 <p class="productDescription">${product.description}</p>
</article>

</a>`;
}


})
//message d'erreur si la requête ne répond pas
.catch(function(err) {
	console.log('Une erreur est survenue');
	console.log(err);
});








