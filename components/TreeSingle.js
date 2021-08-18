import React from 'react';
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
        onExpand={this.onExpand.bind(this)}
        onCheck={this.onCheck.bind(this)}
        onSelect={this.onSelect.bind(this)}
        treeData={this.props.treeData}
      />
    );
  }
}
