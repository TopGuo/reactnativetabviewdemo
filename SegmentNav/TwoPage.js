import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';


export default class TwoPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.nameAnimated}`,
        header: null,
    });


    render() {
        return (
            <View style={styles.container}>
                <Text>TwoPage</Text>
                <Button msgName="点击跳转" onPress={() => {

                }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});