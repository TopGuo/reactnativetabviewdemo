/* @flow */

import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  TabViewAnimated,
  TabBar,
  TabViewPagerExperimental,

} from '../tab/src';
import SimplePage from './SimplePage';

import type { Route, NavigationState } from '../tab/types';

type State = NavigationState<
  Route<{
    key: string,
    title: string,
  }>
  >;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class NativeDriverExample extends React.Component<*, State> {

  static title = 'With native animations';
  static appbarElevation = 0;

  state = {
    index: 1,
    routes: [
      { key: '1', title: '对我感兴趣' },
      { key: '2', title: '看过我' },
      { key: '3', title: '新职位' },
    ],
  };

  //滑动点击
  _handleIndexChange = index =>
    this.setState({
      index,
    });
  //渲染头部
  _renderHeader = props => (
    <View>
      <View style={{ backgroundColor: '#66cdaa', height: 50, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ borderWidth: 2, borderColor: '#fff', borderRadius: 8, height: 30, width: 130,  flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ alignItems: 'center',flex:1,backgroundColor: '#fff',justifyContent:'center' }}
          >
            <Text style={{ color: '#66cdaa' }}>
              聊天
            </Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1, borderColor: '#fff', height: 30, width: 1 }}></View>
          <TouchableOpacity
            style={{ alignItems: 'center', flex:1,justifyContent: 'center', backgroundColor: '#66cdaa' }}
          >
            <Text style={{ color: '#fff' }}>
              互动
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        labelStyle={styles.label}
      />
    </View>
  );



  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#ff4081' }}
          />
        );
      case '2':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#673ab7' }}
          />
        );
      case '3':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#4caf50' }}
          />
        );
      default:
        return null;
    }
  };

  _renderPager = props => <TabViewPagerExperimental {...props} />;

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        renderPager={this._renderPager}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
        useNativeDriver

      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#fff',//
  },
  indicator: {
    backgroundColor: '#66cdaa',
    height: 3,//下划线宽度
  },
  label: {
    color: '#939393',
    fontWeight: '400',
  },
});
