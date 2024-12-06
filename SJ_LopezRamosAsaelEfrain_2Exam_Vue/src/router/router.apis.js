import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../HomePage.vue';


const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/movie",
      name: "movie",
      component: () => import("../movies/MoviesApi.vue"),
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      component: () => import("../movies/components/MovieDetails.vue"),
    },
    {
      path: "/anime",
      name: "phone",
      component: () => import("../phone/AnimeApi.vue"),
    },
    ,
    {
      path: "/gifs",
      name: "post",
      component: () => import("../gifs/GifsApi.vue"),
    },
    {
      path: "/tv",
      name: "tv",
      component: () => import("../tv/TvApi.vue"),
    },
    {
      path: "/tv/:id",
      name: "tv-details",
      component: () => import("../tv/components/TvDetails.vue"),
    },
    {
      path: "/anime/:id",
      name: "anime",
      component: () => import("../phone/components/AnimeDetail.vue"),
    }
  ],
});

export default routes;