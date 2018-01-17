/* @flow */

import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
      { key: '1', title: '对我感兴趣'},
      { key: '2', title: '看过我' },
      { key: '3', title: '新职位' },
    ],
  };

  //滑动点击
  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderHeader = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
    />
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
    height:3,//下划线宽度
  },
  label: {
    color: '#939393',
    fontWeight: '400',
  },
});
