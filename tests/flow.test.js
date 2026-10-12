import test from 'node:test';
import assert from 'node:assert/strict';
import { PHONE, ROLES, NEEDS, createContact, recognizeVisitor } from '../public/flow.js';

const visitorId = '53c8d80e-5baf-40d6-b592-f11ed872e2c9';
for (const role of Object.keys(ROLES)) {
  for (const need of Object.keys(NEEDS)) {
    test(`Recorrido ${role} → ${need} → WhatsApp`, () => {
      const contact = createContact({ role, need, visitorId });
      const url = new URL(contact.url);
      assert.equal(url.origin, 'https://api.whatsapp.com');
      assert.equal(url.pathname, '/send');
      assert.equal(url.searchParams.get('phone'), PHONE);
      assert.equal(url.searchParams.get('text'), contact.text);
      assert.ok(contact.text.includes(ROLES[role].message));
      assert.ok(contact.text.includes(NEEDS[need].message));
      assert.ok(contact.text.includes(`${role}.${need}.${visitorId}`));
      assert.ok(contact.text.includes('Primera visita'));
    });
  }
}
test('Regreso conserva referencia, sin guardar respuestas', () => {
  const data = new Map();
  const storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value) };
  assert.deepEqual(recognizeVisitor(storage, () => visitorId), { visitorId, returning: false });
  assert.deepEqual(recognizeVisitor(storage), { visitorId, returning: true });
  assert.equal(data.size, 1);
  assert.ok(createContact({ role: 'personal', need: 'talones', visitorId, returning: true }).text.includes('Vuelvo a consultar'));
});
test('Storage bloqueado y valor corrupto no bloquean la compra', () => {
  assert.equal(recognizeVisitor(null, () => visitorId).visitorId, visitorId);
  assert.equal(recognizeVisitor({ getItem() { throw Error('blocked'); } }, () => visitorId).returning, false);
  assert.equal(recognizeVisitor({ getItem: () => '<script>', setItem() {} }, () => visitorId).visitorId, visitorId);
});
test('No permite contextos incompletos o claves heredadas', () => {
  for (const role of ['', null, 'constructor', '__proto__']) {
    assert.throws(() => createContact({ role, need: 'cama', visitorId }));
  }
  assert.throws(() => createContact({ role: 'familiar', need: '', visitorId }));
  assert.throws(() => createContact({ role: 'familiar', need: 'cama', visitorId: 'invalido!' }));
});
