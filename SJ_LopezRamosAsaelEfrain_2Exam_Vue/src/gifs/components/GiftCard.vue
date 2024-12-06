<script setup>
//Informacion a mostrar en card
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


<template>
  <!-- !Obtener el gif y su nombre en la card -->
  <div class="card">
    <img :src="imagen" class="card-img-top" />
    <div class="card-body">
      <p>{{ titulo }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 50px;
  width: 600px;  
  height: 600px; 
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 3px solid #dee2e6; 
  background-color: #d6d2c4;
  border-radius: 15px;  
  transition: all 0.3s ease;  /* Transicion */
}

.card-img-top {
  width: 100%;
  height: 80%;  
  object-fit: cover;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column; /*direccion de las card */
  justify-content: space-between;
  background-color: #d6d2c4;
}

.card-title {
  font-size: 1.75rem; 
  margin-bottom: 10px;
  color: black;
}

.card:hover {
  border-color: #0fe2f1;  
  transform: scale(1.1);  /* Aumenta tamaño en hover */
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);  /* Asombra azul*/
}
</style>