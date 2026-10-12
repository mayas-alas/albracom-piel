# Albracom

Una landing sencilla para acompañar la compra: **para quién → qué necesita → conversar por WhatsApp**. Sin tienda, registros ni datos de salud.

## ¿Cómo se actualiza la web?

Al guardar cambios en `main`, Cloudflare vuelve a preparar la landing y actualiza **[albracompiel.com](https://albracompiel.com)**. El dominio y `www` siguen atendidos por el Worker.

GitHub Actions también construye una imagen con `Containerfile`, comprueba que funcione y la guarda en `ghcr.io/mayas-alas/albracom-piel`. Si Pages está habilitado, publica además una copia en GitHub Pages. Pages muestra archivos: no ejecuta la imagen.

**La copia de GitHub Pages es pública y no tiene el bloqueo por país de Cloudflare.** No sustituye el dominio de producción. GitHub puede exigir un plan compatible para publicar Pages desde un repositorio privado; no cambiar la privacidad para activarlo.

**Estado de Pages:** el plan actual no lo permite para este repo privado. El flujo está preparado, pero la publicación en Pages permanece desactivada.

## Cambiar el contacto

El número no se escribe en los archivos del proyecto. Se configura como `WHATSAPP_PHONE`, con código de país y sin `+` ni espacios, en dos lugares:

- **Cloudflare:** configuración del Worker → Builds → variable de construcción.
- **GitHub:** Settings → Secrets and variables → Actions → secreto `WHATSAPP_PHONE`.

Después de cambiarlo, hay que volver a publicar. No hace falta editar la landing. El enlace que abre WhatsApp siempre revela el número al visitante; esta configuración lo mantiene fuera del código, no lo oculta en la web.

## Protección de producción

Cloudflare conserva el plan Free, el bloqueo de IPs fuera de México, la protección DDoS y la redirección a HTTPS. Las URLs alternativas de Workers y preview están cerradas. Para quitar el bloqueo: Security → Security rules → “Solo Mexico” → Disabled.

## Probar en tu equipo

1. Copia `.env.example` a `.env` y completa el contacto. No subas `.env`.
2. Ejecuta `npm ci` y `npm run dev`.
3. Prueba las nueve combinaciones y revisa el mensaje antes de enviar. `npm test` comprueba los recorridos y la preparación de archivos.

La referencia del visitante solo reconoce ese navegador. No identifica a una persona ni funciona entre dispositivos. Las ilustraciones fueron creadas con IA; no son fotografías del producto ni avales médicos.

## Imagen y Pages

Con Docker disponible y el contacto en tu entorno:

```sh
docker build --file Containerfile --secret id=whatsapp_phone,env=WHATSAPP_PHONE --tag albracom .
docker run --rm -p 8080:8080 albracom
```

Pages se activa en Settings → Pages → GitHub Actions y con la variable de Actions `PAGES_ENABLED=true`. Si el plan no lo permite, la imagen se sigue construyendo y el Worker sigue publicando normalmente.

El historial se reescribió para retirar el contacto de las ramas. Los clones anteriores deben descargarse de nuevo. GitHub puede conservar copias antiguas en cachés, registros de publicaciones o referencias internas; eliminarlas por completo puede requerir soporte de GitHub.
