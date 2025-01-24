const URL = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.querySelector("#form");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWIxMWI3NDcwMTAwMTU4YjJhZjYiLCJpYXQiOjE3Mzc3MTAzNTQsImV4cCI6MTczODkxOTk1NH0.1-0K95oHDGWa6RVnpJ4nP28N6kTtpBIWvhEbd2etRIo";
fetch(URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
}).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    console.error("Errore nel recupero dei prodotti:", response.status);
  }
});
