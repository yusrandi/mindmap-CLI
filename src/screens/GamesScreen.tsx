import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../routers/RootNavigator'
import Spacing from '../constants/Spacing';
import { BackBack, BackDialog, BgWhite, IconBack, IconEmoteHappy, IconEmoteSad, IconStarIn, IconStarOut, MindMapBangunDatar } from '../../assets';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import LinearGradient from 'react-native-linear-gradient';
import { gamesTitleData } from '../data/GamesTitleData';
import { gamesCollection, gamesDatabaseRef, historiesCollection, historiesDatabaseRef } from '../config/firebase';
import auth from '@react-native-firebase/auth'
import { GamesType, SoalType } from '../type/GamesType';
import { HistoriesData } from '../data/HistoriesData';

export default function GamesScreen({ navigation, route: { params: { idGame } } }: RootStackScreenProps<"games">) {
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(false);
    const [index, setIndex] = useState(0);
    const [benar, setBenar] = useState(0);
    const urlToCheck = '1/2'; // Replace with the URL you want to check
    const [soals, setSoals] = useState<SoalType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    function tebakJawaban(jawaban: string) {
        console.log(`index ${index}`);
        setIndex(index + 1)
        if (jawaban === soals[index]?.benar) {
            setBenar(benar + 1)
        }

    }

    function ModalDialog() {
        if (!status) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        //   Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <Image resizeMode='cover' source={BackDialog} style={{ flex: 1, width: '100%', height: '100%' }} />
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={IconStarOut} style={{ height: 100, width: 80 }} resizeMode='contain' />
                                <Image source={IconStarOut} style={{ height: 100, width: 100 }} resizeMode='contain' />
                                <Image source={IconStarOut} style={{ height: 100, width: 80 }} resizeMode='contain' />
                            </View>
                            <View style={[styles.modalView, { width: '100%' }]}>
                                <Text style={{ textAlign: 'center', fontFamily: Font['samurai'], fontSize: FontSize.xxLarge, color: 'orange' }}>Dikit Lagi</Text>
                                <Image source={IconEmoteSad} style={{ height: 150, width: 150 }} resizeMode='contain' />
                                {/* <Image source={require('../assets/images/games/emote_happy.png')} style={{ height: 150, width: 150 }} resizeMode='contain' /> */}

                            </View>
                        </View>
                    </View>
                </Modal>
            )
        } else {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        //   Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <Image resizeMode='cover' source={BackDialog} style={{ flex: 1, width: '100%', height: '100%' }} />
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={IconStarIn} style={{ height: 100, width: 80 }} resizeMode='contain' />
                                <Image source={IconStarIn} style={{ height: 100, width: 100 }} resizeMode='contain' />
                                <Image source={IconStarIn} style={{ height: 100, width: 80 }} resizeMode='contain' />
                            </View>
                            <View style={[styles.modalView, { width: '100%' }]}>
                                <Text style={{ textAlign: 'center', fontFamily: Font['samurai'], fontSize: FontSize.xxLarge, color: 'orange' }}>Berhasil</Text>
                                {/* <Image source={require('../assets/images/emote_sad.png')} style={{ height: 150, width: 150 }} resizeMode='contain' /> */}
                                <Image source={IconEmoteHappy} style={{ height: 150, width: 150 }} resizeMode='contain' />

                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    function selesaiJawab() {
        setLoading(true)
        if (idGame === gamesTitleData.BABI) {
            updateHistory(idGame, gamesTitleData.BABII)
        } else if (idGame === gamesTitleData.BABII) {
            updateHistory(idGame, gamesTitleData.BABIII)
        } else if (idGame === gamesTitleData.BABIII) {
            updateHistory(idGame, gamesTitleData.BABIV)
        } else if (idGame === gamesTitleData.BABIV) {
            updateHistory(idGame, gamesTitleData.BABV)
        } else if (idGame === gamesTitleData.BABV) {
            updateHistory(idGame, gamesTitleData.BABVI)
        } else if (idGame === gamesTitleData.BABVI) {
            updateHistory(idGame, "tes")

        }
    }


    function updateHistory(oldKey: string, newKey: string) {
        // historiesCollection
        //     .doc(auth().currentUser?.uid!)
        //     .collection("histories")
        //     .doc(oldKey)
        //     .update({
        //         status: 2,
        //         score: benar
        //     })
        //     .then(() => {
        //         if (oldKey !== gamesTitleData.BABVI) {
        //             historiesCollection
        //                 .doc(auth().currentUser?.uid!)
        //                 .collection("histories")
        //                 .doc(newKey)
        //                 .update({
        //                     status: 1
        //                 })
        //                 .then(() => {
        //                     setLoading(false)
        //                     console.log("updated")
        //                     navigation.goBack()

        //                 })
        //         } else {
        //             setLoading(false)
        //             console.log("updated")
        //             navigation.goBack()
        //         }
        //     })

        setLoading(true)

        historiesDatabaseRef
            .child(auth().currentUser?.uid!)
            .child(oldKey)
            .update({
                status: 2,
                score: benar
            })
            .then(() => {
                if (oldKey !== gamesTitleData.BABVI) {
                    historiesDatabaseRef
                        .child(auth().currentUser?.uid!)
                        .child(newKey)
                        .update({
                            status: 1
                        })
                        .then(() => {
                            setLoading(false)
                            console.log("updated")
                            navigation.goBack()

                        })
                } else {
                    setLoading(false)
                    console.log("updated")
                    navigation.goBack()
                }
            })

    }

    useEffect(() => {
        console.log(idGame);
        gamesDatabaseRef.child(idGame)
            .once('value')
            .then(snapshot => {
                console.log('Soal data: ', snapshot.val());
                setSoals([])
                if (snapshot.exists()) {
                    const dataFromFirebase: SoalType[] = Object.values(snapshot.val() || {});
                    setSoals(shuffle(dataFromFirebase))
                }
                setLoading(false)
            })
    }, [])

    const shuffle = (array: SoalType[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const isValidURL = (url: string): boolean => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    };

    const renderContent = (url: string): React.ReactNode => {
        if (isValidURL(url)) {
            return <Image source={{ uri: url }} style={{ width: 100, height: 100 }} resizeMode='contain' />;
        } else {
            return <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black' }}>{url}</Text>;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ModalDialog />
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                        Games
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0 }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: '100%', width: 100 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: '60%', width: 100, top: 20 }} />
                </TouchableOpacity>
            </View>
            {
                index === 5 ?
                    <View style={[styles.centeredView, { position: 'absolute', top: Spacing, left: Spacing, right: Spacing, bottom: Spacing }]}>
                        <Image resizeMode='cover' source={BackDialog} style={{ flex: 1, width: '100%', height: '100%' }} />
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={IconStarIn} style={{ height: 100, width: 80 }} resizeMode='contain' />
                                <Image source={IconStarIn} style={{ height: 100, width: 100 }} resizeMode='contain' />
                                <Image source={IconStarIn} style={{ height: 100, width: 80 }} resizeMode='contain' />
                            </View>
                            <View style={[styles.modalView, { width: '100%' }]}>
                                <Text style={{ textAlign: 'center', fontFamily: Font['samurai'], fontSize: FontSize.xxLarge, color: 'orange' }}>Jawaban Benar</Text>
                                <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.xxLarge, color: 'orange' }}>{benar}</Text>
                                {/* <Image source={require('../assets/images/emote_sad.png')} style={{ height: 150, width: 150 }} resizeMode='contain' /> */}
                                <Image source={IconEmoteHappy} style={{ height: 150, width: 150 }} resizeMode='contain' />
                            </View>
                            <TouchableWithoutFeedback onPress={selesaiJawab}>
                                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                                        {loading ? "..." : "SELESAI"}
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, position: 'absolute', top: Spacing * Spacing * 2, bottom: 0, left: 0, right: 0, padding: Spacing * 2 * 2 }}>
                        <View style={{ marginBottom: Spacing, flex: 1, borderColor: 'red', borderWidth: 1, padding: Spacing, width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center', height: '100%', alignSelf: 'center' }}>
                            {/* <Text style={{ textAlign: 'center', fontFamily: Font['poppins-regular'], fontSize: FontSize.xxLarge, color: 'black' }}>{game.title}</Text> */}
                            <Text style={{ textAlign: 'center', fontFamily: Font['poppins-regular'], fontSize: FontSize.large, color: 'black' }}>{loading ? "......." : soals[index]?.soal}</Text>
                            <Image source={{ uri: soals[index]?.image }} resizeMode='contain' style={{ flex: 1, width: "100%" }} />

                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: Spacing }}>
                                <TouchableOpacity onPress={() => tebakJawaban("a")} style={{ marginRight: Spacing, flex: 1, borderColor: 'red', borderWidth: 1, padding: Spacing, width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black', marginRight: Spacing }}>A.</Text>
                                    {/* <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black' }}>{game.soals[index].a}</Text> */}
                                    {renderContent(soals[index]?.a)}
                                    {/* <Image source={MindMapBangunDatar} resizeMode='contain' style={{ width: '40%', height: '40%' }} /> */}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => tebakJawaban("b")} style={{ marginLeft: Spacing, flex: 1, borderColor: 'red', borderWidth: 1, padding: Spacing, width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    {/* <Image source={require('../assets/images/skala.png')} resizeMode='contain' style={{ width: '40%', height: '40%' }} /> */}
                                    <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black', marginRight: Spacing }}>B.</Text>
                                    {renderContent(soals[index]?.b)}

                                    {/* <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black' }}>{game.soals[index].b}</Text> */}

                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: Spacing }}>
                                <TouchableOpacity onPress={() => tebakJawaban("c")} style={{ marginRight: Spacing, flex: 1, borderColor: 'red', borderWidth: 1, padding: Spacing, width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    {/* <Image source={require('../assets/images/skala.png')} resizeMode='contain' style={{ width: '40%', height: '40%' }} /> */}
                                    <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black', marginRight: Spacing }}>C.</Text>
                                    {renderContent(soals[index]?.c)}

                                    {/* <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black' }}>{game.soals[index].c}</Text> */}

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => tebakJawaban("d")} style={{ marginLeft: Spacing, flex: 1, borderColor: 'red', borderWidth: 1, padding: Spacing, width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    {/* <Image source={require('../assets/images/skala.png')} resizeMode='contain' style={{ width: '40%', height: '40%' }} /> */}
                                    <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black', marginRight: Spacing }}>D.</Text>
                                    {renderContent(soals[index]?.d)}

                                    {/* <Text style={{ textAlign: 'center', fontFamily: Font['juno'], fontSize: FontSize.large, color: 'black' }}>{game.soals[index].d}</Text> */}

                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
            }


        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: Spacing * 2,

    },
    modalView: {
        borderWidth: 5, borderColor: 'red',
        marginTop: Spacing,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: Spacing,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});