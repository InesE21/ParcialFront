import { BranchI } from './branch';  // Asegúrate de tener un modelo para 'Branch'
import { RouteI } from './logistic';    // Asegúrate de tener un modelo para 'Route'

export interface CustomerI {
    id?: number;
    dni: number;                   // Número único de identificación
    fullname: string;              // Nombre completo
    address: string;               // Dirección del cliente
    phoneNumber: string;           // Número de teléfono (debe ser único)
    mail: string;                  // Dirección de correo electrónico (debe ser única)
    customer_type: 'NORMAL' | 'PREMIUM';  // Tipo de cliente: normal o premium
}
  
export interface EmployeeI {
    id?: number;
    fullname: string;                       // Nombre completo del empleado
    position: 'MANAGER' | 'ADVISOR' | 'DISTRIBUTOR' | 'SUPERVISOR';  // Posición del empleado
    branch: BranchI;                         // ForeignKey a la sucursal (Branch)
    assignedRoute?: RouteI | null;           // ForeignKey a la ruta (Assigned Route) solo si es distribuidor
}

