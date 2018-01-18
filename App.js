import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
} from 'react-navigation';

//import index from './SegmentNav/Index'
//boss 入口
import index from './ReactNativeTab/src/NoAnimationExample'
//BottomBarIconTextExample 底部有消息标题
//import index from './ReactNativeTab/src/BottomBarIconTextExample';
//NativeDriverExample 顶部滑动导航
//import index from './ReactNativeTab/src/NativeDriverExample';

//单页
//消息
import messageinfo from './ReactNativeTab/src/Message/index'

const App = StackNavigator({
    
    index: { screen: index },
    messageinfo:{screen:messageinfo},
},{
    header:null,//这个通用配置不管用
});


export default App;


