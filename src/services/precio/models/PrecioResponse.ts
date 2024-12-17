import type Precio from "./Precio.js"

export default interface PrecioResponse {
	respuesta: number;
	data: Precio | Precio[];
}
