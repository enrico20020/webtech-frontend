// Child-Komponente, dafür zuständig einzelnes Produkt anzeigen
<script setup>
import {defineProps} from 'vue';
// definiert externe Schnittstelle und das ein Objekt benötigt wird
const props = defineProps({noteData: {type: Object, required: true}});
const emit = defineEmits(['delete']);
</script>

<template>
  // Use-Case 7: Detailansicht
  <div class="note-item">
    <h3>{{ noteData.name }}</h3>
    <p>Preis: {{ noteData.price }} €</p>
    // löschen
    <button class="delete-btn" @click="$emit('delete', noteData.id)">Löschen</button>
  </div>
</template>

<style scoped>
.note-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}
.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}
</style>