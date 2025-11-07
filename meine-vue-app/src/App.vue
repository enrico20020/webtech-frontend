<script setup>
import NoteItem from './components/Noteitem.vue';
import {ref} from 'vue';

const notes = ref([
  { id: 1, text: 'Tomaten' },
  { id: 2, text: 'Gurken' },
  { id: 3, text: 'Paprika' },
]);
</script>

<template>
  <header>
    <h1>Meine Vue Notizenliste</h1>
  </header>

  <main class="notes-content">
    <div
      v-for="note in notes":key="note.id" >
      <NoteItem :note-data="note" />
    </div>
  </main>
</template>

