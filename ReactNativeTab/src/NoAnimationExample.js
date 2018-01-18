/* @flow */

import * as React from 'react';
import {
  AsyncStorage,
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { TabViewAnimated } from '../tab/src';
import { Ionicons } from '@expo/vector-icons';
import BasicListView from './BasicListView';
//顶部滑动组件
import NativeDriverExample from './NativeDriverExample';

import type { Route, NavigationState } from '../tab/types';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

type State = NavigationState<
  Route<{
    key: string,
    title: string,
    icon: string,
  }>
  >;

export default class TopBarIconExample extends React.Component<*, State> {
  static navigationOptions = {
    header: null,
  };
  static title = 'No animation';
  static backgroundColor = '#f4f4f4';
  static tintColor = '#222';
  static appbarElevation = 4;

  state = {
    index: 0,
    routes: [
      { key: '1', title: '职位', icon: 'ios-star' },
      { key: '2', title: '公司', icon: 'ios-albums' },
      { key: '3', title: '消息', icon: 'ios-search' },
      { key: '4', title: '我的', icon: 'ios-navigate' },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  //tab上文字
  _renderLabel = ({ position, navigationState }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? '#2196f3' : '#939393')
    );
    const color = position.interpolate({
      inputRange,
      outputRange,
    });
    return (
      <Animated.Text style={[styles.label, { color }]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderIcon = ({ navigationState, position }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((x, i) => i);
    const filledOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 1 : 0)),
    });
    const outlineOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 0 : 1)),
    });
    return (
      <View style={styles.iconContainer}>
        <AnimatedIcon
          name={route.icon}
          size={26}
          style={[styles.icon, { opacity: filledOpacity }]}
        />
        <AnimatedIcon
          name={route.icon + '-outline'}
          size={26}
          style={[styles.icon, styles.outline, { opacity: outlineOpacity }]}
        />
      </View>
    );
  };
  //渲染头部
  _renderHeader = props => (
    <View style={{ backgroundColor: '#66cdaa', height: 50 }}>


    </View>
  );

  _renderFooter = props => (
    <View style={styles.tabbar}>
      {props.navigationState.routes.map((route, index) => {
        return (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => props.jumpToIndex(index)}
          >
            <Animated.View style={styles.tab}>
              {this._renderIcon(props)({ route, index })}
              {this._renderLabel(props)({ route, index })}
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <BasicListView
            style={[styles.page, { backgroundColor: '#E3F4DD' }]}
          />
        );
      case '2':
        return (
          <BasicListView
            style={[styles.page, { backgroundColor: '#E6BDC5' }]}
          />
        );
      case '3':
        return (
          // <BasicListView
          //   style={[styles.page, { backgroundColor: '#9DB1B5' }]}
          // />
          <NativeDriverExample />
        );
      case '4':
        return (
          <BasicListView
            style={[styles.page, { backgroundColor: '#EDD8B5' }]}
          />

        );

      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
        animationEnabled={false}
        swipeEnabled={false}

      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#3cb371',//'#222',
    height: Platform.OS === 'ios' ? 20 : 25,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',//tab颜色
    height: 70,//tabbar 高度 （不填默认自动适配）
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',//控制图标和文字垂直居中
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    paddingTop: 4.5,
  },
  iconContainer: {
    height: 26,
    width: 26,
  },
  icon: {
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: '#0084ff',//控制图标颜色(焦点集中)
  },
  outline: {
    color: '#939393',//（图标颜色焦点失去）
  },
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 1.5,
    backgroundColor: 'transparent',
  },
  page: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
