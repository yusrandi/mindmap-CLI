import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { NodeType } from '../../type/NodeType'

interface props {
    topExtraNodes: NodeType[],
    handleImagePress: (index: number, pos: string, title: string) => void
}
export default function ItemBabTiga({ topExtraNodes, handleImagePress }: props) {
    return (
        <View style={{ position: 'absolute' }}>
            {
                topExtraNodes.map((node, index) => (
                    <TouchableWithoutFeedback key={index + 9}
                        onPress={() => handleImagePress(index, "ExtraBot", node.title)}>
                        <View style={{ position: 'absolute', top: node.y - 30, left: node.x - 30, width: 60, height: 60, backgroundColor: "white", borderColor: node.color, borderWidth: 3, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: 'black', fontSize: 9, textAlign: 'center' }}>{node.title}</Text>
                        </View>

                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    )
}