// ¿Se puede guardar en el navegador? (falla en modo privado o con el almacenamiento bloqueado)
export function storageAvailable() {
  try {
    const k = '__test__'
    localStorage.setItem(k, '1')
    localStorage.removeItem(k)
    return true
  } catch {
    return false
  }
}
