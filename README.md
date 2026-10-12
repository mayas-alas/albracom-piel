# Albracom

Landing de venta asistida para confort de personas mayores. Sin tienda, decoración, formularios ni app.

**Tres acciones:** elegir perfil → elegir necesidad → abrir WhatsApp. Nueve recorridos (3 × 3), con mensaje editable, contexto y referencia anónima por navegador. El cliente pulsa Enviar dentro de WhatsApp; la web no envía automáticamente.

## Ejecutar

```sh
npm ci
npm run dev
npm test
npm run deploy
```

Cloudflare conecta `mayas-alas/albracom-piel`, rama `main`, comando `npx wrangler deploy`, sin build. `wrangler.jsonc` publica `public/` como Static Assets del Worker `albracom-piel`. No requiere secretos en GitHub ni backend. Comprobar el build después de cada push.

## Dominio y protección Free

- Producción: https://albracompiel.com/ (también `www`). Custom Domains conectados al Worker desde Cloudflare; DNS/certificados administrados allí, sin servidor de origen.
- Regla WAF activa `Albracom - Solo Mexico`, acción Block: `(http.host in {"albracompiel.com" "www.albracompiel.com"} and ip.src.country ne "MX")`. Incluye IPs desconocidas y rastreadores extranjeros; usa geolocalización de IP, no nacionalidad.
- Plan Free, 1/5 reglas personalizadas. DDoS automático activo y Always Use HTTPS habilitado (HTTP → HTTPS 301); sin upgrades ni servicios de pago.
- `workers_dev` y `preview_urls` desactivados en configuración para no exponer una URL alternativa sin la regla de la zona.
- Reversión del bloqueo: Security → Security rules → Solo Mexico → Disabled. No se requiere cambiar el código.

## Contexto mínimo

El comprador suele ser familiar o cuidador, no necesariamente la persona mayor. Las necesidades cama/sillón/talones orientan una conversación, no un diagnóstico o una prescripción. Solo se nombran los productos no decorativos confirmados por research: zalea y tapete para talones; no se inventa un tercer SKU.

WhatsApp GET: `https://api.whatsapp.com/send?phone=SET_IN_WHATSAPP_PHONE&text=…`. La referencia UUID se guarda en localStorage para reconocer un navegador que regresa, no identificar a una persona. Sin almacenamiento disponible, funciona con referencia temporal. No se guardan ni transmiten selecciones hasta que el usuario abre WhatsApp. Borrar los datos del sitio cambia la referencia; no hay reconocimiento entre dispositivos ni registro central.

Imágenes: ilustraciones SVG originales creadas con IA para este caso de uso; no son fotografías del producto ni evidencia de resultados. Sin dependencias gráficas externas. Los textos de confort no prometen tratar o prevenir lesiones.

Prueba manual: elegir cada combinación de perfil y necesidad, revisar el mensaje visible y comprobar número/texto en el enlace sin enviar. Cambiar una respuesta invalida el contexto anterior.

Verificado localmente: 12 tests unitarios y los 9 recorridos en navegador a 1440px y 390px, incluyendo apertura GET interceptada sin enviar mensajes, regreso, cambio de respuestas, CSP y 404. `wrangler deploy --dry-run` correcto; `npm audit` sin vulnerabilidades al instalar.

Verificado en dominio: HTTPS 200 para raíz/www desde IP geolocalizada MX, los 9 recorridos en escritorio/móvil y URL `workers.dev` cerrada (404). DNS público ya publicado; cachés negativos anteriores pueden tardar en actualizar. La regla geográfica está activa y validada por Cloudflare; no se realizó una solicitud real desde otro país.
