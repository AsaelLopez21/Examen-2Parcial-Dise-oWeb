<script setup>
//Obtener los gifs de la api
import { ref } from "vue";
import PostCard from "./components/GiftCard.vue";  

const gifs = ref([]);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const apiKey = "jKGjDCLIc0DawR2NTxGBtZzGgjnymaQ5";
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;


const getGifs = async () => {
  try {
    const resp = await fetch(url, options);
    const data = await resp.json();
    gifs.value = data.data; 
  } catch (error) {
    console.log("Error:", error);
  }
};

//Para moverse entre los gifs mostrados 6 por pantalla
const valor = 6;
const inicio = ref(0);
const fin = ref(6);

const nextGif = () => {
  if (fin.value < gifs.value.length) {
    inicio.value += valor;
    fin.value += valor;
    scrollToTop();
  }
};

const backGif = () => {
  if (inicio.value > 0) {
    inicio.value -= valor;
    fin.value -= valor;
    scrollToTop();
  }
};

//regresar arriba cuando hacemos next
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

getGifs();
</script>

<template>
  <!-- !Informacion a mostrar en card -->
  <h5 class="display-5 mt-4 ms-5" id="titulo">GIFs Populares</h5>

  <div class="row d-flex justify-content-center">
    <PostCard 
      v-for="gif in gifs.slice(inicio, fin)" 
      :key="gif.id" 
      :titulo="gif.title" 
      :imagen="gif.images.fixed_height.url" 
      class="col-4 d-flex"
    >

    </PostCard>
  </div>

  <!-- ?botontes back next  -->
  <div class="d-flex justify-content-center">
    <button 
      type="button" 
      class="btn btn-outline-secondary btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="backGif"
      :disabled="inicio <= 0">
      Back
    </button>

    <button 
      type="button" 
      class="btn btn-outline-info btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="nextGif" 
      :disabled="fin >= gifs.length">
      Next
    </button>
  </div>
</template>

<style scoped>
  #titulo {
    color: rgb(255, 255, 255);
  }

  .card {
    margin: 40px;
    width: 300px; 
    height: 300px; 
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #dee2e6;
    background-color: #d6d2c4;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
    border-color: #0fe2f1;
  }

  .card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover; /* cubrir area */
  }

  .card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;/*direccion elementos */
    justify-content: center;
  }

  .card-title {
    font-size: 1.25rem;
    color: rgb(255, 255, 255);
  }
</style>
