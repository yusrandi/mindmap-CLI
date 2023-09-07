import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pdf from 'react-native-pdf';
import { RootStackScreenProps } from '../routers/RootNavigator';
import { BgRed, TitleBack, User, UserBig } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import auth from '@react-native-firebase/auth'
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { historiesCollection, usersCollection } from '../config/firebase';
import { UserType, emptUser } from '../type/UserType';
import { gamesData } from '../data/GamesData';
import { HistoriesType } from '../type/HistoriesType';
import database from '@react-native-firebase/database';


export default function HomeScreen({ navigation }: RootStackScreenProps<"home">) {
    const [user, setUser] = useState<UserType>(emptUser)
    async function SignOut() {
        await auth().signOut()
    }

    useEffect(() => {
        const subscriber = usersCollection
            .doc(auth().currentUser?.uid)
            .onSnapshot(documentSnapshot => {
                const userData: UserType = documentSnapshot.data() as UserType
                console.log({ userData });
                setUser(userData)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    useEffect(() => {
        const newReference = database().ref('/users').push();

        console.log('Auto generated key: ', newReference.key);

        newReference
            .set({
                age: 32,
            })
            .then(() => console.log('Data updated.'));
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {/* <Text>HomeScreen</Text> */}
            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
            <Image resizeMode='cover' source={BgRed} style={{ flex: 1, width: '100%', height: '100%' }} />

            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%' }}
            >
                <Text style={{ marginTop: Spacing * Spacing, marginBottom: Spacing * 2, textAlign: 'center', fontFamily: Font['juno'], color: 'orange', fontSize: FontSize.xxLarge }}>Welcome</Text>
                <TouchableOpacity onPress={SignOut} style={{ height: 80, width: '90%', marginLeft: -Spacing * 2, }}>
                    <Image resizeMode='stretch' source={TitleBack} style={{ height: '100%', width: '100%' }} />
                    <View style={{ position: 'absolute', left: 20, top: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image resizeMode='contain' source={User} style={{ height: 50, width: 50, }} />
                        <Text style={{ color: 'white', marginLeft: Spacing, fontFamily: Font['juno'], fontSize: FontSize.large }}>Hello {user.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 100 }} />
                <View style={{ alignItems: 'center', alignSelf: 'center', flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('mindMapMenu')}
                    >
                        <LinearGradient colors={['#FF512F', '#F09819']} style={{ flexDirection: 'row', paddingVertical: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', width: 200 }} >
                            <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge, textAlign: 'center' }}>
                                Mulai
                            </Text>
                            {/* <Entypo name="controller-play" size={50} color="white" /> */}
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ height: Spacing * 2 }} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('gamesMenu')}
                        style={{ width: 200 }}
                    >
                        <LinearGradient colors={['green', '#56ab2f', '#a8e063']} style={{ paddingVertical: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge, textAlign: 'center' }}>
                                Games
                            </Text>
                            {/* <Entypo name="game-controller" size={40} color="white" /> */}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Image resizeMode='contain' source={UserBig} style={{ position: 'absolute', right: -50, bottom: 0, height: 200 }} />

        </View>
    )
}