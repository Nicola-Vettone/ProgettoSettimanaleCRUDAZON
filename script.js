const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify(product),
}).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Errore nel recupero della pagina");
  }
});
