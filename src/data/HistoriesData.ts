import { gamesTitleData } from "./GamesTitleData";
import auth from '@react-native-firebase/auth'

export const HistoriesData = {
    idUser: auth().currentUser?.uid!,
    histories: [
        {
            id:1,
            idGame: gamesTitleData.BABI,
            idUser: auth().currentUser?.uid!,
            status: 1,
            score: 0
        },
        {
            id:2,
            idGame: gamesTitleData.BABII,
            idUser: auth().currentUser?.uid!,
            status: 0,
            score: 0
        },
        {
            id:3,

            idGame: gamesTitleData.BABIII,
            idUser: auth().currentUser?.uid!,
            status: 0,
            score: 0
        },
        {
            id:4,

            idGame: gamesTitleData.BABIV,
            idUser: auth().currentUser?.uid!,
            status: 0,
            score: 0
        },
        {
            id:5,

            idGame: gamesTitleData.BABV,
            idUser: auth().currentUser?.uid!,
            status: 0,
            score: 0
        },
        {
            id:6,
            idGame: gamesTitleData.BABVI,
            idUser: auth().currentUser?.uid!,
            status: 0,
            score: 0
        },
    ]
}