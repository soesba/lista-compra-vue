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

export const pluralize = (cadena: string, valor: number | null) => {
  if (!valor || valor < 2) {
    return cadena
  }
  if (cadena === 'unidad') {
    return 'unidades'
  }
  const vocales = ['u', 'e', 'o', 'a', 'i']
  const ultimoCaracter = cadena.charAt(cadena.length - 1)
  if (vocales.includes(ultimoCaracter)) {
    return cadena.concat('s')
  }
  return cadena.concat('as')
}