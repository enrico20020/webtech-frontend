<script setup>
import {defineProps} from 'vue';
// definiert externe Schnittstelle und das ein Objekt benötigt wird
const props = defineProps({noteData: {type: Object, required: true}});
</script>

<template>
  // zeigt Wert der Eigenschaft text dieses Objekts an
 <div class="note-item" >
   <p>{{ noteData.text }}</p>
 </div>
</template>

