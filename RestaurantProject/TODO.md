# TODO: Implementar Gestión de Clientes con Detalles de Pagos, Mesas y Pedidos

## Información Recopilada

- **Clientes.vue**: Ahora implementado completamente con gestión de clientes, integración con reservas de Restaurant.vue, pagos simulados y detalles de mesas.
- **Restaurant.vue**: Proporciona datos de mesas y reservas en localStorage ("mesasRestaurante", "reservasRestaurante"). Usamos reservas para asociar clientes por nombre.
- **Pedidos.vue** y **Finanzas.vue**: Preparados para expansión futura con pedidos reales y finanzas detalladas.
- Integración: Clientes se crean automáticamente desde reservas existentes. Pagos simulados de $50 por reserva. Placeholder para pedidos.

## Plan de Implementación

1. **Inicializar Datos de Clientes**: ✅ Completado - localStorage "clientesRestaurante" inicializado.
2. **Asociar Reservas a Clientes**: ✅ Completado - Por nombre de reserva, vincular mesas y pagos simulados.
3. **UI de Clientes**: ✅ Completado - Lista de clientes con detalles expandibles (reservas, mesas, pagos, pedidos placeholder).
4. **Funcionalidades CRUD**: ✅ Completado - Agregar, ver detalles y eliminar clientes.
5. **Persistencia**: ✅ Completado - Usar localStorage para guardar cambios.
6. **Expansión Futura**: Preparado - Placeholder para integrar pedidos reales de Pedidos.vue y finanzas de Finanzas.vue.

## Pasos Detallados

- [x] Leer reservas de localStorage en Clientes.vue.
- [x] Crear función para inicializar clientes simulados si no existen.
- [x] Implementar template con lista de clientes y modales para detalles.
- [x] Agregar lógica para calcular pagos simulados basados en reservas.
- [x] Implementar métodos CRUD para clientes.
- [x] Agregar estilos consistentes con el proyecto.
- [x] Probar integración con Restaurant.vue (cambios en reservas se reflejen en clientes).

## Archivos Editados

- RestaurantProject/src/components/Clientes.vue (implementado completamente)
- RestaurantProject/TODO.md (actualizado con progreso)

## Próximos Pasos de Expansión

- Integrar pedidos reales desde Pedidos.vue.
- Agregar finanzas detalladas desde Finanzas.vue.
- Mejorar pagos con métodos reales y montos variables.
- Agregar edición de clientes.
- Implementar búsqueda y filtros.
