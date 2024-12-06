<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'; 
import axios from 'axios';

const peliDetails = ref(null);
const loading = ref(true); //de carga

const route = useRoute();
const movieId = route.params.id; // Obtener el id deurl

onMounted(() => {
  getMovieDetails(movieId);
});

//btener los detalles
const getMovieDetails = async (id) => {
  loading.value = true; // cargar loading
  try {
    const resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGE4MDA0OWVlYWU4NmUwNGNlZDFhOWNjOWMyZDZhMyIsIm5iZiI6MTczMDY5MTMwNS43MTc2MjM3LCJzdWIiOiI2NzI4MWMxNWMwOTAxMDk1ODBmOWYwMTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eFAGBLGJ-8VgP6h8z4Qp_N2WoOVW1qOZ03AAr3Yft_Y"
      }
    });
    const data = resp.data;

    peliDetails.value = {
      titulo: data.title,
      descripcion: data.overview,
      imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      actores: []
    };

    // Obtener actores
    const actoresResp = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGE4MDA0OWVlYWU4NmUwNGNlZDFhOWNjOWMyZDZhMyIsIm5iZiI6MTczMDY5MTMwNS43MTc2MjM3LCJzdWIiOiI2NzI4MWMxNWMwOTAxMDk1ODBmOWYwMTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eFAGBLGJ-8VgP6h8z4Qp_N2WoOVW1qOZ03AAr3Yft_Y"
      }
    });
    const actores = actoresResp.data.cast.slice(0, 3).map(actor => actor.name).join(", ");
    peliDetails.value.actores = actores;

  } catch (error) {
    console.log('Error');
  } finally {
    loading.value = false; 
  }
};
</script>

<template>
  <!--!plantilla spineer-->
  <div v-if="loading">
    <div class="spinner-container">
      <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
        <circle cx="170" cy="170" r="160" stroke="#0fe2f1"/>
        <circle cx="170" cy="170" r="135" stroke="#404041"/>
        <circle cx="170" cy="170" r="110" stroke="#0fe2f1"/>
        <circle cx="170" cy="170" r="85" stroke="#404041"/>
      </svg>
    </div>
  </div>

  <!-- !card pelicula -->
<!-- !card pelicula -->
<div v-else class="d-flex justify-content-center align-items-center">
  <div class="card">
    <img :src="peliDetails.imagen" :alt="`Imagen de la película ${peliDetails.titulo}`" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ peliDetails.titulo }}</h5>
      <p class="card-text descripcion">{{ peliDetails.descripcion }}</p>
      <p class="card-text"><strong>Actores:</strong> {{ peliDetails.actores }}</p>
      <RouterLink 
        to="/movie" 
        class="btn btn-info text-white fw-bold py-2 px-4 rounded-pill mt-3 d-flex justify-content-center" 
        data-mdb-ripple-init 
        data-mdb-ripple-color="light"
        style="margin-bottom: auto;"
        >
        Back
      </RouterLink>

    </div>
  </div>
</div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ededed;
}

.card {
  margin: 20px;
  max-width: 500px;
  background-color: #f8f9fa;
  height: 630px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 300px;
  /*llenar contenedor */
  object-fit:contain;
}

.card-body {
  padding: 10px;
  max-height: 360px;
  /* evitar desbordamiento */
  overflow: hidden;
}

.card-title {
  font-size: 1.1rem;
  color: #000000;
}

.card-text {
  color: #000000;
}

.descripcion {
  font-size: 0.9rem;
  color: #000000;
}

.loader {
  max-width: 15rem;
  width: 100%;
  height: auto;
  stroke-linecap: round;
}

circle {
  fill: none;
  stroke-width: 3.5;
  animation-name: preloader;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-origin: 170px 170px;
}


</style>
