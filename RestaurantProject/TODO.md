# TODO: Implement Detailed View for "Mesas Totales" Card

## Tasks

- [x] Add reactive refs: showMesasModal (boolean), addedTables, deletedTables, reservations (arrays with mock data including dates)
- [x] Make the "Mesas Totales" summary-card clickable with @click="showMesasModal = true"
- [x] Add modal HTML structure below existing modals, with sections for:
  - Current Tables: List mesasFiltradas with details (number, status, clients, etc.)
  - Added Tables: List with dates
  - Deleted Tables: List with dates
  - Reservations: List with dates
  - Extra Option: "Export Report" button with alert functionality
- [x] Update mockData to include history examples (addedTables, deletedTables, reservations)
- [x] Style the new modal appropriately (similar to existing modals)
- [x] Test the functionality by running the app and clicking the card

# TODO: Implement Modal for "Clientes Atendidos" Card

## Tasks

- [x] Add reactive ref: showClientesModal (boolean)
- [x] Make the "Clientes Atendidos" summary-card clickable with @click="showClientesModal = true"
- [x] Add modal HTML structure for clients, showing list of attended clients grouped by table, including client name, table number, and payment method for the table
- [x] Style the new modal appropriately (similar to existing modals)
- [x] Test the functionality by running the app and clicking the card

# TODO: Implement Modal for "Pedidos Realizados" Card

## Tasks

- [x] Add reactive ref: showPedidosModal (boolean)
- [x] Make the "Pedidos Realizados" summary-card clickable with @click="showPedidosModal = true"
- [x] Add modal HTML structure for pedidos, showing list of orders grouped by table (table number, order description, total, time)
- [x] Style the new modal appropriately (similar to existing modals)
- [x] Test the functionality by running the app and clicking the card

# TODO: Implement Modal for "Ingresos Totales" Card

## Tasks

- [x] Add reactive ref: showIngresosModal (boolean)
- [x] Make the "Ingresos Totales" summary-card clickable with @click="showIngresosModal = true"
- [x] Add modal HTML structure for ingresos, showing detailed breakdown of all income transactions including:
  - List of all payments (pagos) with table number, amount, method, and time
  - Summary of total income by payment method
  - Total number of payments
  - Real-time updating total
- [x] Add helper methods: contarTotalPagos() and ingresosPorMetodo(metodo)
- [x] Style the new modal appropriately (similar to existing modals)
- [x] Test the functionality by running the app and clicking the card

# TODO: Implementar Menú Detallado en Menu.vue

## Tasks

- [x] Actualizar el template para incluir secciones de categorías (Entradas, Platos Principales, Postres, Bebidas) con listas de elementos usando v-for
- [x] Agregar datos reactivos en el script para las categorías y elementos del menú (con placeholders para imágenes, precios, etc.)
- [x] Incluir botones funcionales para agregar al carrito (console.log para simular)
- [x] Mejorar los estilos scoped para hacer el menú visualmente atractivo, con cards para cada elemento
- [x] Ejecutar el proyecto para verificar que el menú se renderice correctamente
- [ ] Probar la funcionalidad de los botones en el navegador

# TODO: Mejorar Estilos del Menú en Menu.vue

## Tasks

- [x] Actualizar estilos scoped con gradientes, mejor tipografía, animaciones y colores vibrantes para tema de restaurante
- [ ] Ejecutar el proyecto para verificar los cambios visuales
- [ ] Probar responsividad en el navegador

# TODO: Hacer Menú Más Profesional en Menu.vue

## Tasks

- [x] Agregar más elementos a categorías existentes (4-5 platos por categoría)
- [x] Incluir nueva categoría "Especialidades del Chef"
- [x] Agregar header con información del restaurante
- [x] Mejorar estilos con iconos para categorías
- [x] Agregar filtro de búsqueda para elementos del menú
- [x] Ejecutar proyecto y probar funcionalidad
