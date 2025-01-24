const URL = "https://striveschool-api.herokuapp.com/api/product/";
const row = document.querySelector("#productsRow");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
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
      console.error("Errore nel recupero dei prodotti:", response.status);
    }
  })
  .then((products) => {
    console.log(products);
    loadProducts(products); // Carica i prodotti
  })
  .catch((error) => {
    console.error("Errore:", error);
    alert("C'è stato un problema nel caricamento dei prodotti. Riprova più tardi.");
  });

function loadProducts(products) {
  row.innerHTML = ""; // Pulisce la riga dei prodotti
  products.forEach((product) => {
    // Creazione della colonna
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    // Creazione della card
    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow-sm");
    col.appendChild(card);

    // Aggiunta dell'immagine
    const img = document.createElement("img");
    img.classList.add("bd-placeholder-img", "card-img-top");
    img.src = product.imageUrl; // Imposta il percorso dell'immagine
    img.alt = product.name; // Imposta l'alt
    card.appendChild(img);

    // Creazione del body della card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // Aggiunta del titolo
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerHTML = product.name;
    cardBody.appendChild(title);

    // Aggiunta della descrizione
    const descr = document.createElement("p");
    descr.classList.add("card-text");
    descr.innerHTML = product.description;
    cardBody.appendChild(descr);

    // Creazione dei pulsanti
    const dFlex = document.createElement("div");
    dFlex.classList.add("d-flex", "justify-content-between", "align-items-center");
    cardBody.appendChild(dFlex);

    const divBtn = document.createElement("div");
    divBtn.classList.add("btn-group");
    dFlex.appendChild(divBtn);

    // Pulsante Modifica
    const button = document.createElement("a");
    button.innerText = "Modifica";
    button.classList.add("btn", "btn-sm", "btn-outline-secondary");
    divBtn.appendChild(button);

    button.addEventListener("click", () => {
      console.log("Modifica", product._id);
    });

    // Pulsante Elimina DA METTERE IN BACKOFFICE
    const button2 = document.createElement("a");
    button2.innerText = "Elimina";
    button2.classList.add("btn", "btn-sm", "btn-outline-secondary");
    divBtn.appendChild(button2);

    button2.addEventListener("click", () => {
      console.log("Elimina", product._id);
    });

    // Aggiungi la colonna alla riga
    row.appendChild(col);
  });
}
