<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'; 
import axios from 'axios';

const animeDetails = ref(null);
const loading = ref(true); // de carga

const route = useRoute();
const animeId = route.params.id; // Obtener el id de la URL

onMounted(() => {
  getAnimeDetails(animeId);
});

// Obtener los detalles del anime
const getAnimeDetails = async (id) => {
  loading.value = true; // cargar loading
  try {
    const resp = await axios.get(`https://api.jikan.moe/v4/anime/${id}`, {
      headers: {
        accept: "application/json",
      }
    });
    const data = resp.data.data;
    //Informacion detallada a mostrar 
    animeDetails.value = {
      titulo: data.title,
      episodios: data.episodes,
      fechaAired: data.aired.string,
      sinopsis: data.synopsis,
      imagen: data.images.jpg.large_image_url,
    };
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

  <!-- Card del anime -->
  <div v-else class="d-flex justify-content-center align-items-center">
    <!-- ?informacion a mostrar del anime especifico -->
    <div class="card">
      <img :src="animeDetails.imagen" :alt="`Imagen del anime ${animeDetails.titulo}`" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ animeDetails.titulo }}</h5>
        <p class="card-text"><strong>Episodios:</strong> {{ animeDetails.episodios }}</p>
        <p class="card-text"><strong>Emisión:</strong> {{ animeDetails.fechaAired }}</p>
        <p class="card-text descripcion">{{ animeDetails.sinopsis }}</p>
        <!-- !Regresar a dondes estan los demas animes -->
        <RouterLink 
          to="/anime" 
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
/* estilo spinner */
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

/* Estilo spinner */
.loader {
  max-width: 15rem;
  width: 100%;
  height: auto;
  stroke-linecap: round;
}

/* Estilo spinner */
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
