export default interface CheckDataDTO {
  total: number;
  totalFallas: number;
  fallas: [{
    id: string;
    nombre: string;
    mensaje: string;
  }];
}