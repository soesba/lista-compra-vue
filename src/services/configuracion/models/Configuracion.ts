export default interface Configuracion {
    id: string;
    categoria: string;
    nombre: string;
    texto?: string;
    valores: Array<any>;
    valorDefecto: string;
}
