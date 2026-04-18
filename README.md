# Music Clone Pro 🎵

**Music Clone Pro** es una plataforma de streaming de música de alto rendimiento construida con una arquitectura moderna de **Islands Architecture** (Astro) y un backend relacional escalable (Supabase). El enfoque principal de este proyecto es demostrar la persistencia de estado en aplicaciones multi-página, optimización de consultas SQL y diseño responsivo de nivel empresarial.

[![Tech Stack](https://img.shields.io/badge/Stack-Astro%20%7C%20React%20%7C%20Supabase%20%7C%20Tailwind-blue)]
(#)

## 🚀 Características Principales

- **Seamless Audio Persistence:** Implementación de la **View Transitions API** de Astro para mantener la música sonando sin interrupciones durante la navegación entre rutas.
- **Búsqueda Avanzada Multi-tabla:** Motor de búsqueda reactivo con *Debounce* que consulta **Vistas SQL** personalizadas para filtrar simultáneamente por título, género y nombre del artista.
- **Navegación Relacional Completa:** Flujo de datos dinámico entre Artistas -> Álbumes -> Canciones mediante relaciones `Many-to-One` y `Many-to-Many`.
- **Arquitectura de Estado Agnóstica:** Gestión de estado global mediante **Nanostores**, permitiendo comunicación fluida entre islas de React y componentes estáticos de Astro.
- **Persistencia de Preferencias:** Almacenamiento local (LocalStorage) para favoritos y niveles de volumen.
- **Diseño Adaptativo Pro:** Experiencia móvil optimizada con *Bottom Navigation* y *Mini-Player* flotante con efectos de *Glassmorphism*.

## 🛠 Tech Stack

| Tecnología | Rol | Por qué se eligió |
| :--- | :--- | :--- |
| **Astro (SSR)** | Framework Principal | Por su capacidad de generar HTML estático con hidratación parcial, reduciendo el TBT (Total Blocking Time). |
| **React** | Islands de UI | Para componentes altamente interactivos como el Player y el Buscador. |
| **Supabase** | Backend-as-a-Service | PostgreSQL robusto para datos relacionales y Storage para streaming de audio. |
| **Nanostores** | State Management | Alternativa ligera a Redux/Zustand perfecta para la arquitectura de micro-frontends de Astro. |
| **Tailwind CSS** | Estilos | Para un sistema de diseño consistente y utilitario con optimización de purga de CSS. |

## 🏗 Arquitectura de Datos (SQL)

El proyecto utiliza una base de datos PostgreSQL normalizada para garantizar la integridad de los datos.

### Esquema Relacional

- `artists`: Almacena perfiles de artistas.
- `albums`: Vinculados a artistas mediante `artist_id`.
- `songs`: Vinculadas a álbumes y artistas.
- `songs_with_artist_name` (**SQL View**): Una vista optimizada que realiza *Joins* en el servidor para facilitar la búsqueda contextual y reducir la latencia en el cliente.

```sql
-- Ejemplo de la Vista de Búsqueda
CREATE VIEW songs_with_artist_name AS
SELECT s.*, a.name as artist_name
FROM songs s
JOIN artists a ON s.artist_id = a.id;
```

## 🧠 Desafíos Técnicos Resueltos

### 1. Persistencia del Audio en SSR

Uno de los mayores retos fue evitar que el objeto `Audio()` se reiniciara al cambiar de página. Se resolvió integrando `transition:persist` en el Layout Maestro de Astro, manteniendo la isla del reproductor viva en el DOM mientras el resto del contenido se intercambia.

### 2. Búsqueda por Tabla Relacional

El API de Supabase limita las búsquedas directas en tablas relacionadas mediante `.or()`. La solución fue implementar una **Vista SQL** en el backend, permitiendo consultas complejas sobre un solo recurso virtual, mejorando la mantenibilidad del código.

### 3. Optimización de Carga (UX)

Se implementaron **Skeleton Loaders** personalizados para la biblioteca y el buscador, reduciendo la ansiedad del usuario durante el fetching de datos asíncrono y mejorando el CLS (Cumulative Layout Shift).

## 📦 Instalación y Uso

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/music-clone-pro.git
   ```

2. **Instalar dependencias:**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno (.env):**

   ```env
   PUBLIC_SUPABASE_URL=tu_url
   PUBLIC_SUPABASE_ANON_KEY=tu_key
   ```

4. **Ejecutar en desarrollo:**

   ```bash
   pnpm dev
   ```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
