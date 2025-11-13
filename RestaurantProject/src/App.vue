<script setup>
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import Restaurant from "./components/Restaurant.vue";
import Registro from "./components/Registro.vue";
import Menu from "./components/Menu.vue";
import Clientes from "./components/Clientes.vue";
import Reportes from "./components/Reportes.vue";
import Inventario from "./components/Inventario.vue";
import Personal from "./components/Personal.vue";
import Pedidos from "./components/Pedidos.vue";
import Finanzas from "./components/Finanzas.vue";
import Caracteristicas from "./components/Caracteristicas.vue";

const currentView = ref("gestion");

const components = {
  gestion: Restaurant,
  registro: Registro,
  menu: Menu,
  clientes: Clientes,
  reportes: Reportes,
  inventario: Inventario,
  personal: Personal,
  pedidos: Pedidos,
  finanzas: Finanzas,
  caracteristicas: Caracteristicas,
};

const handleNavigate = (section) => {
  currentView.value = section;
};
</script>

<template>
  <NavBar @navigate="handleNavigate" />
  <component :is="components[currentView]" />
</template>

<style scoped></style>
