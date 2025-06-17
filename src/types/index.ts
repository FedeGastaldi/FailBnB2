export type CardProps = {
  popular: boolean;
  titulo: string;
  calificacion: number;
  imagen: string;
  precio: number;
  camas: number;
  banios: number;
};
export type PropiedadFromDB = {
  id: number;
  titulo: string;
  descripcion?: string;
  precio_noche: number;
  cant_habitaciones: number;
  cant_banios: number;
};
