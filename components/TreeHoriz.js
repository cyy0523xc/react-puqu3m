import React from 'react';
import { TreeSingle } from './TreeSingle';

/**
 * @property treeData: 树结构数据
 * @property version: 数据版本, 输入数据更新的时候, 该版本号应该更新
 * @property onChange: function(data), 数据更新的时候, 回调函数
 */
export class TreeHoriz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedKeysValue: {},
      treeData: props.treeData
    };
    console.log('------ TreeHoriz constructor --------- ');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.version !== nextProps.version) {
      this.setState({
        treeData: nextProps.treeData
      });
      this.props = nextProps;
    }
  }

  // 保存选中的数据
  checkedKeysValue = {};

  onCheck(key, values) {
    console.log('onCheck in TreeHoriz:', key, values);
    console.log(this.checkedKeysValue);
    console.log(this.state.treeData);
    this.checkedKeysValue[key] = values;

    // 数据返回给父组件
    this.props.onChange(this.checkedKeysValue);
  }

  onDelete(key) {
    if (key in this.checkedKeysValue) {
      delete this.checkedKeysValue[key];
      console.log('delete:', this.checkedKeysValue);
      this.props.onChange(this.checkedKeysValue);
    }
  }

  render() {
    return (
      <div>
        {this.state.treeData.map(item => (
          <TreeSingle
            key={item.key} // key值应该保持全局唯一性
            treeData={[item]}
            onCheck={this.onCheck.bind(this)}
            onDelete={this.onDelete.bind(this)}
          />
        ))}
      </div>
    );
  }
}
