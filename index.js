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
    col.classList.add("col-md-4", "mb-2");

    // Creazione della card
    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow-sm", "h-100", "shadow-lg", "p-3", "rounded");
    col.appendChild(card);

    // Aggiunta dell'immagine
    const img = document.createElement("img");
    img.classList.add("bd-placeholder-img", "card-img-top", "altezza", "shadow-lg", "p-3", "rounded");
    img.src = product.imageUrl; // Imposta il percorso dell'immagine
    img.alt = product.name; // Imposta l'alt
    card.appendChild(img);

    // Creazione del body della card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
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
    dFlex.classList.add("d-flex", "mt-auto");
    cardBody.appendChild(dFlex);

    // Aggiunta del prezzo
    const price = document.createElement("p");
    price.classList.add("card-text", "fw-bold", "me-auto");
    price.innerHTML = product.price + "€";
    dFlex.appendChild(price);

    const divBtn = document.createElement("div");
    divBtn.classList.add("btn-group", "d-flex");
    dFlex.appendChild(divBtn);

    // Pulsante Modifica DA METTERE IN BACKOFFICE
    const button = document.createElement("a");
    button.innerHTML = `</span><a href="./details.html?appId=${product._id}">Dettagli</a>`;
    button.classList.add("btn", "btn-outline-secondary");
    divBtn.appendChild(button);

    button.addEventListener("click", () => {
      console.log("mod", product._id);
    });

    // Aggiungi la colonna alla riga
    row.appendChild(col);
  });
}
