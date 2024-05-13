import { View, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BgRed, Logo } from '../../assets'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontSize from '../constants/FontSize'
import Spacing from '../constants/Spacing'
import { RootStackScreenProps } from '../routers/RootNavigator'
import Font from '../constants/Font'
import AppTextInput from '../components/AppTextInput'
import { usersCollection } from '../config/firebase'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

export default function SignInScreen({ navigation }: RootStackScreenProps<"signIn">) {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const dataRef = database().ref('users');

    useEffect(() => {
        console.log("login");
        // create()

    }, [])


    async function handleSignIn() {

        if (email !== "" && password !== "") {
            setIsLoading(true)
            await auth().signInWithEmailAndPassword(email, password)
                .then((user) => console.log({ user }))
                .catch((error) => {
                    console.log(error.code);

                    if (error.code === 'auth/user-not-found') {
                        Alert.alert("User not found")
                    }

                    if (error.code === 'auth/wrong-password') {
                        // console.log('That email address is invalid!');
                        Alert.alert("Wrong password")

                    }
                })
            setIsLoading(false)
        }


    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
            <Image resizeMode='cover' source={BgRed} style={{ flex: 1, width: '100%', height: '100%', margin: -10 }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%' }}
            >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image resizeMode='center' source={Logo} style={{ width: 200, height: 200 }} />
                        <Text style={{ color: 'white', fontFamily: 'juno', fontSize: FontSize.large }}>MATHMIND.APP</Text>
                        <Text style={{ color: 'white', fontFamily: 'juno' }}>Revolusionize Math Learning With Digital Mind Mapping</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', width: '100%', alignContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '100%', paddingHorizontal: Spacing * 2 }}>
                            <AppTextInput placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} />
                            <AppTextInput placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} secureTextEntry />
                        </View>
                        <View style={{ height: Spacing * Spacing }} />
                        <TouchableOpacity onPress={handleSignIn}>
                            <LinearGradient colors={['white', 'white']} style={{ flexDirection: 'row', paddingVertical: Spacing * 2, paddingHorizontal: Spacing * 4, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ color: 'black', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                                    {isLoading ? "..." : "Sign In"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ height: Spacing }} />
                        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                            <LinearGradient colors={['#FF512F', '#F09819']} style={{ flexDirection: 'row', paddingVertical: Spacing * 2, paddingHorizontal: Spacing * 4, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.xxLarge }}>
                                    Sign Up
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ height: Spacing * 2 }} />
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'] }}>
                            Forgot Password
                        </Text>

                    </View>
                </View>


            </SafeAreaView>

            {/* <Text style={{ fontFamily: 'juno' }}>SignInScreen</Text> */}

            {/* <LinearGradient colors={['#4c669f', 'orange', 'red']} style={{ padding: 16, borderRadius: 16 }}>
                <Text style={{ color: 'white' }}>
                    Sign in with Facebook
                </Text>
            </LinearGradient> */}

        </View>
    )
}