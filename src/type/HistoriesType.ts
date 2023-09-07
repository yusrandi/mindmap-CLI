export type HistoriesType = {
    id: number,
    idGame: string,
    idUser: string,
    score: number,
    status: number
}
export type HistoriesResponseType = {
    idGame: string,
    histories: HistoriesType[],
}
