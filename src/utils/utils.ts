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
			for(let i = 0; i < arrayProperties.length - 1; i++) {
				a = a[arrayProperties[i]]
				b = b[arrayProperties[i]]        
			}
			property = arrayProperties[arrayProperties.length-1]
		} 
		const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
		return result * sortOrder
	}
}

export const formatDecimal = (value: number, currency = true) => {
	const result = value ? value.toLocaleString('es-ES', {minimumFractionDigits: 2}).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : ''
	return currency && result ? result.concat(' €') : result
}
