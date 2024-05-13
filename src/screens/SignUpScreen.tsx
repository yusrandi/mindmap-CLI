import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { historiesCollection, historiesDatabaseRef, usersCollection, usersDatabaseRef } from '../config/firebase'
import { RootStackScreenProps } from '../routers/RootNavigator'
import { BgRed } from '../../assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'
import Spacing from '../constants/Spacing'
import AppTextInput from '../components/AppTextInput'
import LinearGradient from 'react-native-linear-gradient'
import { gamesData } from '../data/GamesData'
import database from '@react-native-firebase/database'
import { HistoriesData } from '../data/HistoriesData'

export default function SignUpScreen({ navigation }: RootStackScreenProps<"signUp">) {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confPassword, setConfPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function handleRegister() {
        console.log("hello");

        if (name !== "" && email !== "" && password !== "") {
            console.log("hello");

            if (password !== confPassword) {
                Alert.alert("Password and Confirm password not match")
                console.log("hello");

                return
            }
            setIsLoading(true)
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {

                    const userId = userCredential.user.uid

                    // usersCollection.doc(userCredential.user.uid).set({
                    //     email: email,
                    //     name: name,
                    //     online: true
                    // })
                    //     .then(() => {
                    //         console.log('User added!');
                    //         resetHistories()
                    //     })

                    usersDatabaseRef.child(userId).set({
                        id: userId,
                        email: userCredential.user.email,
                        online: true,
                        name: name
                    })
                        .then(() => {
                            console.log('User added!');
                            resetHistories()
                        })
                        .catch((error) => {
                            console.log(`[signup] error ${error}`);
                        })

                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert("That email address is already in use!")
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('That email address is invalid!')
                    }

                    console.error(error.code);
                });
            setIsLoading(false)
        }

    }

    async function resetHistories() {

        HistoriesData.histories.map((history) => {
            // historiesCollection
            //     .doc(auth().currentUser?.uid!)
            //     .collection("histories")
            //     .doc(history.idGame)
            //     .set(history)
            historiesDatabaseRef.child(auth().currentUser?.uid!).child(history.idGame.toString())
                .set(history)
                .then(() => {
                    console.log('Histories added!')
                })
                .catch((error) => {
                    console.log(`[signup] histories ${error}`);
                })
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgRed} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%' }}
            >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'orange', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                            Get Started
                        </Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', width: '100%', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '100%', paddingHorizontal: Spacing * 2 }}>
                            <AppTextInput placeholder="Fullname" value={name} onChangeText={(e) => setName(e)} />
                            <AppTextInput placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
                            <AppTextInput placeholder="Password" secureTextEntry value={password} onChangeText={(e) => setPassword(e)} />
                            <AppTextInput placeholder="Confirm Password" secureTextEntry value={confPassword} onChangeText={(e) => setConfPassword(e)} />
                        </View>
                        <View style={{ height: Spacing * Spacing }} />
                        <View style={{ height: Spacing }} />
                        <TouchableOpacity onPress={handleRegister}>
                            <LinearGradient colors={['#FF512F', '#F09819']} style={{ flexDirection: 'row', paddingVertical: Spacing * 2, paddingHorizontal: Spacing * 4, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                                    {isLoading ? "..." : "Sign Up"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ height: Spacing * 2 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
                            <Text style={{ color: 'white', fontFamily: Font['poppins-bold'] }}>
                                already have account? <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium }}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView >

        </View >
    )
}