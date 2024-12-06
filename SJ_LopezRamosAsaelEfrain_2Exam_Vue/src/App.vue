<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <!-- !Plantilla bootstrap para navbar -->
   <!-- ?https://mdbootstrap.com/snippets/standard/mdbootstrap/2949604?view=side -->
    
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto d-flex flex-row text-center mt-3 mt-lg-0">
        <!-- !router links para navegar -->
        <li class="nav-item mx-2">
          <RouterLink to="/" class="link nav-link">Home</RouterLink>
        </li>
        <li class="nav-item mx-2">
          <RouterLink to="/anime" class="link nav-link">Anime</RouterLink>
        </li>
        <li class="nav-item mx-2">
          <RouterLink to="/movie" class="link nav-link">Movies</RouterLink>
        </li>
        <li class="nav-item mx-2">
          <RouterLink to="/gifs" class="link nav-link">GIFS</RouterLink>
        </li>
        <li class="nav-item mx-2">
          <RouterLink to="/tv" class="link nav-link">TV Shows</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

  <!-- ?informacion que tiene el router que creamos -->
  <div class="container">
    <RouterView />
  </div>
</template>
<style scoped>
.menu {
  width: 300px;
  display: flex;
}

.link {
  color: #0fe2f1;
  text-decoration: none;
}

.link:hover {
  color: #ffffff; 
}
</style>
