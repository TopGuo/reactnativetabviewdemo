'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';


export default class FourPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.nameAnimated}`,
        header:null,
    });


    render(){
        return(
            <View style={styles.container}>
                <Text>FourPage</Text>
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