<script setup>
import NoteItem from './components/Noteitem.vue'
import { ref, onMounted } from 'vue'
import axios from "axios"

const Backend_URL = 'https://webtech-backend-6ot9.onrender.com'

// Input-Felder
const name = ref('')
const price = ref('')

// Produkt-Liste
const notes = ref([])

// GET - Produkte laden
async function loadProducts() {
  try {
    const response = await axios.get(`${Backend_URL}/api/products`)
    notes.value = response.data
  } catch (error) {
    console.error("Fehler beim Laden:", error)
  }
}

// POST - neues Produkt speichern
async function saveNewProduct() {
  if (!name.value || !price.value) {
    alert("Bitte alle Felder ausfüllen!")
    return
  }

  const dataToSend = {
    name: name.value,
    price: Number(price.value)
  }

  try {
    const response = await axios.post(
        `${Backend_URL}/api/products`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
    )

    if (response.status === 201) {
      const savedProduct = response.data
      console.log("Produkt gespeichert:", savedProduct)

      // direkt anzeigen
      notes.value.push(savedProduct)

      // Felder leeren
      name.value = ''
      price.value = ''
    } else {
      console.error("Speicherfehler:", response.status)
    }

  } catch (error) {
    console.error("Netzwerk- oder CORS-Fehler:", error)
  }
}

// Beim Start laden
onMounted(() => {
  loadProducts()
})
</script>

<template>
  <header>
    <h1>Meine Produktliste</h1>
  </header>

  <main class="notes-content">

    <!-- Formular -->
    <div class="form">
      <input
          v-model="name"
          type="text"
          placeholder="Produktname"
      />

      <input
          v-model="price"
          type="number"
          placeholder="Preis"
      />

      <button @click="saveNewProduct">
        Speichern
      </button>
    </div>

    <hr>

    <!-- Liste -->
    <div
        v-for="note in notes"
        :key="note.id"
    >
      <NoteItem :note-data="note" />
    </div>

  </main>
</template>

<style scoped>
.form {
  max-width: 300px;
  margin-bottom: 30px;
}

input, button {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
</style>


