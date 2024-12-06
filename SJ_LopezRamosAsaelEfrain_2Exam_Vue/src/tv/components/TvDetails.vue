<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'; 
import axios from 'axios';

const tvShowDetails = ref(null);
const loading = ref(true); 

const route = useRoute();
const showId = route.params.id;

onMounted(() => {
  getTvShowDetails(showId);
});

// Obtenerdetalles del show
const getTvShowDetails = async (id) => {
  loading.value = true; // Mostrar loading
  try {
    const resp = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=90a80049eeae86e04ced1a9cc9c2d6a3&language=en-US`);
    const data = resp.data;

    tvShowDetails.value = {
      titulo: data.name,
      descripcion: data.overview,
      imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      actores: []
    };

    const actoresResp = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=90a80049eeae86e04ced1a9cc9c2d6a3&language=en-US`);
    const actores = actoresResp.data.cast.slice(0, 3).map(actor => actor.name).join(", ");
    tvShowDetails.value.actores = actores;

  } catch (error) {
    console.log('Error:', error);
  } finally {
    loading.value = false; 
  }
};
</script>

<template>
  <!-- Spinner de carga -->
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

  <!--!detalles del show -->
  <div v-else class="d-flex justify-content-center align-items-center">
    <div class="card">
      <img :src="tvShowDetails.imagen" :alt="`Imagen del show ${tvShowDetails.titulo}`" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ tvShowDetails.titulo }}</h5>
        <p class="card-text descripcion">{{ tvShowDetails.descripcion }}</p>
        <p class="card-text"><strong>Actores:</strong> {{ tvShowDetails.actores }}</p>
        <RouterLink 
          to="/tv" 
          class="btn btn-info text-white fw-bold py-2 px-4 rounded-pill mt-3 d-flex justify-content-center" 
          data-mdb-ripple-init 
          data-mdb-ripple-color="light"
          style="margin-bottom: auto;">
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
  object-fit: contain;
}

.card-body {
  padding: 10px;
  max-height: 360px;
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
