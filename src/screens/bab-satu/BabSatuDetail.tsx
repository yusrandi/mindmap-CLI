import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { RootStackScreenProps } from '../../routers/RootNavigator'
import { BackBack, BgKonsep, BgSoal, BgVideo, BgWhite, IconBack, IconKonsep, IconVideo } from '../../../assets'
import LinearGradient from 'react-native-linear-gradient'
import YoutubePlayer from "react-native-youtube-iframe";
import Pdf from 'react-native-pdf'


export default function BabSatuDetail({ navigation, route: { params: { title, layout } } }: RootStackScreenProps<"babSatuDetail">) {
    const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/SB1%20BAB1%20KPK-min.pdf?alt=media&token=bdc5185e-29ca-4cac-aa29-4db3a67667bc', cache: true };
    const sourceSoal = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/SB1%20CS%20KPK.pdf?alt=media&token=19b074aa-8709-4f72-8b93-201d3013957c', cache: true };
    const sourceFpb = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/SB2%20BAB1%20FPB-min.pdf?alt=media&token=bdb3670b-f059-46e6-bb11-87fc387e4e05', cache: true };
    const sourceSoalFpb = { uri: 'https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/SB2%20CS%20FPB.pdf?alt=media&token=b2153ff9-fd77-4021-ae6c-1809a4efa38d', cache: true };
    const videoKpk = "SppJ-fo4fRs"
    const videoFpb = "wC4vMqL-G1M"
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
                        source={title === "KPK" ? source : sourceFpb}
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
                        videoId={title === "KPK" ? videoKpk : videoFpb}
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
                        source={title === "KPK" ? sourceSoal : sourceSoalFpb}
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