import {Marker} from "react-native-maps";

import {View} from 'react-native'

export function Markers({items}) {
    return (
        <View>
            {items.map(item => (<Marker
                coordinate={item}
                description="Кыргызский государственный университет"
                title="КГУСТА им. Насирдин Исанова"
                draggable={true}
            />))}
        </View>
    )
}