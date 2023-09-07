import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackBack, BgKonsep, BgWhite, IconBack, IconKonsep } from '../../../assets'
import Spacing from '../../constants/Spacing'
import LinearGradient from 'react-native-linear-gradient'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { RootStackScreenProps } from '../../routers/RootNavigator'
import Pdf from 'react-native-pdf'

export default function MateriKonsep({ navigation, route: { params: { title, url } } }: RootStackScreenProps<"materiKonsep">) {
    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <View style={{
                flex: 1, position: 'absolute', top: Spacing * Spacing, bottom: 0, left: 0, right: 0, padding: Spacing * 2,
                justifyContent: 'center'
            }}>
                < View style={{ padding: Spacing, height: '90%', width: '100%', borderRadius: Spacing, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: '100%', width: '100%' }}>
                        <Image resizeMode='stretch' source={BgKonsep} style={{ flex: 1, width: '100%', height: '100%' }} />
                        <View style={{ position: 'absolute', top: Spacing * 2, left: Spacing * 2 }}>
                            <Image source={IconKonsep} style={{ height: 50, width: 50 }} resizeMode='center' />
                        </View>
                        <View style={{ position: 'absolute', paddingHorizontal: Spacing, width: '100%', height: '100%' }}>
                            <View style={{ alignItems: 'flex-end', padding: Spacing }}>
                                <Text style={{ borderBottomColor: 'green', borderBottomWidth: 1, textAlign: 'right', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium, width: '70%' }}>Materi {title}</Text>
                            </View>
                            <View style={{ height: 80 }}></View>
                            <Pdf
                                trustAllCerts={false}
                                source={{ uri: url, cache: true }}
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
                </View>
            </View >
            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '90%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', paddingLeft: Spacing * Spacing }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.medium, alignSelf: 'center', marginHorizontal: Spacing }}>
                        {title}
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: 80, width: 80, left: 0, top: 0 }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: 80, width: 80 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: "100%", width: 50, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        </View >
    )
}