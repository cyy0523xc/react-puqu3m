import React from 'react';
import PubSub from 'pubsub-js';
import { TreeSingle } from './TreeSingle';

export class TreeHoriz extends React.Component {
  /**
   * :param props:
   *     data: dict 数据
   *     topicKey: string pubsub-js用于通信的key，不能和其他的key冲突
   *     update
   */
  constructor(props) {
    super(props);
    this.state = {
      allState: {},
      appData: [],
      appVersion: 0
    };
  }

  onChildChanged(key, checkedKeys) {
    this.state.allState[key] = checkedKeys;
    console.log('onChildChanged:', key, checkedKeys);
    this.setState({
      allState: Object.assign({}, this.state.allState)
    });
  }

  click(key, isSelect) {
    console.log(key, isSelect);
    let is_in = false;
    for (var i = 0; i < this.state.appData.length; i++) {
      let v = this.state.appData[i];
      if (v.key == key) {
        is_in = true;
        break;
      }
    }
    if (isSelect == is_in) {
      // 如果目标状态和当前状态已经一致，则无效重新渲染
      return false;
    }
    console.log('click is in:', is_in, key);
    if (is_in) {
      // 删除
      this.state.allState[key] = [];
      this.setState({
        appVersion: this.state.appVersion + 1,
        allState: this.state.allState,
        appData: this.state.appData.filter(function(item) {
          return item.key != key;
        })
      });
    } else {
      // 插入
      let key_index = -1;
      for (var i = 0; i < this.props.data.length; i++) {
        if (key == this.props.data[i].key) {
          key_index = i;
          break;
        }
      }

      this.state.appData.push(Object.assign({}, this.props.data[key_index]));
      this.setState({
        appVersion: this.state.appVersion + 1,
        appData: [...this.state.appData]
      });
    }

    console.log('click:', this.state.appData);
  }

  componentDidMount() {
    // 订阅相应的事件
    this.pubsub_child = PubSub.subscribe(
      this.props.topicKey,
      function(topic, message) {
        console.log('====subscribe child:', message);
        this.onChildChanged(...message);
      }.bind(this)
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_child);
  }

  render() {
    return (
      <div style={{ float: 'left' }}>
        {this.state.appData.map(item => (
          <TreeSingle
            ibbdData={[item]}
            initCheckKeys={
              item.key in this.state.allState
                ? this.state.allState[item.key]
                : []
            }
            parentVersion={this.state.appVersion}
          />
        ))}
      </div>
    );
  }
}
