# 📱 Guía de Instalación - Progressive Web App (PWA)

## Paso a Paso para Instalar en el Celular

### 1. Preparar el Proyecto

Primero, instala las dependencias necesarias:

```bash
cd Impostor
npm install
```

### 2. Generar los Iconos

Necesitas crear dos iconos para la PWA:
- `icon-192.png` (192x192 píxeles)
- `icon-512.png` (512x512 píxeles)

**Opciones para crear los iconos:**

#### Opción A: Usar una herramienta online
1. Ve a https://realfavicongenerator.net/ o https://www.pwabuilder.com/imageGenerator
2. Sube una imagen cuadrada (preferiblemente 512x512 o mayor)
3. Descarga los iconos generados
4. Colócalos en la carpeta `Impostor/public/` con los nombres:
   - `icon-192.png`
   - `icon-512.png`

#### Opción B: Crear manualmente
1. Crea una imagen cuadrada con un emoji 🎭 o el logo que quieras
2. Redimensiona a 192x192 y guárdala como `icon-192.png`
3. Redimensiona a 512x512 y guárdala como `icon-512.png`
4. Colócalas en `Impostor/public/`

### 3. Construir la Aplicación

```bash
npm run build
```

Esto generará una carpeta `dist` con todos los archivos necesarios.

### 4. Opciones para Acceder desde el Celular

#### Opción A: Usar un Servidor Local en la Red

1. **Instalar un servidor HTTP simple:**
   ```bash
   npm install -g http-server
   ```

2. **Servir la aplicación:**
   ```bash
   cd dist
   http-server -p 8080
   ```

3. **Obtener tu IP local:**
   - Windows: Abre CMD y ejecuta `ipconfig`, busca "IPv4 Address"
   - Mac/Linux: Abre Terminal y ejecuta `ifconfig` o `ip addr`

4. **Acceder desde el celular:**
   - Asegúrate de que el celular esté en la misma red WiFi
   - Abre el navegador en el celular
   - Ve a: `http://TU_IP:8080` (ejemplo: `http://192.168.1.100:8080`)

#### Opción B: Usar ngrok (Acceso desde Internet)

1. **Instalar ngrok:**
   - Ve a https://ngrok.com/download
   - Descarga e instala ngrok

2. **Servir la aplicación:**
   ```bash
   cd dist
   http-server -p 8080
   ```

3. **En otra terminal, ejecutar ngrok:**
   ```bash
   ngrok http 8080
   ```

4. **Copiar la URL de ngrok:**
   - Se mostrará algo como: `https://abc123.ngrok.io`
   - Abre esa URL en el navegador del celular

#### Opción C: Subir a un Hosting Gratuito

Puedes subir la carpeta `dist` a servicios gratuitos como:
- **Netlify:** https://www.netlify.com
- **Vercel:** https://vercel.com
- **GitHub Pages:** https://pages.github.com
- **Firebase Hosting:** https://firebase.google.com/docs/hosting

### 5. Instalar en el Celular

Una vez que tengas acceso a la aplicación desde el navegador del celular:

#### Android (Chrome):
1. Abre la aplicación en Chrome
2. Toca el menú (3 puntos) en la esquina superior derecha
3. Selecciona **"Agregar a la pantalla de inicio"** o **"Instalar aplicación"**
4. Confirma la instalación
5. La app aparecerá como una aplicación normal en tu celular

#### iPhone (Safari):
1. Abre la aplicación en Safari
2. Toca el botón de compartir (cuadrado con flecha hacia arriba)
3. Desplázate y selecciona **"Agregar a pantalla de inicio"**
4. Personaliza el nombre si quieres
5. Toca **"Agregar"**
6. La app aparecerá en tu pantalla de inicio

### 6. Verificar la Instalación

- La aplicación debería abrirse sin la barra de direcciones del navegador
- Debería funcionar offline (después de la primera carga)
- Debería verse como una aplicación nativa

## Notas Importantes

- **HTTPS requerido:** Para que la PWA funcione completamente, necesitas HTTPS. En desarrollo local, ngrok o servicios de hosting lo proporcionan.
- **Primera carga:** La primera vez que abres la app, puede tardar un poco en cargar todos los recursos.
- **Actualizaciones:** La app se actualizará automáticamente cuando haya cambios.

## Solución de Problemas

- Si no aparece la opción de instalar, verifica que estés usando HTTPS o localhost
- Asegúrate de que el manifest.json esté accesible
- Verifica que los iconos estén en la carpeta public y tengan los nombres correctos
- En Android, puede que necesites habilitar "Instalar aplicaciones desconocidas" en Chrome

