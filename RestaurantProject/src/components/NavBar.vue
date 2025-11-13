<template>
  <nav class="navbar">
    <div class="navbar-container">
      <button class="nav-btn" @click="navigateTo('gestion')">
        <i class="fas fa-utensils"></i> Gestión Mesas
      </button>
      <button class="nav-btn" @click="navigateTo('registro')">
        <i class="fas fa-clipboard-list"></i> Registro
      </button>
      <button class="nav-btn" @click="navigateTo('menu')">
        <i class="fas fa-book-open"></i> Menú
      </button>
      <button class="nav-btn" @click="navigateTo('clientes')">
        <i class="fas fa-users"></i> Clientes
      </button>
      <button class="nav-btn" @click="navigateTo('reportes')">
        <i class="fas fa-chart-bar"></i> Reportes
      </button>
      <button class="nav-btn" @click="navigateTo('inventario')">
        <i class="fas fa-boxes"></i> Inventario
      </button>
      <button class="nav-btn" @click="navigateTo('personal')">
        <i class="fas fa-user-tie"></i> Personal
      </button>
      <button class="nav-btn" @click="navigateTo('pedidos')">
        <i class="fas fa-shopping-cart"></i> Pedidos
      </button>
      <button class="nav-btn" @click="navigateTo('finanzas')">
        <i class="fas fa-dollar-sign"></i> Finanzas
      </button>
      <button class="nav-btn" @click="navigateTo('caracteristicas')">
        <i class="fas fa-cogs"></i> Características
      </button>
    </div>
  </nav>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["navigate"]);

const navigateTo = (section) => {
  emit("navigate", section);
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
}

.nav-btn i {
  font-size: 1rem;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

.nav-btn:focus {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    flex-wrap: wrap;
    padding: 0.5rem;
  }

  .nav-btn {
    flex: 1;
    min-width: 100px;
    margin: 0.25rem;
  }
}
</style>
