/* @flow */

import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';

import HeaderComponent from "./component/header";

import Chatwith from "./Chat/Chatwith";


export default class NativeDriverExample extends React.Component<*, State> {
    constructor(props) {
        super(props);
        this.state = {
            henderTab: 1,
        }
    }
    static navigationOptions = {
        headerTitleStyle: {
            alignSelf: 'center',
        },
        header: null,
    };

    //点击聊天
    _clickChatWith = () => {
        this.setState({
            henderTab: 1
        });
        Alert.alert('提示', '聊天', [{
            text: '我知道了'
        }]);
    };
    //点击互动
    _clickInteraction = () => {
        this.setState({
            henderTab: 2,
        });
        Alert.alert('提示', '互动', [{
            text: '我知道了'
        }]);
    };
    //渲染头部--自定义组件 头部
    _renderHeader = () => (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={this.state.henderTab == 1 ? styles.henderabFocus : styles.hendertabUnFocus}
                    onPress={() => { this._clickChatWith() }}
                >
                    <Text style={this.state.henderTab == 1 ? styles.henderabTextFocus : styles.hendertabTextUnFocus}>聊天</Text>

                </TouchableOpacity>
                <View style={{ borderWidth: 1, borderColor: '#fff', height: 30, width: 1 }}></View>
                <TouchableOpacity
                    style={this.state.henderTab == 2 ? styles.henderabFocus : styles.hendertabUnFocus}
                    onPress={() => { this._clickInteraction() }}
                >
                    <Text style={this.state.henderTab == 2 ? styles.henderabTextFocus : styles.hendertabTextUnFocus}>互动</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    //渲染主体--内容
    _renderContent = () => (
        this.state.henderTab == 1 ?
            (
                <Chatwith />
            ) :
            (<View>

            </View>)

    );
    render() {
        return (
          <Chatwith />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#66cdaa',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        height: 30,
        width: 130,
        flexDirection: 'row'
    },
    henderabFocus: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    henderabTextFocus: {
        color: '#66cdaa'
    },
    hendertabUnFocus: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#66cdaa'
    },
    hendertabTextUnFocus: {
        color: '#fff',
    }

});
