<script setup>
import NoteItem from './components/Noteitem.vue';
import {ref} from 'vue';
import axios from "axios";

const Backend_URL = 'https://webtech-backend-6ot9.onrender.com'

const notes = ref([
  { id: 1, text: 'Laptop' },
  { id: 2, text: 'Handy' },
  { id: 3, text: 'Macbook' },
]); // zu ref(null) ändern nach vorstellen 2


//POST-Route
async function saveNewProduct(name, price) {
  const url = `${Backend_URL}/api/products`;

const dataToSend = {
  name: name,
  price: price
};

try {
  const response = await axios.post(url, dataToSend, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.status === 201) {
    const savedProduct = response.data;
    console.log("Produkt gespeichert:", savedProduct);

    return savedProduct;

  } else {
    console.error("Speicherfehler:", response.status);
  }
} catch (error) {
  console.error("Netzwerk- oder CORS-Fehler:", error);
}
}

saveNewProduct('Maus', 40);


</script>

<template>
  <header>
    <h1>Meine Produktliste</h1>
  </header>

  <main class="notes-content">

    // Schleife, bei Wiederholung dem Alias Note zugewiesen (nötig für vue)
    <div
      v-for="note in notes":key="note.id" >
      // übergibt Notiz an Child Component
      <NoteItem :note-data="note" />


    </div>
  </main>
</template>

