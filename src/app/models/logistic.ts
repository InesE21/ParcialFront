export interface TransportI {
    id?: number;
    transportation: 'PLANE' | 'TRUCK' | 'MOTORBIKE'; // Usamos un tipo de unión para los valores fijos
    capacity: number;
}

export interface RouteI {
    id?: number;
    origin: string;
    destination: string;
    stops?: string | null; // "stops" es opcional ya que puede ser null
    transports: TransportI[]; // Relación de muchos a muchos representada como un array de Transport
}
  
export interface ServicelI {
    transportation: 'EXPRESS' | 'NORMAL'; // Usamos un tipo de unión para los valores fijos
    cost: number;
}
  
  