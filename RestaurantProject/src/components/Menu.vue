<template>
  <div class="menu-container">
    <!-- Header del Restaurante -->
    <header class="restaurant-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="restaurant-name">Gourmet Palace</h1>
          <p class="restaurant-tagline">Experiencia culinaria excepcional</p>
        </div>
        <div class="contact-info">
          <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
          <p><i class="fas fa-clock"></i> Lun-Dom: 11:00 AM - 11:00 PM</p>
          <p><i class="fas fa-map-marker-alt"></i> Calle Gourmet 123, Ciudad</p>
        </div>
      </div>
    </header>

    <!-- Barra de Búsqueda -->
    <div class="search-bar">
      <div class="container">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Buscar en el menú..."
          />
        </div>
      </div>
    </div>

    <div class="container py-3">
      <h1>Menú del Restaurante</h1>
      <p>Descubre nuestros platos preparados con los mejores ingredientes.</p>

      <!-- Categorías del Menú -->
      <div
        v-for="categoria in categoriasFiltradas"
        :key="categoria.nombre"
        class="categoria-section mb-5"
      >
        <h2 class="categoria-title">
          <i :class="categoria.icono" class="categoria-icon"></i>
          {{ categoria.nombre }}
        </h2>
        <div class="row">
          <div
            v-for="item in categoria.items"
            :key="item.nombre"
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <div class="card menu-item">
              <div class="card-image-wrapper">
                <img
                  :src="item.imagen"
                  :alt="item.nombre"
                  class="card-img-top"
                />
                <div class="card-overlay">
                  <button
                    class="btn btn-quick-add"
                    @click="agregarAlCarrito(item)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.nombre }}</h5>
                <p class="card-text">{{ item.descripcion }}</p>
                <div class="card-footer-custom">
                  <span class="precio">${{ item.precio }}</span>
                  <button
                    class="btn btn-primary"
                    @click="agregarAlCarrito(item)"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="menu-footer">
      <div class="container">
        <p>&copy; 2024 Gourmet Palace. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Búsqueda reactiva
const searchQuery = ref("");

// Datos reactivos para el menú (ordenados por precio ascendente)
const categorias = ref([
  {
    nombre: "Entradas",
    icono: "fas fa-leaf",
    items: [
      {
        nombre: "Sopa de Tomate",
        descripcion: "Sopa cremosa de tomate con albahaca fresca.",
        precio: 8.99,
        imagen: "https://via.placeholder.com/300x200?text=Sopa+de+Tomate",
      },
      {
        nombre: "Bruschetta",
        descripcion: "Pan tostado con tomate, albahaca y aceite de oliva.",
        precio: 9.99,
        imagen: "https://via.placeholder.com/300x200?text=Bruschetta",
      },
      {
        nombre: "Paté de Hígado",
        descripcion: "Paté casero con tostadas y cebolla caramelizada.",
        precio: 11.99,
        imagen: "https://via.placeholder.com/300x200?text=Pate+Higado",
      },
      {
        nombre: "Ensalada César",
        descripcion:
          "Lechuga romana, crutones, queso parmesano y aderezo César.",
        precio: 12.99,
        imagen: "https://via.placeholder.com/300x200?text=Ensalada+Cesar",
      },
      {
        nombre: "Carpaccio de Salmón",
        descripcion: "Salmón fresco con aceite de oliva y limón.",
        precio: 15.99,
        imagen: "https://via.placeholder.com/300x200?text=Carpaccio+Salmón",
      },
    ].sort((a, b) => a.precio - b.precio),
  },
  {
    nombre: "Platos Principales",
    icono: "fas fa-utensils",
    items: [
      {
        nombre: "Pollo con Verduras",
        descripcion: "Pollo asado con verduras de temporada.",
        precio: 17.99,
        imagen: "https://via.placeholder.com/300x200?text=Pollo+Verduras",
      },
      {
        nombre: "Pasta Alfredo",
        descripcion: "Pasta con salsa Alfredo y pollo.",
        precio: 18.99,
        imagen: "https://via.placeholder.com/300x200?text=Pasta+Alfredo",
      },
      {
        nombre: "Risotto de Champiñones",
        descripcion: "Arroz cremoso con champiñones y parmesano.",
        precio: 19.99,
        imagen: "https://via.placeholder.com/300x200?text=Risotto+Champiñones",
      },
      {
        nombre: "Salmón a la Parrilla",
        descripcion: "Salmón fresco con hierbas y limón.",
        precio: 22.99,
        imagen: "https://via.placeholder.com/300x200?text=Salmon+Parrilla",
      },
      {
        nombre: "Filete de Res",
        descripcion: "Filete de res a la parrilla con verduras asadas.",
        precio: 25.99,
        imagen: "https://via.placeholder.com/300x200?text=Filete+de+Res",
      },
    ].sort((a, b) => a.precio - b.precio),
  },
  {
    nombre: "Especialidades del Chef",
    icono: "fas fa-star",
    items: [
      {
        nombre: "Foie Gras Maison",
        descripcion: "Foie gras casero con compota de higos.",
        precio: 32.99,
        imagen: "https://via.placeholder.com/300x200?text=Foie+Gras",
      },
      {
        nombre: "Trufa Negra Risotto",
        descripcion: "Risotto con trufa negra fresca y parmesano.",
        precio: 35.99,
        imagen: "https://via.placeholder.com/300x200?text=Trufa+Risotto",
      },
      {
        nombre: "Langosta Termidor",
        descripcion: "Langosta fresca con salsa de crema y brandy.",
        precio: 38.99,
        imagen: "https://via.placeholder.com/300x200?text=Langosta+Termidor",
      },
      {
        nombre: "Wagyu Premium",
        descripcion:
          "Carne Wagyu cocinada a baja temperatura con reducción de vino tinto.",
        precio: 45.99,
        imagen: "https://via.placeholder.com/300x200?text=Wagyu+Premium",
      },
    ].sort((a, b) => a.precio - b.precio),
  },
  {
    nombre: "Postres",
    icono: "fas fa-birthday-cake",
    items: [
      {
        nombre: "Tarta de Manzana",
        descripcion: "Tarta casera con manzanas frescas.",
        precio: 6.49,
        imagen: "https://via.placeholder.com/300x200?text=Tarta+Manzana",
      },
      {
        nombre: "Cheesecake",
        descripcion: "Tarta de queso con salsa de frutas.",
        precio: 6.99,
        imagen: "https://via.placeholder.com/300x200?text=Cheesecake",
      },
      {
        nombre: "Mousse de Chocolate",
        descripcion: "Mousse de chocolate negro con avellanas.",
        precio: 7.49,
        imagen: "https://via.placeholder.com/300x200?text=Mousse+Chocolate",
      },
      {
        nombre: "Tiramisú",
        descripcion: "Postre italiano con café y mascarpone.",
        precio: 7.99,
        imagen: "https://via.placeholder.com/300x200?text=Tiramisu",
      },
      {
        nombre: "Crème Brûlée",
        descripcion: "Crema catalana con azúcar caramelizado.",
        precio: 8.99,
        imagen: "https://via.placeholder.com/300x200?text=Creme+Brulee",
      },
    ].sort((a, b) => a.precio - b.precio),
  },
  {
    nombre: "Bebidas",
    icono: "fas fa-glass-martini",
    items: [
      {
        nombre: "Agua Mineral",
        descripcion: "Agua mineral con gas o sin gas.",
        precio: 2.99,
        imagen: "https://via.placeholder.com/300x200?text=Agua+Mineral",
      },
      {
        nombre: "Café",
        descripcion: "Café negro recién hecho.",
        precio: 3.99,
        imagen: "https://via.placeholder.com/300x200?text=Cafe",
      },
      {
        nombre: "Jugo de Naranja",
        descripcion: "Jugo natural de naranja fresca.",
        precio: 4.99,
        imagen: "https://via.placeholder.com/300x200?text=Jugo+de+Naranja",
      },
      {
        nombre: "Cóctel Margarita",
        descripcion: "Tequila, triple sec y limón fresco.",
        precio: 9.99,
        imagen: "https://via.placeholder.com/300x200?text=Margarita",
      },
      {
        nombre: "Vino Tinto Reserva",
        descripcion: "Vino tinto de la casa, cosecha 2018.",
        precio: 12.99,
        imagen: "https://via.placeholder.com/300x200?text=Vino+Tinto",
      },
    ].sort((a, b) => a.precio - b.precio),
  },
]);

// Computed para filtrar categorías basado en la búsqueda
const categoriasFiltradas = computed(() => {
  if (!searchQuery.value) {
    return categorias.value;
  }

  return categorias.value
    .map((categoria) => ({
      ...categoria,
      items: categoria.items.filter(
        (item) =>
          item.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.descripcion
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      ),
    }))
    .filter((categoria) => categoria.items.length > 0);
});

// Método para agregar al carrito (simulado)
const agregarAlCarrito = (item) => {
  console.log(`Agregado al carrito: ${item.nombre}`);
  // Aquí se podría integrar con un sistema de carrito real
};
</script>

<style scoped>
@import "../style.css";

/* Header Styles */
.restaurant-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 30px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-section h1 {
  font-family: "Georgia", serif;
  font-size: 2.5rem;
  margin: 0;
  color: #ecf0f1;
}

.restaurant-tagline {
  font-style: italic;
  color: #bdc3c7;
  margin: 5px 0 0 0;
}

.contact-info p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.contact-info i {
  margin-right: 8px;
  color: #e74c3c;
}

/* Search Bar */
.search-bar {
  background: #ecf0f1;
  padding: 20px 0;
  border-bottom: 1px solid #bdc3c7;
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 2px solid #bdc3c7;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #e74c3c;
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.2);
}

/* Main Content */
.menu-container {
  min-height: 100vh;
}

.container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 0;
}

h1 {
  font-family: "Georgia", serif;
  font-size: 3rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

p {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 50px;
}

.categoria-section {
  margin-bottom: 60px;
  animation: fadeInUp 0.8s ease-out;
}

.categoria-title {
  font-family: "Georgia", serif;
  font-size: 2.5rem;
  color: #e74c3c;
  border-bottom: 3px solid #e74c3c;
  padding-bottom: 15px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.categoria-icon {
  margin-right: 15px;
  color: #e74c3c;
}

.categoria-title::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #e74c3c, #f39c12);
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.menu-item {
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border: none;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 30px;
  animation: fadeInScale 0.6s ease-out;
  animation-fill-mode: both;
}

.menu-item:nth-child(odd) {
  animation-delay: 0.1s;
}

.menu-item:nth-child(even) {
  animation-delay: 0.2s;
}

.menu-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-item:hover .card-img-top {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:hover .card-overlay {
  opacity: 1;
}

.btn-quick-add {
  background: rgba(231, 76, 60, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-quick-add:hover {
  background: #e74c3c;
  transform: scale(1.1);
}

.card-body {
  padding: 20px;
  text-align: center;
}

.card-title {
  font-family: "Georgia", serif;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.card-text {
  color: #7f8c8d;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.card-footer-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.precio {
  font-weight: bold;
  color: #e74c3c;
  font-size: 1.4em;
}

.btn-primary {
  background: linear-gradient(45deg, #e74c3c, #f39c12);
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  font-size: 0.9rem;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #c0392b, #e67e22);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

/* Footer */
.menu-footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 50px;
}

.menu-footer p {
  margin: 0;
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .col-xl-3 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}

@media (max-width: 992px) {
  .col-xl-3,
  .col-lg-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .contact-info {
    margin-top: 20px;
  }

  .categoria-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .col-xl-3,
  .col-lg-4,
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  h1 {
    font-size: 2.5rem;
  }

  .categoria-title {
    font-size: 2rem;
  }

  .menu-item {
    margin-bottom: 20px;
  }

  .card-footer-custom {
    flex-direction: column;
    gap: 10px;
  }

  .card-body {
    padding: 18px;
  }

  .card-title {
    font-size: 1.4rem;
  }

  .card-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 576px) {
  .restaurant-header {
    padding: 20px 0;
  }

  .logo-section h1 {
    font-size: 2rem;
  }

  .container {
    padding: 20px 15px;
  }

  h1 {
    font-size: 2rem;
  }

  .categoria-title {
    font-size: 1.8rem;
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-text {
    font-size: 0.9rem;
  }

  .precio {
    font-size: 1.2em;
  }

  .search-input {
    padding: 10px 15px 10px 40px;
  }

  .btn-primary {
    padding: 10px 15px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .restaurant-header {
    padding: 15px 0;
  }

  .logo-section h1 {
    font-size: 1.8rem;
  }

  .restaurant-tagline {
    font-size: 0.9rem;
  }

  .contact-info p {
    font-size: 0.8rem;
  }

  .search-bar {
    padding: 15px 0;
  }

  .container {
    padding: 15px 10px;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .categoria-title {
    font-size: 1.6rem;
    margin-bottom: 25px;
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .card-text {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }

  .precio {
    font-size: 1.1em;
  }

  .btn-primary {
    padding: 8px 12px;
    font-size: 0.8rem;
  }

  .menu-footer {
    padding: 15px 0;
  }

  .menu-footer p {
    font-size: 0.8rem;
  }
}
</style>
