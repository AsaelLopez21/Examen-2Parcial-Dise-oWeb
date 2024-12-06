<script setup>
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
  <div class="card">
    <img :src="imagen" :alt="`GIF: ${titulo}`" class="card-img-top" />
    <div class="card-body">
      <p>{{ titulo }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 50px;
  width: 600px;  /* Aumenta aún más el tamaño de la tarjeta */
  height: 600px; /* Aumenta la altura de la tarjeta */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 3px solid #dee2e6;  /* Borde base más fino */
  background-color: #d6d2c4;
  border-radius: 15px;  /* Bordes redondeados para darle un toque más elegante */
  transition: all 0.3s ease;  /* Transición suave en todos los cambios */
}

.card-img-top {
  width: 100%;
  height: 80%;  /* Mantiene la imagen grande pero ajustada a la tarjeta */
  object-fit: cover;
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #d6d2c4;
}

.card-title {
  font-size: 1.75rem;  /* Aumenta más el tamaño del título */
  margin-bottom: 10px;
  color: black;
}

.card:hover {
  border-color: #0fe2f1;  /* Cambia el color del borde al azul brillante */
  transform: scale(1.1);  /* Aumenta un poco más el tamaño de la tarjeta en hover */
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);  /* Agrega una sombra azul brillante */
}
</style>