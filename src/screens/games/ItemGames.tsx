import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routers/RootNavigator'
import { GamesType, SoalType } from '../../type/GamesType'
import LinearGradient from 'react-native-linear-gradient'
import Font from '../../constants/Font'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import { gamesCollection, historiesCollection } from '../../config/firebase'
import auth from '@react-native-firebase/auth'
import { HistoriesType } from '../../type/HistoriesType'
import { getDataHistory } from './DataHistory'
import { toDecimal, toVulgar } from 'vulgar-fractions';


interface props {
    navigation: NativeStackNavigationProp<RootStackParamList, "gamesMenu">
    history: HistoriesType
}
export default function ItemGames({ navigation, history }: props) {
    const listColor = [['#F5F7FA', '#B8C6DB'], ['#FFDD00', '#FBB034'], ['#5AFF15', '#00B712']]
    const [game, setGame] = useState<GamesType>()
    // declare the function 
    const shuffle = (array: SoalType[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        console.log(history.idGame);
        gamesCollection
            .doc(history.idGame)
            .get()
            .then((snapshot) => {
                // console.log(snapshot.data());
                const game: GamesType = snapshot.data() as GamesType
                setGame(game)

            })
    }, [])

    return (
        <TouchableOpacity
            onPress={() => {
                if (history.status === 1) {
                    navigation.navigate('games', {
                        // game: game!,
                        // soals: shuffle(game!.soals)
                        idGame: history.idGame
                    })
                }
            }}
            style={{
                flex: 1,
                flexDirection: 'column',
            }}>
            <LinearGradient colors={listColor[history.status]} style={{ paddingVertical: Spacing * 2, marginTop: Spacing * 2, marginRight: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing * 2 }}>
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, flex: 1 }}>
                        {history.idGame}
                    </Text>
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large }}>
                        {history?.score! * 10}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}