/**
 * Conversión de ficheros a base64 para su posterior subida
 * @param file Fichero seleccionado desde un input file
 * @returns Promesa con el fichero en base64
 */
export const fileToBase64 = (file: any): any => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})