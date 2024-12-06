<script setup>
//Informacion basica a mostrar 
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  }
});
</script>

<template >
  <!-- !card para mostrar la informacion basica -->
  <div class="card">
    <img :src="imagen" :alt="`Poster de la película ${titulo}`" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title" >{{ titulo }}</h5>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 40px; 
  max-width: 350px; 
  max-height: 800px;
  display: flex;
  flex-direction: column; /* elementos en columna */
  overflow: hidden; 
  border: 1px solid #dee2e6; 
  background-color: #d6d2c4;
  border: 10px solid #e1e1e1; 
  transition: border-color 0.3s ease; /* Transicion borde*/ 
}

.card-img-top {
  height: 400px; 
  object-fit: cover; /* mantener proporciones */
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #d6d2c4; 

}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: black;
}


.card-text{
  color: black;
}

.card:hover {
  border-color: #0fe2f1; 
  transform: scale(1.05); /* Aumenta el tamaño de la tarjeta al hacer hover */
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);  /* Agrega sombra azul*/
}





</style>
