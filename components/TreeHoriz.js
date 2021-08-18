import React from 'react';
import { TreeSingle } from './TreeSingle';

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

    // 清理旧数据
    let keys = [];
    this.state.treeData.map(v => {
      keys.push(v.key);
    });
    console.log('not delete:', keys);
    for (var k in this.checkedKeysValue) {
      console.log('==', k);
      if (!k in keys) {
        delete this.checkedKeysValue[k];
        console.log('delete:', this.checkedKeysValue);
      }
    }

    // 数据返回给父组件
    this.props.onCheck(this.checkedKeysValue);
  }

  render() {
    return (
      <div>
        {this.state.treeData.map(item => (
          <TreeSingle
            key={item.key}
            treeData={[item]}
            onCheck={(k, v) => {
              this.onCheck(k, v);
            }}
          />
        ))}
      </div>
    );
  }
}
