type DateCustomType = {
    seconds: number,
    nanoseconds: number
}

export type SoalType = {
    id: string
    soal: string
    image?: string
    a: string
    b: string
    c: string
    d: string
    benar: string
};
export type GamesType = {
    id: number
    title: string
    soals: SoalType[]
};

export const emptGames: GamesType = {
    id: 0,
    title: "",
    soals: [],
}