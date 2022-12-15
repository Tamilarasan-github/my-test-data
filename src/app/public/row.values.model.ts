export interface RowValues{
    id: number,
    keyAndValue: KeyAndValue[]
}

export interface KeyAndValue{
    columnName: string,
    columnValue: string 
}