import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../routers/RootNavigator'
import { BackBack, BgVideo, BgWhite, IconBack, IconVideo } from '../../../assets'
import Spacing from '../../constants/Spacing'
import YoutubePlayer from "react-native-youtube-iframe";
import LinearGradient from 'react-native-linear-gradient'
import Font from '../../constants/Font'
import FontSize from '../../constants/FontSize'


export default function MateriVideo({ navigation, route: { params: { title, url } } }: RootStackScreenProps<"materiVideo">) {
    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <View style={{
                flex: 1, position: 'absolute', top: Spacing * Spacing, bottom: 0, left: 0, right: 0, padding: Spacing * 2,
                justifyContent: 'center'
            }}>
                < View style={{ padding: Spacing, height: '90%', width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center' }}>
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
                                // play={playing}
                                videoId={url}
                            // onChangeState={onStateChange}
                            />

                        </View>
                    </View>
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