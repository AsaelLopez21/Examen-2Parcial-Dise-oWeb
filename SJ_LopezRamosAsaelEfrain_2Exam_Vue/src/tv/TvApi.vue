<script setup>
import { ref } from "vue";
import PostCard from "./components/TvCard.vue";

const tvShows = ref([]);
const options = {
  method: 'GET',
  headers: { accept: 'application/json' },
};

fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=90a80049eeae86e04ced1a9cc9c2d6a3&language=en-US', options)
  .then(res => res.json())
  .then(res => {
    // muestra solo 20 peliculas 
    tvShows.value = res.results.slice(0,28);
    const shows = [];
    //informacion basica a mostrar
    for (const show of tvShows.value) {
      shows.push({
        id: show.id,
        title: show.name,
        description: show.overview,
        image: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
      });
    }
    tvShows.value = shows; 
  })
  .catch(err => console.error(err));

  //Botones y valores para desplazarse
const valor = 6;
const inicio = ref(0);
const fin = ref(6);

const nextShow = () => {
  if (fin.value < tvShows.value.length) {
    inicio.value += valor;
    fin.value += valor;
    scrollToTop(); 
  }
};

const backShow = () => {
  if (inicio.value > 0) {
    inicio.value -= valor;
    fin.value -= valor;
    scrollToTop(); 
  }
};
//REgresar arriba despues de seleccionar previo o next
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <!-- !informacion a mostrar en card -->
  <h5 class="display-5 mt-4 ms-5" id="titulo">TV Shows Populares</h5>

  <div class="row d-flex justify-content-center">
    <PostCard 
      v-for="show in tvShows.slice(inicio, fin)" 
      :key="show.id" 
      :titulo="show.title" 
      :imagen="show.image" 
      class="col-4 d-flex"
    >
    <!-- ? boton para ver los detalles del show -->
      <RouterLink 
          :to="`/tv/${show.id}`" 
          class="btn btn-info text-white fw-bold py-2 px-4 rounded-pill mt-3" 
          data-mdb-ripple-init 
          data-mdb-ripple-color="light">
          Ver Detalles
      </RouterLink>
    </PostCard>
  </div>

  <div class="d-flex justify-content-center">
    <!-- ?botones para moverse  -->
    <button type="button" class="btn btn-outline-secondary btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="backShow" 
      :disabled="inicio <= 0">
      Back
    </button>

    <button type="button" class="btn btn-outline-info btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="nextShow" 
      :disabled="fin >= tvShows.length">
      Next
    </button>
  </div>
</template>

<style scoped>
  #titulo {
    color: rgb(255, 255, 255);
  }
</style>
