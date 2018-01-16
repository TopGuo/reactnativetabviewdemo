'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';


export default class ThreePage extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>ThreePage</Text>
            </View>
        );
    }
}

const  styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
});