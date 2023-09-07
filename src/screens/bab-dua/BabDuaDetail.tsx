import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BackBack, BgKonsep, BgSoal, BgVideo, BgWhite, IconBack, IconKonsep, IconVideo } from '../../../assets';
import Spacing from '../../constants/Spacing';
import Pdf from 'react-native-pdf';
import YoutubePlayer from "react-native-youtube-iframe";
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { RootStackScreenProps } from '../../routers/RootNavigator';
import LinearGradient from 'react-native-linear-gradient';


export default function BabDuaDetail({ navigation, route: { params: { title, layout } } }: RootStackScreenProps<"babDuaDetail">) {
    const sourceMateriPerbandingan = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB3%20PECAHAN%20PERBANDINGAN_compressed.pdf?alt=media&token=64ad5065-560d-4854-98cd-4a19d5ff1d11', cache: true };
    const sourceMateriPecahan = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB1%20PECAHAN_compressed.pdf?alt=media&token=79b9dff5-0ba6-478c-b045-1fe4b36d3290', cache: true };
    const sourceMateriDesimal = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB2%20PECAHAN%20DESIMAL_compressed.pdf?alt=media&token=f5869798-466e-4835-b712-d6a121f4d9e9', cache: true };
    const sourceCSPecahan = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB1%20CS%20Pecahan.pdf?alt=media&token=3724bd87-ea80-4627-82c0-b8341d94de5d', cache: true };
    const sourceCSDesimal = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB2%20CS%20Pecahan%20Desimal.pdf?alt=media&token=a2160528-9b30-441a-ae1d-56cdef57783f', cache: true };
    const sourceCSPerbandingan = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20II%2FSB3%20CS%20Pecahan%20Perbandingan.pdf?alt=media&token=6f6dd971-5641-4ba2-8418-cb312bde31bb', cache: true };

    const videoPecahan = "0hPRfqPFtt8"
    const videoDesimal = "EzX3-F-bu7U"
    const videoPerbandingan = "t0EdCU83BEo"
    const [playing, setPlaying] = useState(false);
    const onStateChange = useCallback((state: any) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    function PetaKonsep() {
        return (
            <View style={{ flex: 1, height: '100%', width: '100%' }}>
                <Image resizeMode='stretch' source={BgKonsep} style={{ flex: 1, width: '100%', height: '100%' }} />
                <View style={{ position: 'absolute', top: Spacing * 2, left: Spacing * 2 }}>
                    <Image source={IconKonsep} style={{ height: 50, width: 50 }} resizeMode='center' />
                </View>
                <View style={{ position: 'absolute', paddingHorizontal: Spacing, width: '100%', height: '100%' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ borderBottomColor: 'green', borderBottomWidth: 1, textAlign: 'right', fontFamily: Font['poppins-bold'], fontSize: FontSize.large, width: '50%' }}>Materi {title}</Text>
                    </View>
                    <View style={{ height: 80 }}></View>
                    <Pdf
                        trustAllCerts={false}
                        source={title === "Pecahan (review)" ? sourceMateriPecahan : title === "Pecahan Perbandingan" ? sourceMateriPerbandingan : sourceMateriDesimal}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{ flex: 1, width: "100%", height: "100%" }} />

                    <View style={{ height: 10 }}></View>

                </View>
            </View>
        )
    }
    function PetaVideo() {
        return (
            <View style={{ flex: 1, height: '100%', width: '100%' }}>
                <Image resizeMode='stretch' source={BgVideo} style={{ flex: 1, width: '100%', height: '100%' }} />
                <View style={{ position: 'absolute', top: Spacing * 2, left: Spacing * 2 }}>
                    <Image source={IconVideo} style={{ height: 50, width: 50 }} resizeMode='center' />
                </View>
                <View style={{ position: 'absolute', padding: Spacing * 2, width: '100%' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ borderBottomColor: 'green', borderBottomWidth: 1, textAlign: 'right', fontFamily: Font['poppins-bold'], fontSize: FontSize.large, width: '50%' }}>Video {title}</Text>
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small, marginTop: Spacing * Spacing }}></Text>

                    <YoutubePlayer
                        height={220}
                        play={playing}
                        videoId={title === "Pecahan (review)" ? videoPecahan : title === "Pecahan Perbandingan" ? videoPerbandingan : videoDesimal}
                        onChangeState={onStateChange}
                    />

                </View>
            </View>
        )
    }
    function PetaSoal() {
        return (
            <View style={{ flex: 1, height: '100%', width: '100%' }}>
                <Image resizeMode='stretch' source={BgSoal} style={{ flex: 1, width: '100%', height: '100%' }} />
                <View style={{ position: 'absolute', top: Spacing * 2, left: Spacing * 2 }}>
                    {/* <Image source={require('../assets/images/icon_soal.png')} style={{ height: 50, width: 50 }} resizeMode='center' /> */}
                </View>
                <View style={{ position: 'absolute', padding: Spacing * 2, width: '100%', height: '100%' }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ borderBottomColor: 'green', borderBottomWidth: 1, textAlign: 'right', fontFamily: Font['poppins-bold'], fontSize: FontSize.large, width: '50%' }}>Contoh Soal {title}</Text>
                    </View>
                    <View style={{ height: 100 }} />
                    <Pdf
                        trustAllCerts={false}
                        source={title === "Pecahan (review)" ? sourceCSPecahan : title === "Pecahan Perbandingan" ? sourceCSPerbandingan : sourceCSDesimal}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{ flex: 1, backgroundColor: 'white' }} />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <View style={{
                flex: 1, position: 'absolute', top: Spacing * Spacing, bottom: 0, left: 0, right: 0, padding: Spacing * 2,
                justifyContent: 'center'
            }}>
                < View style={{ padding: Spacing, height: '90%', width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center' }}>
                    {layout === 0 ? <PetaSoal /> : layout === 1 ? <PetaVideo /> : <PetaKonsep />}
                </View>
            </View >
            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, marginLeft: Spacing * Spacing }}>
                        {title}
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0 }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: '100%', width: 100 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: '60%', width: 100, top: 20 }} />
                </TouchableOpacity>
            </View>
        </View >
    )
}