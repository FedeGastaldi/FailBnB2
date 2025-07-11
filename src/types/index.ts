export type CardProps = {
  id: number;
  popular: boolean;
  titulo: string;
  calificacion: number;
  imagen: string;
  precio: number;
  camas: number;
  banios: number;
  ubicacion: string;
};

export type PropiedadFromDB = {
  id: number;
  titulo: string;
  descripcion?: string;
  precio_noche: number;
  cant_habitaciones: number;
  cant_banios: number;
  ubicacion: string;
  portada: string;
};
export type NuevaPropiedadPayload = Omit<PropiedadFromDB, "id"> & {
  descripcion?: string;
  direccion: string;
  cant_habitaciones: number;
  cant_baños: number;
  capacidad_max: number;
  precio_noche: number;
  id_usuario: number;
  imagenes: string[];
  fecha_inicio_disponibilidad: string; //yy-MM-dd
  fecha_fin_disponibilidad: string; //yy-MM-dd
};
export type HeroProps = {
  imgSrc?: string;
};
