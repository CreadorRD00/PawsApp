# PawsApp 🐾

**PawsApp** es una aplicación móvil diseñada para el almacenamiento, gestión y control del historial de vacunación de mascotas. Permite a los dueños centralizar la información médica de sus animales y organizar sus actividades en un solo lugar.

## 🚀 Características Principales
- **Perfil de Mascota:** Registro de nombre, raza, tipo de animal y fotografía.
- **Historial de Vacunas Seguro:** Espacio para registrar dosis y subir fotos de las tarjetas físicas de vacunación.
- **Calendario de Eventos:** Agenda para citas veterinarias, vacunas, paseos o reuniones.
- **Sistema de Patrocinios:** Espacio dedicado para anuncios y banners de negocios locales (veterinarias, pet-shops).

## 🛠️ Arquitectura de la Base de Datos (Estructura en Glide)
La aplicación utiliza una estructura de datos relacional compuesta por las siguientes tablas:

### 1. Tabla: `Users` (Usuarios)
- `Name` (Text) - Nombre del usuario.
- `Email` (Email) - Correo electrónico de inicio de sesión.
- `Photo` (Image) - Foto de perfil.
- `Role` (Text) - Rol en la app (Usuario Regular / Patrocinador).

### 2. Tabla: `Mascotas`
- `ID_Mascota` (Text/Unique ID) - Identificador único.
- `ID_Dueno` (Text) - Enlace al correo del dueño.
- `Nombre` (Text) - Nombre de la mascota.
- `Tipo` (Text) - Perro, gato, etc.
- `Raza` (Text) - Raza del animal.
- `Foto_Perfil` (Image) - Imagen de la mascota.

### 3. Tabla: `Vacunas`
- `ID_Vacuna` (Text) - Identificador único.
- `ID_Mascota` (Text) - Enlace a la mascota correspondiente.
- `Nombre_Vacuna` (Text) - Ej: Rabia, Quíntuple.
- `Fecha_Aplicacion` (Date) - Día de la dosis.
- `Proxima_Dosis` (Date) - Fecha del próximo refuerzo.
- `Foto_Tarjeta` (Image) - Captura de la tarjeta física para mayor seguridad.

### 4. Tabla: `Anuncios` (Patrocinios)
- `Nombre_Negocio` (Text) - Nombre del patrocinador.
- `Banner_Publicitario` (Image) - Imagen del anuncio.
- `Enlace_Destino` (URL) - Link hacia WhatsApp o Instagram del negocio.

## 📱 Tecnologías Utilizadas
- **Plataforma:** Glide Apps (No-Code)
- **Base de Datos:** Google Sheets / Glide Data Tables
