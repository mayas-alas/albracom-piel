export const ROLES = Object.freeze({
  familiar: { label: 'Cuido a un familiar', message: 'Soy familiar de una persona mayor y busco confort para su descanso.' },
  cuidador: { label: 'Soy cuidador/a', message: 'Soy cuidador/a de una persona mayor y busco opciones de confort para su cuidado cotidiano.' },
  personal: { label: 'Es para mí', message: 'Busco una opción de confort para mi propio descanso.' },
});
export const NEEDS = Object.freeze({
  cama: { label: 'Descanso en cama', product: 'Zalea de borrego', message: 'Mi necesidad es añadir comodidad al descanso en cama. Me interesa conocer la zalea de borrego.' },
  sillon: { label: 'Comodidad al sentarse', product: 'Zalea de borrego', message: 'Mi necesidad es añadir comodidad al sentarse en un sillón. Quiero saber si una zalea de borrego es adecuada para este uso.' },
  talones: { label: 'Confort para los talones', product: 'Tapete para talones', message: 'Mi necesidad es confort en la zona de los talones durante el descanso. Quiero información del tapete para talones.' },
});

export function createContact({ role, need, visitorId, returning = false, phone }) {
  if (!Object.hasOwn(ROLES, role) || !Object.hasOwn(NEEDS, need)) throw new Error('Elige un perfil y una necesidad válidos.');
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(visitorId)) throw new Error('Referencia inválida.');
  if (typeof phone !== 'string' || !/^[1-9]\d{7,14}$/.test(phone)) throw new Error('Contacto no configurado.');
  const path = `${role}.${need}.${visitorId}`;
  const text = [
    'Hola, Albracom 👋',
    ROLES[role].message,
    NEEDS[need].message,
    '¿Me ayudan con medidas, mantenimiento, precio y opciones de entrega?',
    `${returning ? 'Vuelvo a consultar' : 'Primera visita'} · Referencia: ${path}`,
  ].join('\n\n');
  const url = new URL('https://api.whatsapp.com/send');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', text);
  return { text, url: url.href, path };
}

export function recognizeVisitor(storage, generateId = () => crypto.randomUUID()) {
  const key = 'albracom.visitor';
  const valid = value => typeof value === 'string' && /^[a-zA-Z0-9-]{8,64}$/.test(value);
  try {
    const previous = storage.getItem(key);
    if (valid(previous)) return { visitorId: previous, returning: true };
    const visitorId = generateId();
    storage.setItem(key, visitorId);
    return { visitorId, returning: false };
  } catch {
    return { visitorId: generateId(), returning: false };
  }
}
