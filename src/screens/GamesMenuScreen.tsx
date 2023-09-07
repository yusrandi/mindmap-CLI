import { View, Text, useWindowDimensions, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../routers/RootNavigator'
import { GamesType, SoalType } from '../type/GamesType';
import { gamesCollection, historiesCollection } from '../config/firebase';
import { BackBack, BgRed, IconBack, IconNext, IconReset } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../constants/Spacing';
import LinearGradient from 'react-native-linear-gradient';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import { gamesData } from '../data/GamesData';
import auth from '@react-native-firebase/auth'
import ItemGames from './games/ItemGames';
import { HistoriesResponseType, HistoriesType } from '../type/HistoriesType';
import { HistoriesData } from '../data/HistoriesData';
import { gamesTitleData } from '../data/GamesTitleData';


export default function GamesMenuScreen({ navigation }: RootStackScreenProps<"gamesMenu">) {
    const { width, height } = useWindowDimensions()
    const itemWidth = (width - 15) / 2;

    const [loading, setLoading] = useState<boolean>(true)
    const [userHistories, setUserHistories] = useState<HistoriesType[]>([])
    const [avail, setAvail] = useState<boolean>(false)

    useEffect(() => {
        getDataHistories()
        // resetHistories()
        // createDataSoal()
    }, [])


    async function getDataHistories() {
        setUserHistories([])

        historiesCollection
            .doc(auth().currentUser?.uid)
            .collection("histories")
            .onSnapshot((snapshot) => {
                setUserHistories([])
                // console.log(snapshot.docs)
                snapshot.docs.forEach((data) => {
                    // console.log({ data });
                    const historyType: HistoriesType = data.data() as HistoriesType
                    if (historyType.idGame === gamesTitleData.BABVI && historyType.status === 2) {
                        setAvail(true)
                    }
                    console.log(historyType.status);
                    setUserHistories((prevData) => [
                        ...prevData, historyType
                    ])

                })
            })

        setLoading(false)
    }

    async function resetHistories() {

        HistoriesData.histories.map(async (history) => {
            await historiesCollection
                .doc(auth().currentUser?.uid!)
                .collection("histories")
                .doc(history.idGame)
                .set(history)
        })

        navigation.goBack()
    }


    const sorted = (): HistoriesType[] => {
        // return []
        return [...userHistories].sort(
            (a, b) => a.id - b.id
        ) as HistoriesType[];
    };

    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgRed} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top", "bottom"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%', bottom: 0, justifyContent: 'center' }}
            >
                <View style={{ paddingLeft: Spacing * 2 }}>
                    {
                        loading ? <Text>...</Text> :
                            <View>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: FontSize.medium, fontFamily: Font['poppins-regular'] }}>Silahkan adik adik mengerjakan kuis sesuai dengan pembahasan materi pembelajaran di bawah ini</Text>
                                {/* <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: Spacing * 2, alignSelf: 'center' }}>
                                    <LinearGradient colors={['#08C8F6', '#4D5DFB']} style={{ flex: 1, paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} >
                                        <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large }}>
                                            Level I
                                        </Text>
                                    </LinearGradient>
                                    <TouchableOpacity

                                    >
                                        <Image resizeMode='contain' source={IconNext} style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 10 }} />
                                    </TouchableOpacity>
                                </View> */}

                                <FlatList
                                    data={sorted()}
                                    renderItem={({ item, index }) => (<ItemGames navigation={navigation} history={item} />)}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                                <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, alignSelf: 'center', margin: Spacing * 2 }}>Total Nilai Keseluruhan {(userHistories.reduce((a, v) => a = a + v.score, 0)) * 10}</Text>
                                {/* <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, alignSelf: 'center', margin: Spacing * 2 }}>{avail ? "true" : "false"}</Text> */}
                            </View>
                    }

                </View>
            </SafeAreaView>
            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large }}>
                        Menu Games
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0 }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: '100%', width: 100 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: '60%', width: 100, top: 20 }} />
                </TouchableOpacity>
            </View>

            {
                avail ?
                    <View style={{ position: 'absolute', left: 0, bottom: Spacing, height: 100, width: '100%' }}>
                        <TouchableOpacity onPress={resetHistories} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0 }}>
                            <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: '100%', width: 100 }} />
                            <Image resizeMode='contain' source={IconReset} style={{ position: 'absolute', height: '60%', width: 100, top: 20 }} />
                        </TouchableOpacity>
                    </View>
                    : null
            }

        </View>
    )
}