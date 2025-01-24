const params = new URLSearchParams(window.location.search);
const productId = params.get("appId");
const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
console.log(params);
console.log("RESOURCE ID", productId);
fetch(URL + productId, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((product) => {
    const cardProduct = document.getElementById("productsRow");
    const col = document.createElement("div");
    col.classList.add("col");

    col.innerHTML = `
        <div class="card">
        <img
          src="${product.imageUrl}"
          class="card-img-top"
          alt="SmartPhone Image"
        />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Specifiche:</strong> ${product.description}</p>
          <p class="card-text"><strong>Prezzo:</strong> ${product.price}€</p>
          <button type="button" class="btn btn-primary btn-sm">Modifica</button>
          <button type="button" class="btn btn-danger btn-sm"">Elimina</button>
        </div>
      </div>
      
        `;
    cardProduct.appendChild(col);
  })
  .catch((err) => console.log(err));
/* Pulsante Elimina DA METTERE IN BACKOFFICE
const button2 = document.createElement("a");
button2.innerText = "Elimina";
button2.classList.add("btn", "btn-sm", "btn-outline-secondary");
divBtn.appendChild(button2);

button2.addEventListener("click", () => {
  console.log("Elimina", product._id);
});*/
