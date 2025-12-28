# 📱 Instalación como Progressive Web App (PWA)

## ✅ Configuración Completada

La aplicación ya está configurada como PWA. Solo necesitas seguir estos pasos:

## 📋 Pasos para Instalar en el Celular

### 1. Crear los Iconos (IMPORTANTE)

Antes de construir, necesitas crear dos iconos PNG:

**Ubicación:** `Impostor/public/`
- `icon-192.png` (192x192 píxeles)
- `icon-512.png` (512x512 píxeles)

**Opciones para crear los iconos:**

**Opción Rápida - Herramientas Online:**
1. Ve a https://realfavicongenerator.net/
2. Sube una imagen cuadrada (512x512 o mayor)
3. Descarga los iconos y colócalos en `Impostor/public/`

**Opción Manual:**
- Crea una imagen cuadrada con el emoji 🎭 o tu logo
- Redimensiona a 192x192 → `icon-192.png`
- Redimensiona a 512x512 → `icon-512.png`
- Colócalos en `Impostor/public/`

### 2. Construir la Aplicación

```bash
cd Impostor
npm run build
```

Esto creará la carpeta `dist` con todos los archivos.

### 3. Servir la Aplicación

#### Opción A: Servidor Local (Misma Red WiFi)

**Instalar servidor HTTP:**
```bash
npm install -g http-server
```

**Servir la app:**
```bash
cd dist
http-server -p 8080
```

**Obtener tu IP:**
- Windows: `ipconfig` (busca "IPv4 Address")
- Mac/Linux: `ifconfig` o `ip addr`

**Acceder desde el celular:**
- Conecta el celular a la misma WiFi
- Abre el navegador y ve a: `http://TU_IP:8080`
- Ejemplo: `http://192.168.1.100:8080`

#### Opción B: ngrok (Acceso desde Internet)

1. **Descargar ngrok:** https://ngrok.com/download

2. **Servir la app:**
```bash
cd dist
http-server -p 8080
```

3. **En otra terminal:**
```bash
ngrok http 8080
```

4. **Copiar la URL** (ejemplo: `https://abc123.ngrok.io`)
5. **Abrir en el celular** desde cualquier lugar

#### Opción C: Hosting Gratuito

Sube la carpeta `dist` a:
- **Netlify:** https://www.netlify.com (arrastra la carpeta dist)
- **Vercel:** https://vercel.com
- **GitHub Pages:** https://pages.github.com

### 4. Instalar en el Celular

#### 📱 Android (Chrome):
1. Abre la app en Chrome
2. Menú (3 puntos) → **"Agregar a la pantalla de inicio"**
3. Confirma → ¡Listo!

#### 🍎 iPhone (Safari):
1. Abre la app en Safari
2. Botón compartir (↑) → **"Agregar a pantalla de inicio"**
3. Personaliza nombre → **"Agregar"**
4. ¡Listo!

### 5. Verificar

- ✅ La app se abre sin barra de navegador
- ✅ Funciona offline (después de primera carga)
- ✅ Se ve como app nativa
- ✅ Aparece en la pantalla de inicio

## 🔧 Solución de Problemas

**No aparece la opción de instalar:**
- Verifica que uses HTTPS o localhost
- Asegúrate de que los iconos existan
- Prueba en modo incógnito

**Los iconos no aparecen:**
- Verifica que estén en `public/` con nombres exactos
- Reconstruye: `npm run build`

**No funciona offline:**
- Espera a que cargue completamente la primera vez
- Verifica que el service worker esté activo (DevTools → Application → Service Workers)

## 📝 Notas

- La primera carga puede tardar
- Las actualizaciones son automáticas
- Funciona mejor con HTTPS (ngrok o hosting lo proporcionan)

## 🚀 Desarrollo Rápido

Para probar en desarrollo:

```bash
npm run dev
```

Luego accede desde el celular usando tu IP local:
`http://TU_IP:5173`

Pero para PWA completa, usa `npm run build` y sirve desde `dist`.

