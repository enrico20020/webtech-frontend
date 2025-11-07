<script setup>
import {defineProps} from 'vue';
const props = defineProps({noteData: {type: Object, required: true}});
</script>

<template>
 <div class="note-item" >
   <p>{{ noteData.text }}</p>
 </div>
</template>

