//Kernstück, verwaltet die Produkte, Formular zum Speichern, API-Aufrufe
<script setup>
import NoteItem from './components/Noteitem.vue'
import { ref, onMounted } from 'vue'
import axios from "axios"

const Backend_URL = 'https://webtech-backend-6ot9.onrender.com'

// --- State / Reaktive Variablen ---
const name = ref('')
const price = ref('')
const searchQuery = ref("")
const maxPriceFilter = ref("")
const notes = ref([])
const editingId = ref(null) // Speichert die ID, wenn wir gerade ein Produkt bearbeiten

// --- Funktionen ---

// GET - Alle Produkte laden (oder Reset)
async function loadProducts() {
  try {
    const response = await axios.get(`${Backend_URL}/api/products`)
    notes.value = response.data
    // Such- und Filterfelder beim Reset leeren
    searchQuery.value = ''
    maxPriceFilter.value = ''
  } catch (error) {
    console.error("Fehler beim Laden:", error)
  }
}

// POST oder PUT - Produkt speichern (Erstellen oder Aktualisieren)
async function saveProduct() {
  if (!name.value || !price.value) {
    alert("Bitte alle Felder ausfüllen!")
    return
  }

  const dataToSend = {
    name: name.value,
    price: Number(price.value)
  }

  try {
    if (editingId.value) {
      // USE-CASE 5: Update (PUT)
      await axios.put(`${Backend_URL}/api/products/${editingId.value}`, dataToSend)
      editingId.value = null
    } else {
      // USE-CASE 1: Neu anlegen (POST)
      await axios.post(`${Backend_URL}/api/products`, dataToSend)
    }

    // Felder leeren und Liste aktualisieren
    name.value = ''
    price.value = ''
    loadProducts()
  } catch (error) {
    console.error("Fehler beim Speichern:", error)
    alert("Speichern fehlgeschlagen. Prüfen Sie die Konsole.")
  }
}

// USE-CASE 4: Löschen (DELETE)
async function deleteProduct(id) {
  if (!confirm("Möchten Sie dieses Produkt wirklich löschen?")) return
  try {
    await axios.delete(`${Backend_URL}/api/products/${id}`)
    notes.value = notes.value.filter(n => n.id !== id)
  } catch (error) {
    console.error("Löschfehler:", error)
  }
}

// Hilfsfunktion: Startet den Bearbeitungsmodus
function startEdit(product) {
  editingId.value = product.id
  name.value = product.name
  price.value = product.price
  // Scrollt nach oben zum Formular
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// USE-CASE 6: Suchen (GET mit Query-Parameter)
async function search() {
  if (!searchQuery.value) {
    loadProducts()
    return
  }
  try {
    const response = await axios.get(`${Backend_URL}/api/products/search?name=${searchQuery.value}`)
    notes.value = response.data
  } catch (error) {
    console.error("Suchfehler:", error)
  }
}

// USE-CASE 7: Filtern nach Preis (GET mit Query-Parameter)
async function filter() {
  if (!maxPriceFilter.value) return
  try {
    const response = await axios.get(`${Backend_URL}/api/products/filter?maxPrice=${maxPriceFilter.value}`)
    notes.value = response.data
  } catch (error) {
    console.error("Filterfehler:", error)
  }
}

// Lifecycle Hook: Beim Starten der Seite Daten laden
onMounted(() => {
  loadProducts()
})
</script>

<template>
  <header>
    <h1>Shop Manager</h1>
  </header>

  <main>
    <div class="section">
      <h3>{{ editingId ? 'Produkt bearbeiten' : 'Neues Produkt' }}</h3>
      <input v-model="name" placeholder="Name" />
      <input v-model="price" type="number" placeholder="Preis" />
      <button @click="saveProduct">{{ editingId ? 'Update' : 'Speichern' }}</button>
      <button v-if="editingId" @click="editingId = null; name=''; price=''">Abbrechen</button>
    </div>

    <hr>

    <div class="section">
      <input v-model="searchQuery" placeholder="Suchen..." @input="search" />
      <input v-model="maxPriceFilter" type="number" placeholder="Max €" />
      <button @click="filter">Filtern</button>
      <button @click="loadProducts">Alle zeigen</button>
    </div>

    <hr>

    <div class="product-grid">
      <div v-for="note in notes" :key="note.id" class="item-card">
        <NoteItem :note-data="note" @delete="deleteProduct" />
        <div class="button-group">
          <button class="edit-btn" @click="startEdit(note)">Bearbeiten</button>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
/* Grundlayout */
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

/* Sektions-Styling (Formulare & Suche) */
.section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.section h3 {
  width: 100%;
  margin-top: 0;
  color: #34495e;
}

/* Input & Button Styling */
input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  flex: 1;
  min-width: 150px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

button:hover {
  opacity: 0.9;
}

/* Farben für Buttons */
button { background-color: #3498db; color: white; } /* Blau für Speichern */
button:nth-of-type(2) { background-color: #95a5a6; } /* Grau für Reset/Abbrechen */

/* Produkt-Grid (Karten nebeneinander) */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.item-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.edit-btn {
  background-color: #f1c40f;
  color: #2c3e50;
  flex: 1;
}

/* Trennlinie */
hr {
  border: 0;
  height: 1px;
  background: #eee;
  margin: 30px 0;
}
</style>

