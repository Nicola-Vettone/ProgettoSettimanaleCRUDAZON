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
    //Creo i singoli elementi di una card
    const cardProduct = document.getElementById("productsRow");

    const col = document.createElement("div");
    col.classList.add("col");

    const div = document.createElement("div");
    div.classList.add("card");

    col.appendChild(div);

    const img = document.createElement("img");
    img.classList.add("card-img-top");

    img.src = product.imageUrl;

    div.appendChild(img);

    const div2 = document.createElement("div");
    div2.classList.add("card-body");

    div.appendChild(div2);

    const name = document.createElement("h5");
    name.classList.add("card-title");
    name.innerHTML = product.name;

    div2.appendChild(name);

    const p1 = document.createElement("p");
    p1.classList.add("card-text");
    p1.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

    div2.appendChild(p1);

    const p2 = document.createElement("p");
    p2.classList.add("card-text");
    p2.innerHTML = `<strong>Specifiche:</strong> ${product.description}`;

    div2.appendChild(p2);

    const p3 = document.createElement("p");
    p3.classList.add("card-text");
    p3.innerHTML = `<strong>Prezzo:</strong> ${product.price}€`;

    div2.appendChild(p3);

    const mod = document.createElement("button");
    mod.classList.add("btn", "btn-primary", "btn-sm");
    mod.innerHTML = `<a href="./backoffice.html?appId=${productId}" class="text-white">Modifica</a>`;

    div2.appendChild(mod);

    const delete1 = document.createElement("button");
    delete1.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
    delete1.innerHTML = `<i class="bi bi-trash-fill"></i>`;
    //Evento che richiamare la funzione per DELETE
    delete1.addEventListener("click", () => {
      deleteProduct();
    });

    div2.appendChild(delete1);

    cardProduct.appendChild(col);
  })
  .catch((err) => console.log(err));
//Funzione per DELETE
const deleteProduct = () => {
  const hasConfirmed = confirm("Conferma per eliminare il prodotto");

  if (hasConfirmed) {
    fetch(URL + productId, {
      method: "DELETE",
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
      .then((deletedProd) => {
        alert("Hai eliminato " + deletedProd.name + " con id " + deletedProd._id);

        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
