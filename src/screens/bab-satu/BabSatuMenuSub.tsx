import { View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Circle, Line, Svg } from 'react-native-svg'
import { RootStackScreenProps } from '../../routers/RootNavigator'
import { BackBack, BgWhite, IconBack, IconKonsep, IconSoal, IconVideo, MindMapBangunDatar, MindMapBangunRuang, MindMapKpk, MindMapOperasi, MindMapPengukuranSudut, MindMapPengumpulan, MtkKls5 } from '../../../assets'
import LinearGradient from 'react-native-linear-gradient'
import { NodeType } from '../../type/NodeType'
import ItemBabSatu from './ItemBabSatu'

export default function BabSatuMenuSub({ navigation, route: {
    params: { title, another },
}, }: RootStackScreenProps<"babSatuMenuSub">) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2; // Posisi pusat
    const outerRadius = Math.min(screenWidth, screenHeight) * 0.4; // Radius untuk node di sekitar
    const innerCircleRadius = outerRadius * 0.4; // Radius untuk setengah lingkaran

    const centerNode = { x: centerX, y: centerY - outerRadius + 50, image: MindMapKpk, color: 'orange' };
    const centerNodeTop = { x: centerNode.x, y: centerNode.y - outerRadius + 50 };

    const [topExtraNodes, setTopExtraNodes] = useState<NodeType[]>([])
    const [newTitle, setNewTitle] = useState<string>(title)

    const color = "orange"


    const topExtraNodesTop = [
        { x: centerNodeTop.x - innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 1, color: "orange", image: IconSoal },
        { x: centerNodeTop.x + innerCircleRadius * Math.cos(Math.PI / 3) * 3, y: centerNodeTop.y - innerCircleRadius * Math.sin(Math.PI / 3) * 1, color: "orange", image: IconVideo },
        { x: centerNodeTop.x, y: centerNodeTop.y - innerCircleRadius * 2, color: "orange", image: IconKonsep },
    ];

    // if (title === "FPB") {
    //     topExtraNodes = [
    //         { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 4) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 1, color: "orange", title: another, colors: ['#b31217', '#e52d27'] },
    //         { x: centerNode.x, y: centerNode.y - innerCircleRadius * 1.5, color: "orange", title: title, colors: ["#061700", "#52c234"] },
    //     ];
    // } else {
    //     topExtraNodes = [
    //         { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 4) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 1, color: "orange", title: another, colors: ["#061700", "#52c234"] },
    //         { x: centerNode.x, y: centerNode.y - innerCircleRadius * 1.5, color: "orange", title: title, colors: ['#e52d27', '#b31217'] },
    //     ];
    // }


    const topNodes = [
        { x: centerX - innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapPengukuranSudut, color: 'purple' },
        centerNode, // Center node (red node)
        { x: centerX + innerCircleRadius * Math.cos(Math.PI / 3) * 2, y: centerY - innerCircleRadius * Math.sin(Math.PI / 3), image: MindMapOperasi, color: 'aqua' },
    ];


    const bottomNodes = [
        { x: centerX - outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapBangunDatar, color: 'yellow' },
        { x: centerX, y: centerY + outerRadius * 1.2 / 2, image: MindMapBangunRuang, color: 'green' },
        { x: centerX + outerRadius / 2.5, y: centerY + outerRadius / 3, image: MindMapPengumpulan, color: 'red' },
    ];

    function setNodes(titleNew: string) {
        let topExtraNodesLocal: NodeType[] = []

        if (titleNew === "FPB") {
            topExtraNodesLocal = [
                { x: centerNode.x - innerCircleRadius * Math.cos(Math.PI / 4) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 1, color: "orange", title: "KPK" },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 1.5, color: "orange", title: "FPB" },
            ];
        } else {
            topExtraNodesLocal = [
                { x: centerNode.x + innerCircleRadius * Math.cos(Math.PI / 4) * 1.5, y: centerNode.y - innerCircleRadius * Math.sin(Math.PI / 4) * 1, color: "orange", title: "FPB" },
                { x: centerNode.x, y: centerNode.y - innerCircleRadius * 1.5, color: "orange", title: "KPK" },
            ];
        }
        setTopExtraNodes(topExtraNodesLocal)
    }



    const handleImagePress = (index: number, pos: string, title?: string) => {
        // Do something when the image is pressed, e.g., show more information, navigate to another screen, etc.
        console.log(`index ${index}, pos ${pos} is Pressed`);
        if (pos === "ExtraBotTop") {
            navigation.navigate("babSatuDetail", {
                title: newTitle!,
                layout: index
            })
        } else if (pos === "Top") {
            if (index === 0) {
                navigation.navigate("babTigaMenu")
            } else if (index === 2) {
                navigation.navigate("babDuaMenu")

            }
        } else if (pos === "Bot") {
            if (index === 0) {
                navigation.navigate("babEmpatMenu")
            } else if (index === 1) {
                navigation.navigate("babLimaMenu")

            } else {
                navigation.navigate("babEnamMenu")
            }
        } else {
            setNodes(title!)
            setNewTitle(title!)
        }
    };

    useEffect(() => {
        setNodes(newTitle)
    }, [])


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
                        {/* <Circle cx={centerX} cy={centerY} r="30" fill="green" /> */}
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

                    <ItemBabSatu topExtraNodes={topExtraNodes} handleImagePress={handleImagePress} />


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