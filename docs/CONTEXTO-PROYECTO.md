# Contexto del proyecto

## Mandato y límites

El usuario solicita una reestructura 360 con mentalidad de startup seed para un negocio de pieles/zaleas de borrego destinado al bienestar de personas mayores. La audiencia comercial principal son quienes las cuidan, generalmente personas más jóvenes. Se requiere primero auditar el negocio, crear el repo local, subir el contexto al repo existente y revisar Cloudflare y el sitio legacy. Por ahora se busca únicamente una landing.

“Seed” se interpreta como etapa de validación y foco, **no como financiamiento recibido ni prueba de que el negocio sea invertible**.

## Hechos y procedencia

| Dato | Estado |
| --- | --- |
| Preview: https://albracom-piel.vibepreview.com/ | Accesible; contenido leído en navegador y metadatos por HTTP |
| Tienda: https://albracompiel.mitiendanube.com/ | Accesible; checkout y WhatsApp existentes |
| Repo privado: mayas-alas/albracom-piel | Existente y vacío al iniciar; confirmado con GitHub CLI |
| Carpeta local | Vacía al iniciar; sin código fuente legacy |
| Worker albracom-piel | Conectado al repo; último build observado falló al obtener repositorio |
| Dominio albracompiel.com | Referenciado por ruta Cloudflare; lectura HTTP/HTTPS falló; contenido no auditado |
| Comprador principalmente cuidador/familiar | Brief del usuario; aún sin datos de pedidos para cuantificar |
| Producto natural, origen en rastros certificados, tratamiento terapéutico | Afirmaciones del vendedor; no verificadas documentalmente |

## Dirección propuesta, aún no aprobada

- Categoría: bienestar y confort para el cuidado en casa de personas mayores.
- Posicionamiento: marca de producto físico y acompañamiento de compra; no healthtech clínica ni proveedor de atención médica.
- Promesa comercial: claridad para quien cuida, confort para quien usa.
- Oferta inicial: zalea de uso cotidiano con medidas, material, mantenimiento, envío y límites transparentes.
- Funnel: landing → orientación por WhatsApp o ficha en Tiendanube → compra → seguimiento comercial/guía de cuidado del producto.
- Mercado inicial probable: México, por moneda MXN y contacto +52. Confirmar cobertura real.

## Fuera de alcance

Aplicación, marketplace, suscripciones, diagnóstico, telemedicina, datos de salud, automatización clínica, nuevo sistema de pagos y expansión a muchos segmentos a la vez.

## Preguntas al propietario antes del diseño final

1. ¿Quiénes compraron las últimas 30–50 piezas y para qué uso? Solicitar agregados anónimos, no expedientes.
2. ¿Qué SKU está realmente destinado al cuidado? ¿Es distinto del decorativo en curtido, lana y lavabilidad?
3. ¿Qué documentación existe de composición, sustancias del curtido, pruebas, certificaciones y seguridad?
4. ¿Cuáles son dimensiones mínimas/máximas, altura y densidad de lana, tolerancias y vida útil comprobada?
5. ¿Cuál es el protocolo real de limpieza, secado y uso? ¿Qué restricciones existen para humedad, incontinencia o irritación?
6. ¿Cuánto cuestan fabricación/compra, empaque, envío, devoluciones, pasarela y atención por pedido?
7. ¿Precio vigente, inventario, capacidad mensual, plazos y política de cambios/devoluciones?
8. ¿Se mantiene la marca Albracom Piel? ¿Quién aprueba copy, fotos, regulación y lanzamiento?
9. ¿La URL legacy correcta es albracompiel.com, www u otra? ¿El Worker sirve la web o actúa como proxy?
10. ¿WhatsApp y Tiendanube observados son los canales oficiales? ¿Hay horarios y responsable de respuesta?

## Secuencia recomendada

Auditoría → validación con propietario y compradores → documentación del producto/claims → diseño y copy → implementación mínima → preview aislada → aprobación → publicación y medición.
