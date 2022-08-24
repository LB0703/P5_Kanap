
// Recover dom elements
const productList = document.querySelector("#items");

// Getting products data from backend
fetch('http://localhost:3000/api/products')
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let products = value;
		console.log(products);
		for(const product of products) {

		// Adding the different elements in the DOM
		let productLink = document.createElement('a');
		productLink.setAttribute("href",`product.html?id=${product._id}`);
		productList.appendChild(productLink);

		let productArticle = document.createElement('article');
		productLink.appendChild(productArticle);

		let imgProduct = document.createElement('img');
		imgProduct.setAttribute("src", product.imageUrl);
		imgProduct.setAttribute("alt", product.altTxt);
		productArticle.appendChild(imgProduct);

		let h3Product = document.createElement('h3');
		h3Product.setAttribute("class","productName");
		h3Product.textContent = product.name;
		productArticle.appendChild(h3Product);

		let pProduct = document.createElement('p');
		pProduct.setAttribute("class", "productDescription")
		pProduct.textContent = product.description;
		productArticle.appendChild(pProduct);

		}
	})
	.catch(function(err) {
		console.log(err);
	});







