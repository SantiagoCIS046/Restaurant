Qui# TODO: Implement Detailed View for "Mesas Totales" Card

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
