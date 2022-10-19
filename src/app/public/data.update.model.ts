export interface DataUpdate{
    id: number,
    values: UpdatedValues[]
}

export interface UpdatedValues{
    columnName: string,
    columnValue: string 
}