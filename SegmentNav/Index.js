
'use strict';
import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Alert,
    StyleSheet,
} from 'react-native';

import SegmentNavBar from './SegmentNavBar'

const STATE_WIDTH = 200;
import TwoPage from './TwoPage'
import ThreePage from './ThreePage'

export default class OnePage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.nameAnimated}`,
        header: null,
    });

    render() {
        return (<SegmentNavBar
            ref='segNavBar'
            segmentWidth={STATE_WIDTH}
            segmentHeight={30}
            titleSize={13}
            navigator={this._navigator}
            onItemSelected={(index) => {

            }}>
            {this._createTabItem('商品管理')}
            {this._createTabItem('分组管理')}
        </SegmentNavBar>
        );
    }

    _navigator(navView) {
        return (
            <View style={styles.container}>
                {navView}
            </View>
        )
    };


    _createTabItem(title) {
        return (
            <SegmentNavBar.Item
                title={title}
                onPress={() => {

                }}>
                {this._renderComponent(title)}
            </SegmentNavBar.Item>
        );
    };



    _renderComponent(title) {
        const { navigation } = this.props;
        if (title === '商品管理') {
            return (<View style={styles.mainView} >
                <TwoPage navigation={navigation} />
            </View>);
        } else if (title === '分组管理') {
            return (<View style={styles.mainView}>
                <ThreePage navigation={navigation} />
            </View>);
        }
    };

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    mainView: {
        flex: 1,
    }

});

