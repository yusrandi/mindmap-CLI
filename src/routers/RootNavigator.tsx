import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { UserType } from '../type/UserType';
import GamesMenuScreen from '../screens/GamesMenuScreen';
import { GamesType, SoalType } from '../type/GamesType';
import GamesScreen from '../screens/GamesScreen';
import MindMapMenuScreen from '../screens/MindMapMenu';
import BabSatuMenu from '../screens/bab-satu/BabSatuMenu';
import BabSatuMenuSub from '../screens/bab-satu/BabSatuMenuSub';
import BabSatuDetail from '../screens/bab-satu/BabSatuDetail';
import SplashScreen from 'react-native-splash-screen'
import BabDuaMenu from '../screens/bab-dua/BabDuaMenu';
import BabTigaMenu from '../screens/bab-tiga/BabTigaMenu';
import BabEmpatMenu from '../screens/bab-empat/BabEmpatMenu';
import BabLimaMenu from '../screens/bab-lima/BabLimaMenu';
import BabEnamMenu from '../screens/bab-enam/BabEnamMenu';
import BabDuaMenuSub from '../screens/bab-dua/BabDuaMenuSub';
import BabDuaDetail from '../screens/bab-dua/BabDuaDetail';
import BabEmpatMenuSub from '../screens/bab-empat/BabEmpatMenuSub';
import MateriKonsep from '../screens/materi/MateriKonsep';
import MateriSoal from '../screens/materi/MateriSoal';
import BabLimaMenuSub from '../screens/bab-lima/BabLimaMenuSub';
import BabEnamMenuSub from '../screens/bab-enam/BabEnamMenuSub';
import BabTigaMenuSub from '../screens/bab-tiga/BabTigaMenuSub';
import MateriVideo from '../screens/materi/MateriVideo';

export type RootStackParamList = {
    home: undefined
    signIn: undefined
    signUp: undefined
    gamesMenu: undefined
    games: {
        // soals: SoalType[]
        // game: GamesType
        idGame: string
    }
    mindMapMenu: undefined
    babSatuMenu: undefined
    babSatuMenuSub: {
        title: string,
        another: string
    }
    babSatuDetail: {
        title: string,
        layout: number
    }
    babDuaMenu: undefined
    babDuaMenuSub: {
        title: string
    }
    babDuaDetail: {
        title: string,
        layout: number
    }
    babTigaMenu: undefined
    babTigaMenuSub: {
        title: string
    }
    babEmpatMenu: undefined
    babEmpatMenuSub: {
        title: string
    }
    babLimaMenu: undefined
    babLimaMenuSub: {
        title: string
    }
    babEnamMenu: undefined
    babEnamMenuSub: {
        title: string
    }
    materiKonsep: {
        title: string,
        url: string
    }
    materiSoal: {
        title: string,
        url: string
    }
    materiVideo: {
        title: string,
        url: string
    }

};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;


function AuthStack() {
    return (
        <RootStack.Navigator initialRouteName="signIn">
            <RootStack.Screen
                name="signIn"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="signUp"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
        </RootStack.Navigator>
    )
}
function UserStack() {
    return (
        <RootStack.Navigator initialRouteName="home">
            <RootStack.Screen
                name="home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="gamesMenu"
                component={GamesMenuScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="games"
                component={GamesScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="mindMapMenu"
                component={MindMapMenuScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babSatuMenu"
                component={BabSatuMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babSatuMenuSub"
                component={BabSatuMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babSatuDetail"
                component={BabSatuDetail}
                options={{
                    headerShown: false,
                }}
            />

            <RootStack.Screen
                name="babDuaMenu"
                component={BabDuaMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babDuaMenuSub"
                component={BabDuaMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babDuaDetail"
                component={BabDuaDetail}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babTigaMenu"
                component={BabTigaMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babTigaMenuSub"
                component={BabTigaMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babEmpatMenu"
                component={BabEmpatMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babEmpatMenuSub"
                component={BabEmpatMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babLimaMenu"
                component={BabLimaMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babLimaMenuSub"
                component={BabLimaMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babEnamMenu"
                component={BabEnamMenu}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="babEnamMenuSub"
                component={BabEnamMenuSub}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="materiKonsep"
                component={MateriKonsep}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="materiSoal"
                component={MateriSoal}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="materiVideo"
                component={MateriVideo}
                options={{
                    headerShown: false,
                }}
            />

        </RootStack.Navigator>
    )
}

export default function RootNavigator() {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
        SplashScreen.hide();
    }

    useEffect(() => {
        // auth().signOut()
    }, [])
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <NavigationContainer>
            {user ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}