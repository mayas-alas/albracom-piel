# Infraestructura — observaciones de la revisión inicial

## GitHub y carpeta local

- Repo existente: https://github.com/mayas-alas/albracom-piel, privado.
- GitHub CLI confirmó `isEmpty: true` y ausencia de rama por defecto con commits al iniciar.
- Carpeta de trabajo: `C:\Users\mayas\albracom\albracom-piel`, vacía al inicio.
- Se clonó el repo vacío en esa carpeta. Este entregable agrega documentación; no reconstruye el fuente a partir del bundle compilado.
- Subir la auditoría en rama documental evita introducir una implementación incompleta en `main`, configurada en Cloudflare. No añadir Wrangler solo para lograr un deploy vacío.

## Cloudflare observado en navegador autenticado

| Campo | Observación |
| --- | --- |
| Servicio | albracom-piel, Production |
| Repo conectado | mayas-alas/albracom-piel |
| Rama del build fallido | main |
| Build command | None |
| Deploy command | npx wrangler deploy |
| Root directory | / |
| Último build inspeccionado | af003a01-5ad0-4b1b-8d05-f453c8a760f9 |
| Error visible | Failed: error occurred while fetching repository |
| Última versión manual activa observada | f7eff863, 100%, Ready |
| Versión manual anterior | 5035327a, Ready |
| Ruta | *.albracompiel.com/* |
| workers.dev | Disabled |
| Custom domains | Ninguno visible |
| Logs / Traces | Disabled |
| Bindings | 0 visibles |

El fallo ocurre en **Cloning**, antes de instalar o ejecutar Wrangler. Un repo vacío/sin `main` es una explicación probable, no una causa demostrada; también hay que revisar acceso de la integración si persiste tras existir la rama.

Que una versión manual esté `Ready` no prueba que sirva la landing ni que el dominio funcione. No se inspeccionó su código. La ruta wildcard y ausencia de custom domain no demuestran cobertura del dominio raíz: verificar explícitamente apex y www, DNS y origen/proxy antes de publicar.

## Estado de los sitios

- Preview Vibe: accesible; aplicación cliente React 18 con assets compilados. Esto no prueba que esté conectada al repo GitHub ni al Worker.
- Legacy comercial Tiendanube: accesible por HTTPS; compra y contacto existentes, contenido revisado.
- `https://albracompiel.com`, `https://www.albracompiel.com` y `http://albracompiel.com`: errores de transporte desde la herramienta HTTP. No se atribuyen a DNS/TLS/Worker sin diagnóstico adicional; el contenido de ese dominio no quedó auditado.

## Checklist de implementación futura

1. Confirmar qué hace el Worker actual y qué dominio sirve realmente la web legacy.
2. Crear `main` con implementación y configuración de deploy aprobadas cuando corresponda; mantener auditoría aparte por ahora.
3. Elegir Workers Static Assets si se sirve landing estática; definir directorio, nombre y compatibilidad sin sobrescribir comportamiento desconocido.
4. Probar build y dry-run local; crear preview aislada.
5. Validar permisos de GitHub/Cloudflare si continúa el error de obtención del repo.
6. Revisar historial/logs del nuevo build y comprobar contenido servido, HTTPS, apex/www, enlaces y rollback.
7. Solo entonces acordar cambios de ruta/DNS y publicación de la landing final.

No se modificaron configuración Cloudflare, tokens, DNS, Worker, tienda ni checkout en esta fase. No se declara el deploy reparado.
