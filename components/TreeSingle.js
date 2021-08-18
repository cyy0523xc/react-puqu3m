import React, { useState } from 'react';
import { Tree } from 'antd';

/**
 * @property treeData:
 * @property onCheck:
 * @property onDelete:
 */
export class TreeSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      autoExpandParent: true
    };
    console.log('------ TreeSingle constructor --------- ');
  }

  onExpand(expandedKeysValue) {
    console.log('onExpand', expandedKeysValue);
    this.setState({
      expandedKeys: expandedKeysValue,
      autoExpandParent: false
    });
  }

  onCheck(checkedKeysValue) {
    console.log('onCheck', checkedKeysValue);
    this.setState({
      checkedKeys: checkedKeysValue
    });
    // 数据返回给父组件
    this.props.onCheck(this.props.treeData[0].key, checkedKeysValue);
  }

  onSelect(selectedKeysValue, info) {
    console.log('onSelect', info);
    console.log(selectedKeysValue);
    this.setState({
      selectedKeys: selectedKeysValue
    });
  }

  componentWillUnmount() {
    this.props.onDelete(this.props.treeData[0].key);
  }

  render() {
    return (
      <Tree
        style={{ float: 'left' }}
        checkable
        {...this.state}
        onExpand={v => {
          this.onExpand(v);
        }}
        onCheck={v => {
          this.onCheck(v);
        }}
        onSelect={(v, info) => {
          this.onSelect(v, info);
        }}
        treeData={this.props.treeData}
      />
    );
  }
}
