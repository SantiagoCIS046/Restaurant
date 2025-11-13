<template>
  <nav class="navbar">
    <div class="navbar-container">
      <button class="nav-btn" @click="navigateTo('gestion')">
        Gestión Mesas
      </button>
      <button class="nav-btn" @click="navigateTo('registro')">Registro</button>
      <button class="nav-btn" @click="navigateTo('menu')">Menú</button>
      <button class="nav-btn" @click="navigateTo('clientes')">Clientes</button>
      <button class="nav-btn" @click="navigateTo('reportes')">Reportes</button>
    </div>
  </nav>
</template>

<script setup>
const navigateTo = (section) => {
  // Placeholder for navigation logic
  console.log(`Navigate to ${section}`);
  // You can emit events or use router here if needed
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
  padding: 0.75rem 1.5rem;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
