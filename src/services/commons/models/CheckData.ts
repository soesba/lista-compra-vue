export default interface CheckData {
  total: number;
  totalFallas: number;
  fallas: [{
    id: string;
    nombre: string;
    mensaje: string;
  }];
}