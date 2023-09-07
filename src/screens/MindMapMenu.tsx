import { View, Text, StyleSheet, useWindowDimensions, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../constants/Spacing';
import { Circle, Line, Svg } from 'react-native-svg';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import { RootStackScreenProps } from '../routers/RootNavigator';
import { BackBack, BgWhite, IconBack, MindMapBangunDatar, MindMapBangunRuang, MindMapKpk, MindMapOperasi, MindMapPengukuranSudut, MindMapPengumpulan, MtkKls5 } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';


export default function MindMapMenuScreen({ navigation }: RootStackScreenProps<"mindMapMenu">) {

    const { width } = useWindowDimensions()
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2; // Posisi pusat
    const radius = Math.min(screenWidth, screenHeight) * 0.3; // Radius untuk node di sekitar

    const topNodes = [
        { x: centerX - radius / 1, y: centerY - radius, image: MindMapBangunDatar, color: 'yellow' },
        { x: centerX, y: centerY - radius * 1.5, image: MindMapBangunRuang, color: 'green' },
        { x: centerX + radius / 1, y: centerY - radius, image: MindMapPengumpulan, color: 'red' },
    ];

    const bottomNodes = [
        { x: centerX - radius / 1, y: centerY + radius, image: MindMapKpk, color: 'orange' },
        { x: centerX + radius / 1, y: centerY + radius, image: MindMapPengukuranSudut, color: 'purple' },
        { x: centerX, y: centerY + radius * 1.3, image: MindMapOperasi, color: 'aqua' },
    ];


    const handleImagePress = (index: number, pos: string) => {
        // Do something when the image is pressed, e.g., show more information, navigate to another screen, etc.
        console.log(`index ${index}, pos ${pos} is Pressed`);

        if (pos === "bot") {
            if (index === 0) {
                navigation.navigate("babSatuMenu")
            } else if (index === 2) {
                navigation.navigate("babDuaMenu")
            } else if (index === 1) {
                navigation.navigate("babTigaMenu")
            }
        } else {
            if (index === 0) {
                navigation.navigate("babEmpatMenu")
            } else if (index === 1) {
                navigation.navigate("babLimaMenu")
            } else {
                navigation.navigate("babEnamMenu")
            }
            // else if (index === 2) {
            //     navigation.navigate("babLimaMenu")
            // } else if (index === 1) {
            //     navigation.navigate("babEnamMenu")
            // } else {

            // }
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", left: 0, right: 0, height: '100%' }}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Svg width={screenWidth} height={screenHeight}>
                        {/* Draw lines from top nodes to the center */}
                        {topNodes.map((node, index) => (
                            <Line key={index} x1={node.x} y1={node.y} x2={centerX} y2={centerY} stroke={node.color} strokeWidth={20} />
                        ))}


                        {/* Draw lines from bottom nodes to the center */}
                        {bottomNodes.map((node, index) => (
                            <Line
                                key={index + 3}
                                x1={node.x}
                                y1={node.y}
                                x2={centerX}
                                y2={centerY}
                                stroke={node.color}
                                strokeWidth={20}
                            />
                        ))}
                    </Svg>

                    {topNodes.map((node, index) => (
                        // <Circle key={index} cx={node.x} cy={node.y} r="30" fill="red" />
                        <TouchableWithoutFeedback
                            key={index + 6}
                            onPress={() => handleImagePress(index, "top")}

                        >
                            <Image
                                key={index + 6}
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 50, left: node.x - 40, width: 80, height: 80, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>


                    ))}
                    {bottomNodes.map((node, index) => (
                        <TouchableWithoutFeedback
                            key={index + 6}
                            onPress={() => handleImagePress(index, "bot")}

                        >
                            <Image
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 50, left: node.x - 40, width: 80, height: 80, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>
                        // <Circle key={index + 3} cx={node.x} cy={node.y} r="30" fill="blue" />
                    ))}
                    <Circle cx={centerX} cy={centerY} r="10" fill="green" />


                </View>

            </SafeAreaView>

            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 3, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, alignSelf: 'flex-end', marginHorizontal: Spacing * 2 }}>
                        Peta Matematika
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: 80, width: 80 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: 50, width: 50 }} />
                </TouchableOpacity>
            </View>

            {/* <Image resizeMode='contain' source={require('../assets/images/peta-mtk.png')} style={{ position: 'absolute', left: -60, top: -30, height: 200, alignSelf: 'flex-start', width: width / 1 }} /> */}
            <Image resizeMode='contain' source={MtkKls5} style={{ position: 'absolute', width: 100, height: 100, left: centerX - 50, top: centerY - 30 }} />

        </View>
    )
}
