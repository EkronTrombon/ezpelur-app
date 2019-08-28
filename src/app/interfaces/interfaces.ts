export interface Actuacion {
    _id?: string;
    fecha: Date;
    lugar: string;
    tipo: string;
    contratacion: string;
    notas: string;
    musicos: string[];
    realizada: boolean;
}

export interface Usuario {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    tfno: string;
    instrumento: string;
    instrumentoSec: string;
    sel?: boolean;
}