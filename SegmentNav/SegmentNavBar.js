
'use strict'

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Platform
} from 'react-native';

import React, { Component, PropTypes } from 'react'

import SegmentNavBarItem from './SegmentNavBarItem';
import SegmentTab from './SegmentTab';


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default class SegmentNavBar extends Component {
  static Item = SegmentNavBarItem;

  // static propTypes = {
  //   navTitles: PropTypes.array,         // 导航栏顶部显示所有的title
  //   segmentWidth: PropTypes.width,      // segment宽度
  //   segmentHeight: PropTypes.height,    // segment高度
  //   tintColor: PropTypes.string,        // segment 颜色
  //   activeTabTextStyle: View.propTypes.style,
  //   navigator: PropTypes.node,           // 导航条
  //   titleSize: PropTypes.number
  // };

  // static defaultProps = {
  //   defaultPage: 0,
  //   navTitles: ['title'],
  //   segmentWidth: 260,
  //   segmentHeight: 32,
  //   tintColor: '#F95142',
  //   activeTabTextStyle: {},
  //   titleSize: 15
  // };

  // static propTypes = {
  //   ...View.propTypes,
  //   style: View.propTypes.style,
  //   defaultPage: React.PropTypes.number,
  //   onItemSelected: React.PropTypes.func,
  // };

  constructor(props) {
    super(props);

    this.visibles = [];
    this.pointIndex = -1;
    this.state = {
      selectedIndex: 0,
    }
  }


  render() {
    let children = this.props.children;
    if (!children.length) {
      throw new Error("at least two child component are needed.");
    }
    let navTitles = [];
    const contentViews = children.map((child, i) => {
      let title = child.props.title;
      navTitles.push(title);

      if (!this.visibles[i]) {
        return null;
      } else {
        const style = this.state.selectedIndex === i ? styles.base : [styles.base, styles.gone];
        return (
          <View
            key={'view_' + i}
            style={style}>
            {child}
          </View>
        );
      }
    });


    let navView = this._navView(navTitles);
    let navigator = this.props.navigator;
    if (navigator) {
      navigator = navigator(navView);
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {navigator}
        <View style={styles.contentView}>
          {contentViews}
        </View>

      </View>
    );
  }

  componentDidMount() {
    let page = this.props.defaultPage;

    if (page >= this.props.children.length || page < 0) {
      page = 0;
    }
    this.update(page);
  }

  update(index) {
    this.visibles[index] = true;
    this.setState({
      selectedIndex: index,
    });

    if (this.props.onItemSelected) {
      this.props.onItemSelected(index);
    }
  }


  _navView(titles) {
    let tintColor = this.props.tintColor;
    return (
      <SegmentTab values={titles}
        tabsContainerStyle={{ height: this.props.segmentHeight, width: this.props.segmentWidth }}
        activeTabStyle={{ backgroundColor: tintColor, }}
        tabStyle={{ borderColor: tintColor }}
        activeTabTextStyle={[{ color: '#ffffff', fontFamily: 'PingFangSC-Regular', fontSize: this.props.titleSize }, this.props.activeTabTextStyle]}
        tabTextStyle={{ color: tintColor, fontSize: this.props.titleSize }}
        onTabPress={index => this.handleSegmentChange(index)} />
    );
  }

  handleSegmentChange(index) {
    this.update(index);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    overflow: 'hidden',
  },
  contentView: {
    flex: 1,
    //  backgroundColor: 'red'
  },
  navTopView: {
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: 'rgba(248,248,249,0.90)',
  },
  base: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gone: {
    top: windowHeight,
    bottom: -windowHeight,
  },
  horizonLine: {
    backgroundColor: '#d4d4d4',
    height: 0.8,
    width: windowWidth,
  },
});
