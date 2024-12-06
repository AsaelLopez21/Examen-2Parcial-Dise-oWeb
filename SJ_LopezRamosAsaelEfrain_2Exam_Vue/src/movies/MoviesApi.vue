<script setup>
import { ref } from "vue";
import PostCard from "./components/PostCard.vue";

const pelis = ref([]);
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGE4MDA0OWVlYWU4NmUwNGNlZDFhOWNjOWMyZDZhMyIsIm5iZiI6MTczMDY5MTMwNS43MTc2MjM3LCJzdWIiOiI2NzI4MWMxNWMwOTAxMDk1ODBmOWYwMTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eFAGBLGJ-8VgP6h8z4Qp_N2WoOVW1qOZ03AAr3Yft_Y",
  },
};

const getMovie = async () => {
  try {
    const resp = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options);

    const data = await resp.json();
    pelis.value = data.results; 
    for (const pelicula of pelis.value) { 
      const actoresResp = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}/credits?language=en-US`, options);
      const nombres = await actoresResp.json();
      const actores = nombres.cast.slice(0, 3).map(actor => actor.name).join(", ");
      pelicula.actores = actores; 
    }
  } catch (error) {
    console.log('Error:');
  }
};

const valor = 6;
const inicio = ref(0);
const fin = ref(6);

const nextMovie = () => {
  if (fin.value < pelis.value.length) {
    inicio.value += valor;
    fin.value += valor;
    scrollToTop(); 
  }
};

const backMovie = () => {
  if (inicio.value > 0) {
    inicio.value -= valor;
    fin.value -= valor;
    scrollToTop(); 
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

getMovie();
</script>

<template>
  <h5 class="display-5 mt-4 ms-5" id="titulo">Peliculas Populares</h5>

  <div class="row d-flex justify-content-center">
    <PostCard 
      v-for="p in pelis.slice(inicio, fin)" 
      :key="p.id" 
      :titulo="p.title" 
      :imagen="`https://image.tmdb.org/t/p/w500${p.poster_path}`" 
      class="col-4 d-flex"
    >
    <RouterLink 
        :to="`/movie/${p.id}`" 
        class="btn btn-info text-white fw-bold py-2 px-4 rounded-pill mt-3" 
        data-mdb-ripple-init 
        data-mdb-ripple-color="light">
        Ver Detalles
    </RouterLink>
    </PostCard>
  </div>
  <div class="d-flex justify-content-center">

    <button type="button" class="btn btn-outline-secondary btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="backMovie"
      :disabled="inicio <= 0">
      Back
    </button>

    <button type="button" class="btn btn-outline-info btn-lg me-3 mb-4 mt-3" 
      data-mdb-ripple-init 
      data-mdb-ripple-color="dark"
      @click="nextMovie" 
      :disabled="fin >= pelis.length">
      Next
    </button>
  </div>

</template>

<style scoped>
  #titulo{
    color:rgb(255, 255, 255);
  }
</style>
