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
    img?: string;
    sel?: boolean;
}

export interface Partitura {
    id?: string;
    nombre: string;
    categoria: string;
    url: string;
}

export interface Categoria {
    id?: string;
    nombre: string;
}