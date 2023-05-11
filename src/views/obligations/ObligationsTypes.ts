export interface Obligation {
    id?: number,
    name: string,
    description: string,
    paymentDate: string,
    dateEnd: string | Date,
}

export interface CreateObligationFields {
    name: string,
    description: string,
    paymentDate: string,
    dateEnd: string | Date,
}
