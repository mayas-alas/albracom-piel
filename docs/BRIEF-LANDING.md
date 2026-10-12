# Brief de la landing — propuesta pendiente de aprobación

## Objetivo

Convertir interés de familiares/cuidadores en una compra informada o conversación comercial. No construir una app ni reemplazar Tiendanube. La persona mayor es protagonista del bienestar; el cuidador es audiencia del mensaje de compra.

## Narrativa y estructura

1. **Hero:** “Confort cotidiano para quien cuidas”. Explicar en una frase que se trata de zaleas de borrego naturales y permitir entender el producto sin conocer la palabra “zalea”. CTA principal propuesto: “Consultar por WhatsApp”; secundario: “Ver producto y precio”. Validar el orden por canal y capacidad de atención.
2. **Producto y contexto:** foto real, material confirmado y escenario de descanso. No ilustrar contacto con heridas ni prometer idoneidad para todos los casos.
3. **Elegir con claridad:** medidas y variación natural, qué incluye, precio vigente y condiciones de envío. No hardcodear el precio observado sin confirmación.
4. **Confort sin exageraciones:** cualidades materiales verificadas. No “previene escaras”, “sin dolor”, “24 horas de protección” o “clínicamente probado”.
5. **Uso y mantenimiento:** instrucciones del fabricante, restricciones y límites aprobados; no inventar temperatura de lavado o desinfección.
6. **Origen y calidad:** proceso y trazabilidad demostrables; distinguir hechos de filosofía de marca.
7. **FAQ:** qué es una zalea; diferencias entre modelos; medidas; limpieza; entrega; devoluciones; cuándo consultar con un profesional.
8. **Cierre comercial:** CTA a producto/WhatsApp, horarios confirmados y nota de no sustitución de atención profesional.
9. **Footer:** contacto, aviso de privacidad y políticas oficiales; no inventar razón social ni documentos legales.

## Dirección visual

Marca cálida, moderna y sobria. Fotografías autorizadas del producto y del cuidado cotidiano; personas mayores con agencia, no escenas de miedo o culpabilización. Tipografía legible, alto contraste, buena experiencia móvil y CTAs fáciles de usar. La apariencia de clínica o sello médico no debe sugerir una certificación inexistente.

## Integraciones existentes observadas

- Compra: https://albracompiel.mitiendanube.com/productos/zalea-o-piel-de-borrego/
- WhatsApp publicado: https://wa.me/SET_IN_WHATSAPP_PHONE

Confirmar ambos con el propietario. Usar HTTPS en enlaces. El texto prellenado debe ser comercial y genérico, sin diagnósticos ni datos de salud.

## Arquitectura técnica propuesta

Landing estática y ligera, HTML semántico y JS mínimo. No se necesita React por defecto aunque la preview actual lo utilice. Elegir stack y configuración de Workers Static Assets después de revisar el Worker vigente; el repo vacío no contiene el fuente de la preview.

No requiere base de datos, autenticación, endpoints clínicos ni API propia de pagos. Una primera versión puede evitar formulario y enviar al canal existente. Analítica solo con consentimiento/configuración adecuados; no copiar cookies de la tienda.

## Criterios de aceptación

- En pocos segundos se entiende qué se vende, para quién y cómo consultar/comprar.
- Precio, material, medidas, limpieza y logística coinciden con la ficha oficial aprobada.
- No hay claims médicos sin respaldo específico ni testimonios ficticios.
- CTA funcional en móvil y escritorio; clic externo distinguido de compra en medición.
- Navegable con teclado; foco visible; jerarquía de headings, alt pertinente y contraste WCAG AA.
- SEO: title/description coherentes, URL canonical absoluta una vez confirmado dominio, Open Graph real.
- Revisar rendimiento móvil con Lighthouse; acordar presupuesto de imágenes y JS, no afirmar resultados sin medir.
- Preview separada y revisada antes de tocar rutas/DNS de producción.

## Dependencias de publicación

Aprobación del posicionamiento, documentos del producto, fotografías y permisos, precio/logística, política de privacidad, revisión de claims, URLs oficiales y estado técnico de Cloudflare.
