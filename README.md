# Sistema Orto-Whave

Sistema de gestión para clínicas de ortodoncia desarrollado con **NestJS** (backend) y **React** (frontend).

## 📋 Características

- **Gestión de Pacientes**: Registro, historial médico y datos personales
- **Sistema de Citas**: Agendamiento y gestión de citas médicas
- **Roles de Usuario**: Administrador, Doctor y Paciente
- **Autenticación Segura**: JWT con encriptación bcrypt
- **Base de Datos**: SQLite para desarrollo, MySQL para producción
- **Interfaz Moderna**: React con Tailwind CSS y Bootstrap

## 🚀 Instalación Rápida (Debian/Ubuntu)

### Opción 1: Instalación Automatizada (Recomendada)

```bash
# Clonar el repositorio
git clone https://github.com/SNPL-glicth/Desarrollo-Orto-Whave.git
cd Desarrollo-Orto-Whave

# Ejecutar script de instalación
./install.sh
```

El script automáticamente:
- ✅ Instala Node.js y dependencias del sistema
- ✅ Configura variables de entorno
- ✅ Instala dependencias del proyecto
- ✅ Inicializa la base de datos
- ✅ Crea scripts de inicio

### Opción 2: Instalación Manual

#### Prerrequisitos
- Node.js 16+ y npm
- Git
- SQLite3 (para desarrollo)
- MySQL (para producción)

#### Pasos

1. **Clonar repositorio**:
```bash
git clone https://github.com/SNPL-glicth/Desarrollo-Orto-Whave.git
cd Desarrollo-Orto-Whave
```

2. **Configurar Backend**:
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
npm run build
cd ..
```

3. **Configurar Frontend**:
```bash
cd frontend/my-app
npm install
cd ../..
```

4. **Inicializar Base de Datos**:
```bash
cd backend
node seed-roles.js  # Crear roles iniciales
cd ..
```

## 🎮 Uso

### Iniciar el Sistema Completo

```bash
# Iniciar backend y frontend juntos
./start.sh
```

### Iniciar Servicios por Separado

```bash
# Solo backend (puerto 4000)
./start-backend.sh

# Solo frontend (puerto 3000)
./start-frontend.sh
```

### URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Documentación API**: http://localhost:4000/api (si está configurada)

## 👥 Roles del Sistema

### 🔐 Administrador
- Crear doctores y pacientes sin verificación
- Gestionar todos los usuarios
- Aprobar citas médicas
- Acceso completo al sistema

### 👨‍⚕️ Doctor
- Gestión completa de citas
- Ver y editar historiales médicos
- Configurar horarios de disponibilidad
- Gestionar pacientes asignados

### 🧑‍🦲 Paciente
- Registrarse en el sistema
- Agendar citas con doctores
- Ver historial médico propio
- Confirmar citas programadas

## 🛠️ Estructura del Proyecto

```
Desarrollo-Orto-Whave/
├── backend/                 # Backend NestJS
│   ├── src/
│   │   ├── auth/           # Autenticación y JWT
│   │   ├── users/          # Gestión de usuarios
│   │   ├── citas/          # Sistema de citas
│   │   ├── pacientes/      # Gestión de pacientes
│   │   ├── historia-clinica/ # Historiales médicos
│   │   └── config/         # Configuraciones
│   ├── package.json
│   └── .env.example
├── frontend/               # Frontend React
│   └── my-app/
│       ├── src/
│       │   ├── components/ # Componentes React
│       │   ├── pages/      # Páginas de la app
│       │   ├── services/   # Servicios de API
│       │   └── context/    # Context providers
│       └── package.json
├── install.sh             # Script de instalación
├── start.sh               # Script de inicio completo
└── README.md              # Esta documentación
```

## 🔧 Configuración

### Variables de Entorno (backend/.env)

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=ortowhave
DB_PASSWORD=tu_password
DB_DATABASE=orto_whave_db

# JWT
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES_IN=24h

# Servidor
PORT=4000
NODE_ENV=development

# Email (opcional)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_password_de_app

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `POST /auth/verify` - Verificar cuenta

### Usuarios
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Citas
- `GET /citas` - Listar citas
- `POST /citas` - Crear cita
- `PUT /citas/:id` - Actualizar cita
- `DELETE /citas/:id` - Eliminar cita

### Pacientes
- `GET /pacientes` - Listar pacientes
- `POST /pacientes` - Crear paciente
- `GET /pacientes/:id` - Ver paciente

## 🐛 Troubleshooting

### El backend no inicia
```bash
# Verificar que Node.js esté instalado
node --version
npm --version

# Reinstalar dependencias
cd backend
rm -rf node_modules package-lock.json
npm install
```

### El frontend no compila
```bash
# Limpiar caché y reinstalar
cd frontend/my-app
rm -rf node_modules package-lock.json
npm install
```

### Error de base de datos
```bash
# Recrear base de datos
cd backend
rm orto_whave_dev.db
npm run build
node seed-roles.js
```

### Puerto ocupado
```bash
# Verificar qué proceso usa el puerto
sudo lsof -i :3000  # Para frontend
sudo lsof -i :4000  # Para backend

# Matar proceso si es necesario
sudo kill -9 PID
```

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Autenticación JWT segura
- ✅ Validación de datos con DTOs
- ✅ Roles y permisos granulares
- ✅ CORS configurado
- ✅ Variables de entorno para credenciales

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 📞 Soporte

Si tienes problemas con la instalación o uso del sistema:

1. Revisa la sección de [Troubleshooting](#-troubleshooting)
2. Verifica que hayas seguido todos los pasos de instalación
3. Asegúrate de tener las versiones correctas de Node.js (16+)
4. Revisa los logs de la consola para errores específicos

---

**Desarrollado para Orto-Whave** 🦷✨
