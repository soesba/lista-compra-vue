import { format } from 'date-fns'
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

export const getBase64FromImageUrl = async (url: string) => {
  return await fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise(callback => {
      let reader = new FileReader();
      reader.onload = function () { callback(this.result) };
      reader.readAsDataURL(blob);
    }));
}

export const getImageTypeFromContent = (content: string): string => {
  if (content.startsWith('data:image/jpeg;base64,')) {
    const base64 = content.replace('data:', '')
    return base64.split(';base64,')[0]
  }
  return ''
}

export const pluralize = (cadena: string, valor: number | null) => {
  if (!cadena || (valor && valor < 2)) {
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

export const capitalize = (cadena: string) => {
  if (!cadena) return cadena
  return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase()
}

export const sort = (property: any) => {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  const arrayProperties = (<string>property).split('.')
  return function (a: any, b: any) {
    /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
    if (arrayProperties.length > 1) {
      for (let i = 0; i < arrayProperties.length - 1; i++) {
        a = a[arrayProperties[i]]
        b = b[arrayProperties[i]]
      }
      property = arrayProperties[arrayProperties.length - 1]
    }
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}

export const formatCurrency = (value: number, currency = true) => {
  const result = value ? value.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  return currency && result ? result.concat(' €') : result
}

export const stringToNumber = (value: string): number => {
  const result = parseFloat(value.replace('.', '').replace(',', '.'))
  return isNaN(result) ? 0 : result
}

export const dateToBack = (value: string): string => {
  return value ? format(new Date(value), 'yyyy-MM-dd') : ''
}

export const dateToFront = (value: Date): string => {
  return value ? format(new Date(value), 'dd/MM/yyyy') : ''
}

export const DateToString = (date: Date): string => {
  if (date) {
    date = new Date(date)
  } else {
    return ''
  }
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const StringToDate = (dateStr: string): Date => {
  const parts = dateStr.split('-')
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)
  return new Date(year, month, day)
}

export const isNumber = (str: string) => {
  const pattern = /^\d+\.?\d*$/
  return pattern.test(str) // returns a boolean
}

export const isValidHttpUrl = (data: string) => {
  let url
  try {
    url = new URL(data)
  } catch (_) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}
