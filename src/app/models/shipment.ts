import { CustomerI } from './person'
import { ServicelI } from './logistic'
import { EmployeeI } from './person'
import { BranchI } from './branch';

export interface CorrespondenceI {
    code: string;
    correspondenceType: string;
    weight: number;
    dimensions: string;
    shipmentDate: Date;
    deliveryDate: Date;
    sender: CustomerI;
    receiver: CustomerI;
    service: ServicelI;
}

// Función para generar código de seguimiento
export function generateTrackingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export interface ShippingI {
    status: 'AT ORIGIN' | 'AT DESTINATION' | 'ON THE WAY' | 'DELIVERED';  // Estado del envío
    dateTime: Date;  // Fecha y hora del envío
    correspondence: CorrespondenceI;  // Referencia a la correspondencia
    branch: BranchI;  // Sucursal asociada
    employee: EmployeeI;  // Empleado asociado
}

export interface IncidentI {
    description: string;  // Descripción del incidente
    incidentDate: Date;  // Fecha del incidente
    resolutionStatus: 'REPORTED' | 'SCALED' | 'IN RESOLUTION' | 'RESOLVED' | 'CLOSED';  // Estado de resolución del incidente
    correspondence: CorrespondenceI;  // Correspondencia relacionada
}


