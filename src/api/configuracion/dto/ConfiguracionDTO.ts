export default interface ConfiguracionDTO {
    id: string;
    categoria: string;
    nombre: string;
    texto?: string;
    valores: Array<any>;
    valorDefecto: string;
}