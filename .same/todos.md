# Tareas de Desarrollo - Sistema Orto-Whave
## Nuevas Prioridades Críticas del Usuario

### 🔥 CRÍTICAS (IMPLEMENTAR AHORA)

### 1. [COMPLETED] Sistema básico de citas
- **Estado**: completed
- **Descripción**: Implementar sistema completo de agendamiento de citas
- **Funcionalidades**:
  - Doctores pueden crear, modificar y ver citas
  - Pacientes pueden agendar citas con doctores disponibles
  - Sistema de aprobación de citas por administrador
  - Ver espacios disponibles de doctores
- **Archivos a crear**:
  - `backend/src/citas/` (módulo completo)
  - `frontend/my-app/src/components/citas/` (componentes React)
- **Prioridad**: CRÍTICA

### 2. [PENDING] Gestión de pacientes completa
- **Estado**: pending
- **Descripción**: Ampliar gestión de pacientes con datos médicos completos
- **Funcionalidades**:
  - Historial médico completo
  - Datos personales expandidos
  - Gestión por doctores y administradores
- **Archivos a crear**:
  - `backend/src/pacientes/` (entidades expandidas)
  - `backend/src/historia-clinica/` (nuevo módulo)
- **Prioridad**: CRÍTICA

### 3. [PENDING] Nuevos roles y permisos
- **Estado**: pending
- **Descripción**: Implementar funcionalidades específicas por rol
- **Funcionalidades**:
  - **Administrador**: Agregar doctores/pacientes sin verificación, aprobar citas
  - **Doctores**: Gestión completa de citas, historial médico, horarios
  - **Pacientes**: Agendar citas, ver disponibilidad, confirmación
  - **Registro frontend**: Solo para pacientes
- **Prioridad**: CRÍTICA

### 🟡 IMPORTANTES (SIGUIENTE FASE)

### 4. [PENDING] Notificaciones por email
- **Estado**: pending
- **Descripción**: Sistema de notificaciones para recordatorios y confirmaciones
- **Prioridad**: IMPORTANTE

### 5. [PENDING] Reportes básicos
- **Estado**: pending
- **Descripción**: Reportes para administradores y doctores
- **Prioridad**: IMPORTANTE

### 🟢 DESEABLES (FUTURO)

### 6. [NOT_PLANNED] Sistema de pagos
- **Estado**: not_planned
- **Descripción**: Por el momento no se implementará
- **Prioridad**: DESEABLE (no hacer)

## 📋 PLAN DE IMPLEMENTACIÓN

### Fase 1: Backend Core (Semana 1)
1. Crear entidades de Citas, Historia Clínica, Perfil Médico
2. Implementar servicios de gestión de citas
3. Crear APIs para roles específicos

### Fase 2: Frontend Funcional (Semana 2)
1. Dashboards específicos por rol
2. Componentes de agendamiento de citas
3. Interfaces de gestión de pacientes

### Fase 3: Integración y Testing (Semana 3)
1. Integración completa frontend-backend
2. Testing de funcionalidades críticas
3. Implementación de notificaciones

## ✅ TAREAS COMPLETADAS

- Análisis de problemas en el código existente
- Documentación de problemas identificados
- Creación de plan de corrección

## 📋 NOTAS

- Se priorizan los problemas de seguridad críticos
- El sistema debe mantener compatibilidad con la estructura de base de datos existente
- Se debe mantener la funcionalidad actual mientras se corrigen los problemas
