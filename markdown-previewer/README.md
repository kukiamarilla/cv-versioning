# Editor de CV en Markdown

Una aplicación React que permite crear, previsualizar y exportar CVs escritos en Markdown a PDF, con separación de páginas visible en la previsualización.

## 🚀 Características

- **Editor de Markdown en tiempo real** con sintaxis highlighting
- **Vista previa con separación de páginas** que simula el formato A4
- **Exportación a PDF** manteniendo el formato y separación de páginas
- **Interfaz responsive** que se adapta a diferentes tamaños de pantalla
- **Soporte completo de Markdown** incluyendo tablas, listas, código, etc.

## 📦 Instalación

1. Navega al directorio del proyecto:
```bash
cd markdown-previewer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler y servidor de desarrollo
- **react-markdown** para renderizar Markdown
- **remark-gfm** para soporte de GitHub Flavored Markdown
- **rehype-highlight** para syntax highlighting
- **jsPDF** para generación de PDFs
- **html2canvas** para captura de pantalla del contenido

## 📝 Uso

### Editor de Markdown
- Escribe tu CV en el panel izquierdo usando sintaxis Markdown
- El contenido se actualiza en tiempo real en la vista previa
- Soporta todas las características estándar de Markdown

### Vista Previa
- El panel derecho muestra cómo se verá tu CV
- La separación de páginas es visible con líneas de división
- El formato simula una página A4 (210mm x 297mm)
- Los estilos están optimizados para impresión

### Exportación a PDF
- Haz clic en el botón "📄 Exportar PDF" para generar el archivo
- El PDF mantiene el formato y separación de páginas
- Se genera automáticamente con múltiples páginas si es necesario

## 📋 Sintaxis Markdown Soportada

### Encabezados
```markdown
# Título Principal
## Sección
### Subsección
```

### Texto
```markdown
**Texto en negrita**
*Texto en cursiva*
`código inline`
```

### Listas
```markdown
- Elemento de lista
- Otro elemento

1. Lista numerada
2. Segundo elemento
```

### Enlaces e Imágenes
```markdown
[Texto del enlace](https://ejemplo.com)
![Texto alternativo](ruta/imagen.jpg)
```

### Tablas
```markdown
| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |
```

### Código
```markdown
```javascript
function ejemplo() {
  return "Hola mundo";
}
```
```

## 🎨 Personalización

### Estilos CSS
Los estilos están en `src/App.css` y puedes personalizarlos:

- **Colores**: Modifica las variables de color en la sección `:root`
- **Fuentes**: Cambia las familias de fuentes en `body` y `.markdown-preview`
- **Separación de páginas**: Ajusta `.markdown-preview::after` para cambiar la apariencia

### Tamaño de página
Para cambiar el tamaño de página, modifica estas propiedades en `.markdown-preview`:
```css
width: 210mm;  /* Ancho A4 */
min-height: 297mm;  /* Alto A4 */
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Preview de la construcción
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
markdown-previewer/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx          # Componente principal
│   ├── App.css          # Estilos principales
│   ├── index.css        # Estilos globales
│   └── main.tsx         # Punto de entrada
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuración Avanzada

### Cambiar el formato de página
Para usar un formato diferente (como Letter), modifica las dimensiones en `App.css`:

```css
.markdown-preview {
  width: 216mm;  /* Ancho Letter */
  min-height: 279mm;  /* Alto Letter */
}
```

### Personalizar la exportación PDF
Puedes modificar los parámetros de `html2canvas` y `jsPDF` en el método `handleExportPDF`:

```typescript
const canvas = await html2canvas(element, {
  scale: 3,  // Mayor resolución
  useCORS: true,
  allowTaint: true,
  backgroundColor: '#ffffff'
});
```

## 🐛 Solución de Problemas

### Error al exportar PDF
- Asegúrate de que el contenido esté completamente cargado
- Verifica que no haya errores en la consola del navegador
- Intenta con contenido más simple primero

### Problemas de renderizado
- Verifica que todas las dependencias estén instaladas correctamente
- Revisa la consola del navegador para errores de JavaScript
- Asegúrate de que el contenido Markdown sea válido

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de solución de problemas
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

**¡Disfruta creando tu CV en Markdown!** 🎉