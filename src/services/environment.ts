declare const config: any

/**
 * Devuelve la variable de entorno correspondiente
 * @param key nombre de la variable
 */
const getEnvVariable = (key: string): string => {
	return typeof config !== 'undefined' ? config[key] : process.env[key]
}

/**
 * Devuelve todas las variables de entorno en un objeto
 */
const getEnv = (): Record<string, string> => {
	return typeof config !== 'undefined' ? config : process.env
}

export default { getEnvVariable, getEnv }
