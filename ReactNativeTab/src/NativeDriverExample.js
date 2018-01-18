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
    henderTab:1,
  };

  //滑动点击
  _handleIndexChange = index =>
    this.setState({
      index,
    });

    //点击聊天
  _clickChatWith = () => {
    this.setState({
      henderTab:1
    });
    Alert.alert('提示','聊天',[{
      text:'我知道了'
    }]);
  };
  //点击互动
  _clickInteraction=()=>{
    this.setState({
      henderTab:2,
    });
    Alert.alert('提示','互动',[{
      text:'我知道了'
    }]);
  };
  //渲染头部
  _renderHeader = props => (
    <View>
      <View style={{ backgroundColor: '#66cdaa', height: 50, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ borderWidth: 2, borderColor: '#fff', borderRadius: 8, height: 30, width: 130,  flexDirection: 'row' }}>
          <TouchableOpacity
            style={this.state.henderTab==1?styles.henderabFocus:styles.hendertabUnFocus}
            onPress={()=>{this._clickChatWith()}}
          >
            <Text style={this.state.henderTab==1?styles.henderabTextFocus:styles.hendertabTextUnFocus}>
              聊天
            </Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 1, borderColor: '#fff', height: 30, width: 1 }}></View>
          <TouchableOpacity
            style={this.state.henderTab==2?styles.henderabFocus:styles.hendertabUnFocus}
            onPress={()=>{this._clickInteraction()}}
          >
            <Text style={this.state.henderTab==2?styles.henderabTextFocus:styles.hendertabTextUnFocus}>
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
//控制滚屏
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
  henderabFocus:{
    alignItems: 'center',
    flex:1,
    backgroundColor: '#fff',
    justifyContent:'center'
  },
  henderabTextFocus:{
    color: '#66cdaa'
  },
  hendertabUnFocus:{
    alignItems: 'center', 
    flex:1,
    justifyContent: 'center',
    backgroundColor: '#66cdaa'
  },
  hendertabTextUnFocus:{
    color: '#fff',
  }

});
