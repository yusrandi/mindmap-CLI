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
import { BABIV, BABVI } from '../../constants/BabConstant';
import ItemBabEnam from './ItemBabEnam';

export default function BabEnamMenuSub({ navigation, route: { params: { title } } }: RootStackScreenProps<"babEnamMenuSub">) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2; // Posisi pusat
    const outerRadius = Math.min(screenWidth, screenHeight) * 0.4; // Radius untuk node di sekitar
    const innerCircleRadius = outerRadius * 0.4; // Radius untuk setengah lingkaran

    const color = "red"
    const [topExtraNodes, setTopExtraNodes] = useState<NodeType[]>([])
    const [newTitle, setNewTitle] = useState<string>(title)


    const centerNode = { x: centerX, y: centerY - outerRadius + 50, image: MindMapPengumpulan, color: color };
    const topNodes = [
        { x: centerX - innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapPengukuranSudut, color: 'purple' },
        centerNode, // Center node (red node)
        { x: centerX + innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapKpk, color: 'orange' },
    ];

    const bottomNodes = [
        { x: centerX - outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapOperasi, color: 'aqua' },
        { x: centerX, y: centerY + outerRadius * 1.2 / 2, image: MindMapBangunDatar, color: 'yellow' },
        { x: centerX + outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapBangunRuang, color: 'green' },
    ];

    const centerNodeTop = { x: centerNode.x, y: centerNode.y - outerRadius + 50 };

    const topExtraNodesTop = [
        { x: centerNodeTop.x - innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, image: IconSoal },
        { x: centerNodeTop.x + innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, image: IconVideo },
        { x: centerNodeTop.x, y: centerNodeTop.y - innerCircleRadius * 3, color: color, image: IconKonsep },
    ];

    function setNodes(titleNew: string) {
        let topExtraNodesLocal: NodeType[] = []

        if (titleNew === BABVI.SBI) {
            topExtraNodesLocal = [
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABVI.SBI },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 2, color: color, title: BABVI.SBII },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 0, color: color, title: BABVI.SBIII },
            ];
        } else if (titleNew === BABVI.SBII) {
            topExtraNodesLocal = [
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABVI.SBI },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABVI.SBII },
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABVI.SBIII },
            ];
        } else {
            topExtraNodesLocal = [
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 0.5, color: color, title: BABVI.SBI },
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 3) * 2.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 3) * 2, color: color, title: BABVI.SBII },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 2, color: color, title: BABVI.SBIII },
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
                if (newTitle === BABVI.SBI) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB1%20Mengumpulkan%20dan%20Mengolah%20Data.pdf?alt=media&token=50339d86-14a2-4f1a-8cde-6f526ddd7936"
                } else if (newTitle === BABVI.SBII) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB2%20Menyajikan%20Data.pdf?alt=media&token=585bb34e-08bc-4968-b6b0-a02fa12e7213"
                } else {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB3%20Membaca%20Data.pdf?alt=media&token=6b365d38-1ef2-423f-b462-f48f9ba5b01d"
                }
                navigation.navigate("materiKonsep", {
                    title: newTitle,
                    url: url
                })
            }
            else if (index === 0) {
                let url = ""
                if (newTitle === BABVI.SBI) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB1%20CS%20Memngolah%20Data.pdf?alt=media&token=cb543c79-515f-4e69-a518-ac464e2b4abe"
                } else if (newTitle === BABVI.SBII) {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB2%20CS%20Menyajikan%20Data.pdf?alt=media&token=ac6a5a33-7caa-4ba3-bb04-384dd048844a"
                } else {
                    url = "https://firebasestorage.googleapis.com/v0/b/mindmap-339fd.appspot.com/o/Bab%20VI%2FSB3%20CS%20Membaca%20Data.pdf?alt=media&token=06c3cdf5-d4ec-47f9-a4d9-78549ab96908"
                }
                navigation.navigate("materiSoal", {
                    title: newTitle,
                    url: url
                })
            } else {
                let url = ""
                if (newTitle === BABVI.SBI) {
                    url = "B-GZEs6ieYs"
                } else if (newTitle === BABVI.SBII) {
                    url = "JvB4bI_Qu5U"
                } else if (newTitle === BABVI.SBIII) {
                    url = "YhrVEq0E2Ds"
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

                    <ItemBabEnam topExtraNodes={topExtraNodes} handleImagePress={handleImagePress} />
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