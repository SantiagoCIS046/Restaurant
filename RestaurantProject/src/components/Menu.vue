<template>
  <div class="menu-container">
    <div class="button-bar">
      <button @click="currentSection = 'productos'">Productos</button>
      <button @click="currentSection = 'ingredientes'">Ingredientes</button>
      <button>Cant. de productos</button>
      <button>Cant. de Ingredientes</button>
      <button>Lista de precios</button>
    </div>
    <div v-if="currentSection === 'productos'" class="productos-page">
      <div class="left-side">
        <h1 class="title">Categorías de Productos</h1>
        <div class="category-list">
          <button
            v-for="category in categories"
            :key="category"
            class="category-btn"
            :class="{ active: selectedCategory === category }"
            @click="selectCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div class="right-side" @wheel.prevent>
        <button class="add-btn" @click="toggleAddForm">Agregar al Menú</button>
        <div v-if="selectedCategory" class="item-list">
          <h2>{{ selectedCategory }}</h2>
          <ul>
            <li
              v-for="(item, index) in items[selectedCategory]"
              :key="item"
              class="item-row"
            >
              <span class="item-name">{{ index + 1 }}. {{ item }}</span>
              <div class="item-actions">
                <button
                  @click="editItem(index)"
                  class="edit-btn"
                  title="Editar"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteItem(index)"
                  class="delete-btn"
                  title="Eliminar"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="currentSection === 'ingredientes'" class="productos-page">
      <div class="left-side">
        <h1 class="title">Categorías de Ingredientes</h1>
        <div class="category-list">
          <button
            v-for="category in ingredientCategories"
            :key="category"
            class="category-btn"
            :class="{ active: selectedIngredientCategory === category }"
            @click="selectIngredientCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>
      <div class="right-side" @wheel.prevent>
        <button class="add-btn" @click="toggleAddIngredientForm">
          Agregar Ingrediente
        </button>
        <div v-if="selectedIngredientCategory" class="item-list">
          <h2>{{ selectedIngredientCategory }}</h2>
          <ul>
            <li
              v-for="(item, index) in ingredients[selectedIngredientCategory]"
              :key="item"
              class="item-row"
            >
              <span class="item-name">{{ index + 1 }}. {{ item }}</span>
              <div class="item-actions">
                <button
                  @click="editIngredient(index)"
                  class="edit-btn"
                  title="Editar"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteIngredient(index)"
                  class="delete-btn"
                  title="Eliminar"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Modal para agregar artículo -->
    <div v-if="showAddForm" class="modal-overlay" @click="toggleAddForm">
      <div class="modal-content" @click.stop>
        <h3>Agregar Artículo</h3>
        <select v-model="newItem.category">
          <option disabled value="">Selecciona una categoría</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <input v-model="newItem.name" placeholder="Nombre del artículo" />
        <div class="modal-buttons">
          <button @click="addItem">Agregar</button>
          <button @click="toggleAddForm">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para editar artículo -->
    <div
      v-if="showEditForm"
      class="modal-overlay"
      @click="showEditForm = false"
    >
      <div class="modal-content" @click.stop>
        <h3>Editar Artículo</h3>
        <input v-model="newItem.name" placeholder="Nombre del artículo" />
        <div class="modal-buttons">
          <button @click="updateItem">Actualizar</button>
          <button @click="showEditForm = false">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para agregar ingrediente -->
    <div
      v-if="showAddIngredientForm"
      class="modal-overlay"
      @click="toggleAddIngredientForm"
    >
      <div class="modal-content" @click.stop>
        <h3>Agregar Ingrediente</h3>
        <select v-model="newIngredient.category">
          <option disabled value="">Selecciona una categoría</option>
          <option
            v-for="category in ingredientCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <input
          v-model="newIngredient.name"
          placeholder="Nombre del ingrediente"
        />
        <div class="modal-buttons">
          <button @click="addIngredient">Agregar</button>
          <button @click="toggleAddIngredientForm">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para editar ingrediente -->
    <div
      v-if="showEditIngredientForm"
      class="modal-overlay"
      @click="showEditIngredientForm = false"
    >
      <div class="modal-content" @click.stop>
        <h3>Editar Ingrediente</h3>
        <input
          v-model="newIngredient.name"
          placeholder="Nombre del ingrediente"
        />
        <div class="modal-buttons">
          <button @click="updateIngredient">Actualizar</button>
          <button @click="showEditIngredientForm = false">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentSection = ref("productos");
const categories = ref([
  "Bebidas",
  "Entradas",
  "Adicionales",
  "Com. de Mar",
  "Nuestros Pescados",
  "Cocina Tipica",
  "Res",
  "Cerdo",
  "Pastas",
  "Aves",
  "Vegetales",
  "Postres",
  "Ensaladas",
]);
const items = ref({
  Bebidas: [],
  Entradas: [],
  Adicionales: [],
  "Com. de Mar": [],
  "Nuestros Pescados": [],
  "Cocina Tipica": [],
  Res: [],
  Cerdo: [],
  Pastas: [],
  Aves: [],
  Vegetales: [],
  Postres: [],
  Ensaladas: [],
});
const ingredientCategories = ref([
  "Verduras",
  "Frutas",
  "Carnes",
  "Lácteos",
  "Especias",
  "Granos",
  "Aceites",
  "Condimentos",
]);
const ingredients = ref({
  Verduras: [],
  Frutas: [],
  Carnes: [],
  Lácteos: [],
  Especias: [],
  Granos: [],
  Aceites: [],
  Condimentos: [],
});
const selectedCategory = ref("");
const selectedIngredientCategory = ref("");
const newItem = ref({ category: "", name: "" });
const newIngredient = ref({ category: "", name: "" });
const showAddForm = ref(false);
const showAddIngredientForm = ref(false);
const editingIndex = ref(-1);
const editingIngredientIndex = ref(-1);
const showEditForm = ref(false);
const showEditIngredientForm = ref(false);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const addItem = () => {
  if (newItem.value.category && newItem.value.name) {
    items.value[newItem.value.category].push(newItem.value.name);
    newItem.value = { category: "", name: "" };
    showAddForm.value = false;
  }
};

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value;
};

const editItem = (index) => {
  editingIndex.value = index;
  newItem.value.name = items.value[selectedCategory.value][index];
  newItem.value.category = selectedCategory.value;
  showEditForm.value = true;
};

const updateItem = () => {
  if (newItem.value.name && editingIndex.value >= 0) {
    items.value[selectedCategory.value][editingIndex.value] =
      newItem.value.name;
    newItem.value = { category: "", name: "" };
    editingIndex.value = -1;
    showEditForm.value = false;
  }
};

const deleteItem = (index) => {
  items.value[selectedCategory.value].splice(index, 1);
};

const selectIngredientCategory = (category) => {
  selectedIngredientCategory.value = category;
};

const addIngredient = () => {
  if (newIngredient.value.category && newIngredient.value.name) {
    ingredients.value[newIngredient.value.category].push(
      newIngredient.value.name
    );
    newIngredient.value = { category: "", name: "" };
    showAddIngredientForm.value = false;
  }
};

const toggleAddIngredientForm = () => {
  showAddIngredientForm.value = !showAddIngredientForm.value;
};

const editIngredient = (index) => {
  editingIngredientIndex.value = index;
  newIngredient.value.name =
    ingredients.value[selectedIngredientCategory.value][index];
  newIngredient.value.category = selectedIngredientCategory.value;
  showEditIngredientForm.value = true;
};

const updateIngredient = () => {
  if (newIngredient.value.name && editingIngredientIndex.value >= 0) {
    ingredients.value[selectedIngredientCategory.value][
      editingIngredientIndex.value
    ] = newIngredient.value.name;
    newIngredient.value = { category: "", name: "" };
    editingIngredientIndex.value = -1;
    showEditIngredientForm.value = false;
  }
};

const deleteIngredient = (index) => {
  ingredients.value[selectedIngredientCategory.value].splice(index, 1);
};
</script>

<style scoped>
.menu-container {
  position: relative;
  padding-top: 100px; /* Ajuste para la navbar fija */
  overflow: hidden;
}

.button-bar {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(26, 46, 82, 0.733);
  border-radius: 1px;
  position: fixed;
  top: 48px; /* Adjust based on navbar height */
  left: 0;
  width: 100%;
  z-index: 999;
  pointer-events: auto;
}

.button-bar button {
  background: #3182ce;
  border: none;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.button-bar button:hover {
  background: #2c5282;
  transform: translateY(-1px);
}
.button-bar button:focus {
  outline: 2px solid #3182ce;
  outline-offset: 2px;
  transition: outline 0.1s ease;
}

.productos-page {
  display: flex;
  position: fixed;
  top: 100px; /* Adjust based on navbar height */
  left: 0;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
}

.left-side {
  flex: 0 0 30%;
  padding: 1rem;
  background: #dedede7b;
  border-right: 1px solid #e2e8f0;
  border-radius: 10px 0 0 10px;
  overflow-y: auto;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-btn {
  background: #edf2f7;
  border: 1px solid #cbd5e0;
  color: #4a5568;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  text-align: left;
  transition: all 0.2s ease;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-btn:hover {
  background: #e2e8f0;
}

.category-btn.active {
  background: #3182ce;
  color: white;
  border-color: #2c5282;
}

.right-side {
  flex: 1;
  padding: 1rem;
  background: #ffffff;
  overflow-y: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.add-btn {
  background: #38a169;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background: #2f855a;
}

.add-form {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-form select,
.add-form input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}

.add-form button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-form button:first-of-type {
  background: #3182ce;
  color: white;
}

.add-form button:first-of-type:hover {
  background: #2c5282;
}

.add-form button:last-of-type {
  background: #e53e3e;
  color: white;
}

.add-form button:last-of-type:hover {
  background: #c53030;
}

.item-list h2 {
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.item-list ul {
  list-style: none;
  padding: 0;
}

.item-list li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.item-name {
  flex: 1;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-btn {
  background: #3182ce;
  border: none;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-btn:hover {
  background: #2c5282;
}

.delete-btn {
  background: #ce3131;
  height: 28px;
  border: none;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.delete-btn:hover {
  background: #c53030;
}

/* Modal styles */
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
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2d3748;
}

.modal-content select,
.modal-content input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

.modal-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.modal-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.modal-buttons button:first-child {
  background: #3182ce;
  color: white;
}

.modal-buttons button:first-child:hover {
  background: #2c5282;
}

.modal-buttons button:last-child {
  background: #e53e3e;
  color: white;
}

.modal-buttons button:last-child:hover {
  background: #c53030;
}
</style>
