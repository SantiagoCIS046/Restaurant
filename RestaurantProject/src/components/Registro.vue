<template>
  <div class="registro-container">
    <div class="hero-section">
      <h1 class="hero-title">Registro de Mesas</h1>
      <p class="hero-subtitle">
        Gestiona el registro de mesas, clientes, pedidos y pagos durante el día.
      </p>
    </div>

    <!-- Filtro de fecha -->
    <div class="filter-section">
      <div class="date-filter">
        <label for="dateFilter" class="filter-label">Seleccionar Fecha:</label>
        <input
          type="date"
          id="dateFilter"
          v-model="selectedDate"
          class="date-input"
          @change="filterByDate"
        />
      </div>
      <button class="btn-add" @click="showAddModal = true">
        + Agregar Mesa
      </button>
    </div>

    <!-- Lista de mesas -->
    <div class="mesas-grid">
      <div
        v-for="mesa in mesasFiltradas"
        :key="mesa.id"
        class="mesa-card"
        :class="{ ocupada: mesa.estado === 'ocupada' }"
      >
        <div class="mesa-header">
          <h3 class="mesa-title">Mesa {{ mesa.numero }}</h3>
          <div class="mesa-actions">
            <span class="status-badge" :class="mesa.estado">{{
              mesa.estado
            }}</span>
            <button class="btn-action" @click="toggleEstadoMesa(mesa)">
              Cambiar Estado
            </button>
          </div>
        </div>
        <div class="mesa-content">
          <!-- Clientes -->
          <div class="section">
            <h4 class="section-title">👥 Clientes</h4>
            <div class="items-list">
              <div
                v-for="cliente in mesa.clientes"
                :key="cliente.id"
                class="item"
              >
                <span class="item-name">{{ cliente.nombre }}</span>
                <span class="item-time">{{ cliente.horaLlegada }}</span>
              </div>
              <button class="btn-add-item" @click="agregarCliente(mesa)">
                + Agregar Cliente
              </button>
            </div>
          </div>

          <!-- Pedidos -->
          <div class="section">
            <h4 class="section-title">🍽️ Pedidos</h4>
            <div class="items-list">
              <div v-for="pedido in mesa.pedidos" :key="pedido.id" class="item">
                <span class="item-name">{{ pedido.descripcion }}</span>
                <span class="item-price">${{ pedido.total }}</span>
                <span class="item-time">{{ pedido.hora }}</span>
              </div>
              <button class="btn-add-item" @click="agregarPedido(mesa)">
                + Agregar Pedido
              </button>
            </div>
          </div>

          <!-- Pagos -->
          <div class="section">
            <h4 class="section-title">💳 Pagos</h4>
            <div class="items-list">
              <div v-for="pago in mesa.pagos" :key="pago.id" class="item">
                <span class="item-name"
                  >${{ pago.monto }} - {{ pago.metodo }}</span
                >
                <span class="item-time">{{ pago.hora }}</span>
              </div>
              <button class="btn-add-item" @click="agregarPago(mesa)">
                + Agregar Pago
              </button>
            </div>
          </div>

          <!-- Total de la mesa -->
          <div class="mesa-total">
            <strong>Total de la Mesa: ${{ calcularTotalMesa(mesa) }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumen del día -->
    <div class="summary-section">
      <h3 class="summary-title">📊 Resumen del Día</h3>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-icon">🪑</div>
          <div class="summary-content">
            <h4>{{ mesasFiltradas.length }}</h4>
            <p>Mesas Totales</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">👥</div>
          <div class="summary-content">
            <h4>{{ totalClientes }}</h4>
            <p>Clientes Atendidos</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🍽️</div>
          <div class="summary-content">
            <h4>{{ totalPedidos }}</h4>
            <p>Pedidos Realizados</p>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">💰</div>
          <div class="summary-content">
            <h4>${{ totalIngresos }}</h4>
            <p>Ingresos Totales</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar mesa -->
    <div
      v-if="showAddModal"
      class="modal-overlay"
      @click="showAddModal = false"
    >
      <div class="modal-content" @click.stop>
        <h3>Agregar Nueva Mesa</h3>
        <form @submit.prevent="agregarMesa">
          <div class="form-group">
            <label>Número de Mesa:</label>
            <input
              v-model="nuevaMesa.numero"
              type="number"
              required
              class="form-input"
            />
          </div>
          <div class="form-actions">
            <button
              type="button"
              @click="showAddModal = false"
              class="btn-cancel"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Datos reactivos
const selectedDate = ref(new Date().toISOString().split("T")[0]);
const mesas = ref([]);
const showAddModal = ref(false);
const nuevaMesa = ref({ numero: null });

// Datos de ejemplo (mock data)
const mockData = [
  {
    id: 1,
    numero: 1,
    estado: "ocupada",
    fecha: "2023-10-01",
    clientes: [
      { id: 1, nombre: "Juan Pérez", horaLlegada: "12:00" },
      { id: 2, nombre: "María García", horaLlegada: "12:15" },
    ],
    pedidos: [
      { id: 1, descripcion: "Pizza Margherita", total: 15.99, hora: "12:30" },
      { id: 2, descripcion: "Ensalada César", total: 12.5, hora: "12:35" },
    ],
    pagos: [{ id: 1, monto: 28.49, metodo: "Tarjeta", hora: "14:00" }],
  },
  {
    id: 2,
    numero: 2,
    estado: "libre",
    fecha: "2023-10-01",
    clientes: [],
    pedidos: [],
    pagos: [],
  },
  {
    id: 3,
    numero: 3,
    estado: "ocupada",
    fecha: "2023-10-01",
    clientes: [{ id: 3, nombre: "Carlos López", horaLlegada: "13:00" }],
    pedidos: [
      { id: 3, descripcion: "Hamburguesa Deluxe", total: 18.99, hora: "13:15" },
      { id: 4, descripcion: "Refresco", total: 3.5, hora: "13:20" },
    ],
    pagos: [{ id: 2, monto: 22.49, metodo: "Efectivo", hora: "15:00" }],
  },
];

// Computed properties
const mesasFiltradas = computed(() => {
  return mesas.value.filter((mesa) => mesa.fecha === selectedDate.value);
});

const totalClientes = computed(() => {
  return mesasFiltradas.value.reduce(
    (total, mesa) => total + mesa.clientes.length,
    0
  );
});

const totalPedidos = computed(() => {
  return mesasFiltradas.value.reduce(
    (total, mesa) => total + mesa.pedidos.length,
    0
  );
});

const totalIngresos = computed(() => {
  return mesasFiltradas.value
    .reduce((total, mesa) => total + calcularTotalMesa(mesa), 0)
    .toFixed(2);
});

// Métodos
const filterByDate = () => {
  // La lógica de filtrado se maneja en el computed mesasFiltradas
};

const calcularTotalMesa = (mesa) => {
  const totalPedidos = mesa.pedidos.reduce(
    (sum, pedido) => sum + pedido.total,
    0
  );
  const totalPagos = mesa.pagos.reduce((sum, pago) => sum + pago.monto, 0);
  return Math.max(totalPedidos, totalPagos); // En caso de discrepancias, tomar el mayor
};

const toggleEstadoMesa = (mesa) => {
  mesa.estado = mesa.estado === "ocupada" ? "libre" : "ocupada";
};

const agregarCliente = (mesa) => {
  // Implementar modal para agregar cliente
  alert(`Agregar cliente a mesa ${mesa.numero}`);
};

const agregarPedido = (mesa) => {
  // Implementar modal para agregar pedido
  alert(`Agregar pedido a mesa ${mesa.numero}`);
};

const agregarPago = (mesa) => {
  // Implementar modal para agregar pago
  alert(`Agregar pago a mesa ${mesa.numero}`);
};

const agregarMesa = () => {
  if (nuevaMesa.value.numero) {
    const mesaNueva = {
      id: Date.now(),
      numero: nuevaMesa.value.numero,
      estado: "libre",
      fecha: selectedDate.value,
      clientes: [],
      pedidos: [],
      pagos: [],
    };
    mesas.value.push(mesaNueva);
    nuevaMesa.value.numero = null;
    showAddModal.value = false;
  }
};

// Inicializar datos
onMounted(() => {
  mesas.value = mockData;
});
</script>

<style scoped>
.registro-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.hero-section {
  text-align: center;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-weight: 600;
  color: #333;
}

.date-input {
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.date-input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-add {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.mesas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.mesa-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.mesa-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.mesa-card.ocupada {
  border-left: 5px solid #ff6b6b;
}

.mesa-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mesa-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.mesa-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.ocupada {
  background: #ff6b6b;
}

.status-badge.libre {
  background: #51cf66;
}

.btn-action {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.3);
}

.mesa-content {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.items-list {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.item:last-child {
  border-bottom: none;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-price {
  color: #28a745;
  font-weight: 600;
}

.item-time {
  color: #6c757d;
  font-size: 0.9rem;
}

.btn-add-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;
  margin-top: 10px;
}

.btn-add-item:hover {
  transform: translateY(-1px);
}

.mesa-total {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
}

.summary-section {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.summary-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #333;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s;
}

.summary-card:hover {
  transform: translateY(-3px);
}

.summary-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.summary-content h4 {
  font-size: 2rem;
  margin: 10px 0;
  font-weight: 700;
}

.summary-content p {
  margin: 0;
  opacity: 0.9;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-cancel {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-submit {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-submit:hover {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .mesas-grid {
    grid-template-columns: 1fr;
  }

  .filter-section {
    flex-direction: column;
    gap: 15px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
