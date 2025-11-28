<script setup lang="ts">
import {onMounted, ref, Ref} from 'vue'

import axios from 'axios'

type Hallo = { name: string; }

const hallos: Ref<Hallo[]> = ref([])
const nameField = ref('')
const affiliationField = ref('')
const heightField = ref()

function requestHallos () : void {
  axios
      .get <Hallo[]>('https://webtech-backend-6ot9.onrender.com/sayHello')
      .then((response) => (hallos.value = response.data))
      .catch((error) => console.log(error))
}



defineProps({
  msg: String,
})

const count = ref(0)

// Lifecycle Hook
onMounted(() => requestHallos())
</script>

<template>
  <h1>{{ hallos }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
