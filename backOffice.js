const params = new URLSearchParams(window.location.search);
const productId = params.get("appId");
const form = document.querySelector("#form");

const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
const inserisci = document.querySelector(".inserisci");
const modProduct = document.querySelector(".modifica");

window.addEventListener("DOMContentLoaded", () => {
  //Se è presente productId allora siamo in put
  if (productId) {
    inserisci.value = "Modifica";
    inserisci.classList.add("btn-success");
    h1.innerHTML = "Modifica i prodotto";

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero del prodotto");
        }
      })
      .then((product) => {
        console.log("Dati prodotto:", product);

        form.elements.name.value = product.name;
        form.elements.brand.value = product.brand;
        form.elements.description.value = product.description;
        form.elements.imageUrl.value = product.imageUrl;
        form.elements.price.value = product.price;
      })
      .catch((error) => console.error("Errore:", error));
  } else {
    inserisci.innerText = "Aggiungi prodotto";
    inserisci.classList.add("btn-primary");
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: form.elements.price.value,
  };

  console.log(newProduct);

  //Usiamo put o post
  const methods = productId ? "PUT" : "POST";
  const requestUrl = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";
  const hasConfirmed = confirm("Conferma per modificare il prodotto");
  const h1 = document.querySelector("#h1");

  if (hasConfirmed) {
    fetch(requestUrl, {
      method: methods,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel salvataggio del prodotto");
        }
      })
      .then((modifica) => {
        alert("Hai modificato " + modifica.name + " con id " + modifica._id);
        alert("Modifica del prodotto " + modifica.name + " avvenuta con successo");
        form.reset();
      })
      .catch((error) => console.error("Errore:", error));
  }
};
