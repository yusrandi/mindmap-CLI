import { View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackBack, BgWhite, IconBack, IconKonsep, IconSoal, IconVideo, MindMapBangunDatar, MindMapBangunRuang, MindMapKpk, MindMapOperasi, MindMapPengukuranSudut, MindMapPengumpulan, MtkKls5 } from '../../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../../constants/Spacing';
import { Circle, Line, Svg } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';
import { RootStackScreenProps } from '../../routers/RootNavigator';
import { NodeType } from '../../type/NodeType';
import { BABIV, BABV } from '../../constants/BabConstant';
import ItemBabLima from './ItemBabLima';

export default function BabLimaMenuSub({ navigation, route: { params: { title } } }: RootStackScreenProps<"babLimaMenuSub">) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2; // Posisi pusat
    const outerRadius = Math.min(screenWidth, screenHeight) * 0.4; // Radius untuk node di sekitar
    const innerCircleRadius = outerRadius * 0.4; // Radius untuk setengah lingkaran

    const color = "green"
    const [topExtraNodes, setTopExtraNodes] = useState<NodeType[]>([])
    const [newTitle, setNewTitle] = useState<string>(title)


    const centerNode = { x: centerX, y: centerY - outerRadius + 50, image: MindMapBangunRuang, color: color };
    const topNodes = [
        { x: centerX - innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapPengukuranSudut, color: 'purple' },
        centerNode, // Center node (red node)
        { x: centerX + innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapKpk, color: 'orange' },
    ];

    const bottomNodes = [
        { x: centerX - outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapOperasi, color: 'aqua' },
        { x: centerX, y: centerY + outerRadius * 1.2 / 2, image: MindMapBangunDatar, color: 'yellow' },
        { x: centerX + outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapPengumpulan, color: 'red' },
    ];

    const centerNodeTop = { x: centerNode.x, y: centerNode.y - outerRadius + 50 };

    const topExtraNodesTop = [
        { x: centerNodeTop.x - innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, image: IconSoal },
        { x: centerNodeTop.x + innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, image: IconVideo },
        { x: centerNodeTop.x, y: centerNodeTop.y - innerCircleRadius * 3, color: color, image: IconKonsep },
    ];

    function setNodes(titleNew: string) {
        let topExtraNodesLocal: NodeType[] = []

        if (titleNew === BABV.SBI) {
            topExtraNodesLocal = [
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABV.SBI },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 2, color: color, title: BABV.SBII },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 0, color: color, title: BABV.SBIII },
            ];
        } else if (titleNew === BABV.SBII) {
            topExtraNodesLocal = [
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABV.SBI },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABV.SBII },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABV.SBIII },
            ];
        } else {
            topExtraNodesLocal = [
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 0.5, color: color, title: BABV.SBI },
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABV.SBII },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABV.SBIII },
            ];
        }
        setTopExtraNodes(topExtraNodesLocal)
    }

    useEffect(() => {
        setNodes(newTitle)
    }, [])

    const handleImagePress = (index: number, pos: string, title?: string) => {
        // Do something when the image is pressed, e.g., show more information, navigate to another screen, etc.
        console.log(`index ${index}, pos ${pos} is Pressed title ${title}`);
        if (pos === "Top") {
            if (index === 0) {
                navigation.navigate("babTigaMenu")
            } else if (index === 2) {
                navigation.navigate("babSatuMenu")
            }
        } else if (pos === "Bot") {
            if (index === 0) {
                navigation.navigate("babDuaMenu")
            } else if (index === 1) {
                navigation.navigate("babEmpatMenu")
            } else if (index === 2) {
                navigation.navigate("babEnamMenu")
            }
        } else if (pos === "ExtraBot") {
            setNodes(title!)
            setNewTitle(title!)
        } else {
            if (index === 2) {
                let url = ""
                if (newTitle === BABV.SBI) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB1%20Identifikasi%20Bangun%20Ruang.pdf?alt=media&token=ae4cb85f-98e8-4a88-a706-400242c8eeb5"
                } else if (newTitle === BABV.SBII) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB2%20Volume%20Bangun%20Ruang%20.pdf?alt=media&token=bdba42a0-a2f3-4cc5-aa40-43b456f38c59"
                } else {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB3%20Bilangan%20_%20Akar%20Pangkat%20.pdf?alt=media&token=ff6dbc34-7d06-4548-89dc-bc103e78516b"
                }
                navigation.navigate("materiKonsep", {
                    title: newTitle,
                    url: url
                })
            }
            else if (index === 0) {
                let url = ""
                if (newTitle === BABV.SBI) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB1%20CS%20Bilangan%20Pangkat%20dan%20Akar%20Pangkat%203.pdf?alt=media&token=88170b64-9fae-4d87-9860-ca08822b9111"
                } else if (newTitle === BABV.SBII) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB2%20CS%20Volume%20Bangun%20Ruang.pdf?alt=media&token=b4b2376b-4822-4999-aa0b-1d274e45264d"
                } else {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20V%2FSB3%20CS%20Identifikasi%20Bangun%20Ruang.pdf?alt=media&token=fba53067-61eb-4afa-8919-48e04eecf1c5"
                }
                navigation.navigate("materiSoal", {
                    title: newTitle,
                    url: url
                })
            } else {
                let url = ""
                if (newTitle === BABV.SBI) {
                    url = "FiT3L0PlmX8"
                } else if (newTitle === BABV.SBII) {
                    url = "q50HvRP1n4E"
                } else if (newTitle === BABV.SBIII) {
                    url = "ihps_2wOtgY"
                }
                navigation.navigate("materiVideo", {
                    title: newTitle,
                    url: url
                })
            }
        }

    };

    return (
        <View style={{ flex: 1 }}>
            <Image resizeMode='cover' source={BgWhite} style={{ flex: 1, width: '100%', height: '100%' }} />

            <SafeAreaView
                edges={["bottom"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: Spacing, top: Spacing * Spacing * 3 }}
            >

                <View style={{}}>
                    <Svg width={screenWidth} height={screenHeight}>

                        {/* Draw lines from extra top nodes to the center top node */}
                        {topExtraNodesTop.map((node, index) => (
                            <Line strokeDasharray="5,5" key={index + 5} x1={node.x} y1={node.y} x2={centerNodeTop.x} y2={centerNodeTop.y} stroke={node.color} strokeWidth={3} />
                        ))}

                        {/* Draw lines from extra top nodes to the center top node */}
                        {topExtraNodes.map((node, index) => (
                            <Line key={index + 5} x1={node.x} y1={node.y} x2={centerNode.x} y2={centerNode.y} stroke={node.color} strokeWidth={5} />
                        ))}

                        {/* Draw lines from top nodes to the center */}
                        {topNodes.map((node, index) => (
                            <Line key={index} x1={node.x} y1={node.y} x2={centerX} y2={centerY} stroke={node.color} strokeWidth={10} />
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
                                strokeWidth={10}
                            />
                        ))}
                        <Circle cx={centerX} cy={centerY} r="30" fill="orange" />
                        <Image resizeMode='contain' source={MtkKls5} style={{ position: 'absolute', alignSelf: 'center', width: 60, height: 60, top: centerY - 30 }} />


                    </Svg>

                    {/* Draw circular nodes on top of top nodes */}
                    {topExtraNodesTop.map((node, index) => (
                        <TouchableWithoutFeedback key={index + 9}
                            onPress={() => handleImagePress(index, "ExtraBotTop")}>
                            <View style={{ position: 'absolute', top: node.y - 50, left: node.x - 50, width: 100, height: 100, backgroundColor: "white", borderColor: node.color, borderWidth: 5, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                {/* <Image
                                    source={images[0]}
                                    style={{ position: 'absolute', top: node.y - 10, left: node.x - 25, width: 50, height: 50, borderRadius: 10 }}
                                /> */}
                                <Image
                                    source={node.image}
                                    style={{ width: 55, height: 55, borderRadius: 10 }}
                                />
                            </View>

                        </TouchableWithoutFeedback>
                    ))}

                    <ItemBabLima topExtraNodes={topExtraNodes} handleImagePress={handleImagePress} />
                    {/* Draw circular nodes on top of top nodes */}
                    {/* {topExtraNodes.map((node, index) => (
                        <TouchableWithoutFeedback key={index + 9}
                            onPress={() => handleImagePress(index, "ExtraBot", node.title)}>
                            <View style={{ position: 'absolute', top: node.y - 30, left: node.x - 30, width: 60, height: 60, backgroundColor: "white", borderColor: node.color, borderWidth: 3, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: 'black', fontSize: 9, textAlign: 'center' }}>{node.title}</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    ))} */}


                    {/* Draw circular nodes forming a semi-circle */}
                    {topNodes.map((node, index) => (
                        // <Circle key={index + 15} cx={node.x} cy={node.y} r="30" fill="red" />
                        <TouchableWithoutFeedback key={index + 9}
                            onPress={() => handleImagePress(index, "Top")}>
                            <Image
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 25, left: node.x - 25, width: 50, height: 50, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>

                    ))}

                    {bottomNodes.map((node, index) => (

                        <TouchableWithoutFeedback key={index + 6}
                            onPress={() => handleImagePress(index, "Bot")}>
                            <Image
                                source={node.image}
                                style={{ position: 'absolute', top: node.y - 25, left: node.x - 25, width: 50, height: 50, borderRadius: 10 }}
                            />
                        </TouchableWithoutFeedback>

                        // <Circle key={index + 25} cx={node.x} cy={node.y} r="30" fill="blue" />
                    ))}


                </View>

            </SafeAreaView>

            <View style={{ position: 'absolute', left: 0, top: Spacing * 2, height: 100, width: '100%' }}>
                <LinearGradient colors={['#FF512F', '#F09819']} style={{ width: '80%', paddingVertical: Spacing * 2, marginTop: Spacing * 2, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', paddingLeft: Spacing * Spacing }} >
                    <Text style={{ color: 'white', fontFamily: Font['juno'], fontSize: FontSize.small, alignSelf: 'center', marginHorizontal: Spacing }}>
                        {newTitle}
                    </Text>
                </LinearGradient>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: 80, width: 80, left: 0, top: 0 }}>
                    <Image resizeMode='contain' source={BackBack} style={{ position: 'absolute', height: 80, width: 80 }} />
                    <Image resizeMode='contain' source={IconBack} style={{ position: 'absolute', height: "100%", width: 50, alignSelf: 'center' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}