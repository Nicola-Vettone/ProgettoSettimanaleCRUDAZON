const URL = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("#form");

form.onsubmit = function (event) {
  // evito il refresh del browser
  event.preventDefault();
  // costruisco il dato a partire dai campi del form
  const newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: form.elements.price.value,
  };
  // controllo la corretta creazione del dato
  console.log(newProduct);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
  fetch(URL, {
    method: "POST",
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
        console.error("Errore nel recupero dei prodotti:", response.status);
      }
      form.reset();
    })
    .then((data) => {
      console.log("Risposta del server:", data);
      form.reset();
    })
    .catch((error) => console.error("Errore:", error)); // .catch correttamente qui
};
