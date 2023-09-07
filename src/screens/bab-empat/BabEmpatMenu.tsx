import { View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../routers/RootNavigator'
import { BackBack, BgWhite, IconBack, MindMapBangunDatar, MindMapBangunRuang, MindMapKpk, MindMapOperasi, MindMapPengukuranSudut, MindMapPengumpulan, MtkKls5 } from '../../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../../constants/Spacing';
import { Circle, Line, Svg } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { BABIV } from '../../constants/BabConstant';

export default function BabEmpatMenu({ navigation }: RootStackScreenProps<"babEmpatMenu">) {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2; // Posisi pusat
    const outerRadius = Math.min(screenWidth, screenHeight) * 0.5; // Radius untuk node di sekitar
    const innerCircleRadius = outerRadius * 0.6; // Radius untuk setengah lingkaran

    const centerNode = { x: centerX, y: centerY - outerRadius + 30, image: MindMapBangunDatar, color: 'yellow' };

    const color = "yellow"

    const topExtraNodes = [
        { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 1, color: color, title: BABIV.SBI },
        { x: centerNode.x, y: centerNode.y - innerCircleRadius * 1.5, color, title: BABIV.SBII },
        { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 1, color: color, title: BABIV.SBIII },
    ];

    const topNodes = [
        { x: centerX - innerCircleRadius * Math.cos(Math.PI / 5), y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapOperasi, color: 'aqua' },
        centerNode, // Center node (red node)
        { x: centerX + innerCircleRadius * Math.cos(Math.PI / 5), y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapKpk, color: 'orange' },
    ];

    const bottomNodes = [
        { x: centerX - outerRadius / 2, y: centerY + outerRadius / 3, image: MindMapPengukuranSudut, color: 'purple' },
        { x: centerX, y: centerY + outerRadius * 1.3 / 2, image: MindMapBangunRuang, color: 'green' },
        { x: centerX + outerRadius / 2, y: centerY + outerRadius / 3, image: MindMapPengumpulan, color: 'red' },
    ];

    const handleImagePress = (index: number, pos: string, title?: string) => {
        // Do something when the image is pressed, e.g., show more information, navigate to another screen, etc.
        console.log(`index ${index}, pos ${pos} is Pressed`);
        if (pos === "Top") {
            if (index === 2) {
                navigation.navigate("babSatuMenu")
            }
            if (index === 0) {
                navigation.navigate("babDuaMenu")
            }
        } else if (pos === "Bot") {
            if (index === 0) {
                navigation.navigate("babTigaMenu")
            }
            else if (index === 1) {
                navigation.navigate("babLimaMenu")
            }
            else if (index === 2) {
                navigation.navigate("babEnamMenu")
            }

        } else {
            if (index === 0) {
                navigation.navigate("babEmpatMenuSub", { title: title! })

            } else if (index === 1) {
                navigation.navigate("babEmpatMenuSub", { title: title! })

            } else if (index === 2) {
                navigation.navigate("babEmpatMenuSub", { title: title! })

            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["bottom"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: Spacing, height: "80%" }}
            >

                <View>
                    <Svg width={screenWidth} height={screenHeight}>
                        {/* Draw lines from extra top nodes to the center top node */}
                        {topExtraNodes.map((node, index) => (
                            <Line key={index + 5} x1={node.x} y1={node.y} x2={centerNode.x} y2={centerNode.y} stroke={node.color} strokeWidth={15} />
                        ))}

                        {/* Draw lines from top nodes to the center */}
                        {topNodes.map((node, index) => (
                            <Line key={index} x1={node.x} y1={node.y} x2={centerX} y2={centerY} stroke={node.color} strokeWidth={20} />
                        ))}

                        {/* Draw lines from bottom nodes to the center */}
                        {bottomNodes.map((node, index) => (
                            <Line
                                key={index + 10}
                                x1={node.x}
                                y1={node.y}
                                x2={centerX}
                                y2={centerY}
                                stroke={node.color}
                                strokeWidth={20}
                            />
                        ))}
                        <Circle cx={centerX} cy={centerY} r="30" fill="green" />
                        <Image resizeMode='contain' source={MtkKls5} style={{ position: 'absolute', width: 100, height: 100, top: centerY - 50, alignSelf: 'center' }} />


                    </Svg>

                    {/* Draw circular nodes on top of top nodes */}
                    {topExtraNodes.map((node, index) => (
                        <TouchableWithoutFeedback key={index + 9}
                            onPress={() => handleImagePress(index, "ExtraBot", node.title)}>
                            <View style={{ position: 'absolute', top: node.y - 50, left: node.x - 50, width: 100, height: 100, borderColor: node.color, borderWidth: 5, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: 'black', textAlign: 'center' }}>{node.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}


                    {/* Draw circular nodes forming a semi-circle */}
                    {topNodes.map((node, index) => (
                        // <Circle key={index + 15} cx={node.x} cy={node.y} r="30" fill="red" />
                        <TouchableWithoutFeedback key={index + 9}
                            onPress={() => handleImagePress(index, "Top")}>
                            <Image
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 30, left: node.x - 40, width: 80, height: 80, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>

                    ))}

                    {bottomNodes.map((node, index) => (

                        <TouchableWithoutFeedback key={index + 6}
                            onPress={() => handleImagePress(index, "Bot")}>
                            <Image
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 30, left: node.x - 40, width: 80, height: 80, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>

                        // <Circle key={index + 25} cx={node.x} cy={node.y} r="30" fill="blue" />
                    ))}

                </View>
            </SafeAreaView>


            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 3, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.large, alignSelf: 'flex-end', marginHorizontal: Spacing * 2 }}>
                        Bab IV
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.navigate("mindMapMenu")} style={{ position: 'absolute', height: '100%', width: 100, left: 0, top: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: 80, width: 80 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: 50, width: 50 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}