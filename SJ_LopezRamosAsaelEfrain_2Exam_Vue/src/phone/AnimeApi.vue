<script setup>
import { ref } from "vue";
import PostCard from "./components/AnimeCard.vue";

const animes = ref([]);

//solicitud para los animes actuales
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const getAnimes = async () => {
  try {
    const resp = await fetch("https://api.jikan.moe/v4/seasons/now?sfw", options);
    const data = await resp.json();
    animes.value = data.data; 
  } catch (error) {
    console.log("Error:", error);
  }
};

//Funciones y valores para desplazarse en el contenido
const valor = 6;
const inicio = ref(0);
const fin = ref(6);

const nextAnime = () => {
  if (fin.value < animes.value.length) {
    inicio.value += valor;
    fin.value += valor;
    scrollToTop();
  }
};

const backAnime = () => {
  if (inicio.value > 0) {
    inicio.value -= valor;
    fin.value -= valor;
    scrollToTop();
  }
};

//regresar arriba despues de moverse
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

getAnimes();  
</script>

<template>
  <!-- !Mostrar informacion basica del anime -->
  <h5 class="display-5 mt-4 ms-5" id="titulo">Animes de la Temporada Actual</h5>

  <div class="row d-flex justify-content-center">
    <PostCard 
      v-for="anime in animes.slice(inicio, fin)" 
      :key="anime.mal_id" 
      :titulo="anime.title" 
      :imagen="anime.images.jpg.image_url" 
      class="col-4 d-flex"
    >
    <!-- !router para ver informacion especifica de un anime -->
      <RouterLink 
        :to="`/anime/${anime.mal_id}`" 
        class="btn btn-info text-white fw-bold py-2 px-4 rounded-pill mt-3" 
        data-mdb-ripple-init 
        data-mdb-ripple-color="light">
        Ver Detalles
      </RouterLink>
    </PostCard>
  </div>

  <div class="d-flex justify-content-center">
    <!-- ?Botones para moverse -->
    <button 
      type="button" 
      class="btn btn-outline-secondary btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="backAnime"
      :disabled="inicio <= 0">
      Back
    </button>

    <button 
      type="button" 
      class="btn btn-outline-info btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="nextAnime" 
      :disabled="fin >= animes.length">
      Next
    </button>
  </div>
</template>

<style scoped>
  #titulo {
    color: rgb(255, 255, 255);
  }
</style>
