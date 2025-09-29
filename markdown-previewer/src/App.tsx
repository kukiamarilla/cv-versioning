import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useReactToPrint } from 'react-to-print';
import 'highlight.js/styles/github.css';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(`# Mi CV

## Información Personal
- **Nombre:** Juan Pérez
- **Email:** juan@email.com
- **Teléfono:** +1 234 567 8900
- **Ubicación:** <small>Ciudad, País</small>
- **LinkedIn:** [linkedin.com/in/juanperez](https://linkedin.com/in/juanperez)<br>
<small>Perfil profesional actualizado</small>

## Experiencia Profesional

### Desarrollador Senior - Empresa ABC (2020-2023)
- Lideré el desarrollo de aplicaciones web con React y Node.js
- Implementé arquitecturas de microservicios
- Coordiné un equipo de 5 desarrolladores<br>
<em>Logros destacados: Reducción del 40% en tiempo de carga</em>

### Desarrollador - Empresa XYZ (2018-2020)
- Desarrollé aplicaciones móviles con React Native
- Trabajé con bases de datos SQL y NoSQL
- Participé en el diseño de APIs REST

## Educación

### Ingeniería en Sistemas - Universidad ABC (2014-2018)
- Promedio: 8.5/10
- Proyecto final: Sistema de gestión de inventarios

## Habilidades Técnicas
- **Lenguajes:** JavaScript, TypeScript, Python, Java
- **Frameworks:** React, Node.js, Express, Django
- **Bases de datos:** PostgreSQL, MongoDB, Redis
- **Herramientas:** Git, Docker, AWS, Kubernetes

## Proyectos Destacados

### E-commerce Platform
Desarrollé una plataforma completa de comercio electrónico con:
- Frontend en React con TypeScript
- Backend en Node.js con Express
- Base de datos PostgreSQL
- Integración con pasarelas de pago

### Sistema de Monitoreo
Creé un sistema de monitoreo en tiempo real que:
- Procesa millones de eventos por día
- Utiliza Apache Kafka para el streaming
- Dashboard en React con visualizaciones en tiempo real
- Alertas automáticas por email y Slack

---

<div style="text-align: center; margin-top: 2rem;">
<small><em>Última actualización: Enero 2025</em></small><br>
<small>CV generado con Markdown</small>
</div>`);

  const [customCSS, setCustomCSS] = useState(`/* Estilos personalizados para tu CV */
    .markdown-preview h1 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid #3498db;
      font-weight: 700;
    }

    .markdown-preview h2 {
      color: #34495e;
      font-size: 1.5rem;
      margin: 1.5rem 0 1rem 0;
      font-weight: 600;
    }

    .markdown-preview h3 {
      color: #34495e;
      font-size: 1.25rem;
      margin: 1.25rem 0 0.75rem 0;
      font-weight: 600;
    }

    .markdown-preview p {
      margin-bottom: 1rem;
      line-height: 1.6;
      color: #555;
    }

    .markdown-preview ul, .markdown-preview ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }

    .markdown-preview li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
      color: #555;
    }

    .markdown-preview strong {
      color: #2c3e50;
      font-weight: 600;
    }

    .markdown-preview em {
      color: #7f8c8d;
      font-style: italic;
    }

    .markdown-preview code {
      background: #f8f9fa;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
      color: #e74c3c;
    }

    .markdown-preview pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      margin-bottom: 1rem;
      border-left: 4px solid #3498db;
    }

    .markdown-preview pre code {
      background: none;
      padding: 0;
      color: #2c3e50;
    }

    .markdown-preview blockquote {
      border-left: 4px solid #3498db;
      padding-left: 1rem;
      margin: 1rem 0;
      color: #7f8c8d;
      font-style: italic;
    }

    .markdown-preview hr {
      border: none;
      height: 2px;
      background: linear-gradient(to right, transparent, #bdc3c7, transparent);
      margin: 2rem 0;
    }

    .markdown-preview table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }

    .markdown-preview th,
    .markdown-preview td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    .markdown-preview th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    /* Soporte para elementos HTML inline */
    .markdown-preview small {
      font-size: 0.875em;
      color: #6c757d;
      opacity: 0.8;
    }

    .markdown-preview br {
      line-height: 1;
    }

    .markdown-preview em {
      font-style: italic;
      color: #7f8c8d;
    }

    .markdown-preview strong {
      font-weight: 600;
      color: #2c3e50;
    }

    .markdown-preview span {
      display: inline;
    }

    .markdown-preview div {
      display: block;
      margin-bottom: 0.5rem;
    }`);

  const [activeTab, setActiveTab] = useState('markdown');
  const printRef = useRef<HTMLDivElement>(null);

  // Aplicar CSS personalizado dinámicamente - SOLO al contenedor del preview
  useEffect(() => {
    const previewElement = document.getElementById('markdown-preview');
    if (!previewElement) return;

    // Remover estilos anteriores
    const existingStyle = previewElement.querySelector('#scoped-custom-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Crear estilos scoped solo para el preview
    if (customCSS.trim()) {
      const scopedStyle = document.createElement('style');
      scopedStyle.id = 'scoped-custom-styles';
      
      // Función para hacer scoping seguro del CSS
      const createScopedCSS = (css: string) => {
        // Validar que no contenga selectores peligrosos
        const dangerousSelectors = [
          'body', 'html', 'head', 'script', 'style', 'meta', 'title',
          'link', 'base', 'form', 'input', 'button', 'textarea',
          'select', 'option', 'iframe', 'object', 'embed', 'applet'
        ];
        
        // Dividir por bloques CSS (reglas que terminan en })
        const blocks = css.split(/(?<=})\s*(?=\S)/);
        
        return blocks
          .map(block => {
            const trimmedBlock = block.trim();
            if (!trimmedBlock) return '';
            
            // Si ya tiene .markdown-preview, no modificar
            if (trimmedBlock.includes('.markdown-preview')) {
              return trimmedBlock;
            }
            
            // Si es un comentario o regla @, no modificar
            if (trimmedBlock.startsWith('/*') || trimmedBlock.startsWith('@')) {
              return trimmedBlock;
            }
            
            // Si contiene llaves, es una regla CSS
            if (trimmedBlock.includes('{') && trimmedBlock.includes('}')) {
              // Extraer el selector y las propiedades
              const [selector, ...rest] = trimmedBlock.split('{');
              const properties = rest.join('{');
              const cleanSelector = selector.trim();
              
              // Verificar si el selector es peligroso
              const isDangerous = dangerousSelectors.some(dangerous => 
                cleanSelector === dangerous || 
                cleanSelector.startsWith(dangerous + ' ') ||
                cleanSelector.startsWith(dangerous + ',') ||
                cleanSelector.startsWith(dangerous + ':') ||
                cleanSelector.startsWith(dangerous + '.') ||
                cleanSelector.startsWith(dangerous + '#')
              );
              
              if (isDangerous) {
                console.warn('Selector CSS peligroso detectado y bloqueado:', cleanSelector);
                return ''; // Bloquear selectores peligrosos
              }
              
              // Si el selector ya es específico, no modificar
              if (cleanSelector.startsWith('.markdown-preview') || 
                  cleanSelector.startsWith('#markdown-preview')) {
                return trimmedBlock;
              }
              
              // Agregar .markdown-preview al inicio del selector
              const scopedSelector = `.markdown-preview ${cleanSelector}`;
              return `${scopedSelector} {${properties}`;
            }
            
            return trimmedBlock;
          })
          .filter(block => block.trim())
          .join('\n');
      };
      
      const scopedCSS = createScopedCSS(customCSS);
      scopedStyle.textContent = scopedCSS;
      previewElement.appendChild(scopedStyle);
    }
  }, [customCSS]);

  const handleExportPDF = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'CV',
    onBeforePrint: () => {
      console.log('Preparando PDF...');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      console.log('PDF generado');
      return Promise.resolve();
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
        /* Eliminar encabezados y pies de página */
        @top-left {
          content: none;
        }
        @top-center {
          content: none;
        }
        @top-right {
          content: none;
        }
        @bottom-left {
          content: none;
        }
        @bottom-center {
          content: none;
        }
        @bottom-right {
          content: none;
        }
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page-break {
          page-break-before: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
        .markdown-preview {
          padding: 0;
          margin: 0;
          box-shadow: none;
        }
      }
    `
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Editor de CV en Markdown</h1>
        <p>Escribe tu CV en markdown y previsualízalo con separación de páginas</p>
      </header>
      
      <div className="main-container">
        <div className="editor-section">
          <div className="section-header">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'markdown' ? 'active' : ''}`}
                onClick={() => setActiveTab('markdown')}
              >
                📝 Markdown
              </button>
              <button 
                className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                🎨 CSS
              </button>
            </div>
            <button onClick={() => handleExportPDF()} className="export-btn">
              📄 Exportar PDF
            </button>
          </div>
          
          {activeTab === 'markdown' && (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="markdown-editor"
              placeholder="Escribe tu markdown aquí..."
            />
          )}
          
          {activeTab === 'css' && (
            <textarea
              value={customCSS}
              onChange={(e) => setCustomCSS(e.target.value)}
              className="css-editor"
              placeholder="Escribe tus estilos CSS aquí..."
            />
          )}
        </div>
        
        <div className="preview-section">
          <div className="section-header">
            <h2>Vista Previa</h2>
            <span className="page-indicator">A4 - Separación de páginas visible</span>
          </div>
          <div className="preview-container">
            <div ref={printRef} id="markdown-preview" className="markdown-preview">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;