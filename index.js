import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import PubSub from 'pubsub-js';
import { treeData, TOPIC_KEYS } from './config';
import { TreeHoriz } from './components/TreeHoriz';
import { SelectButton } from './components/SelectButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allState: {},
      appData: []
      // appVersion: 0
    };
    console.log('------ App constructor --------- ');
  }

  // 数据版本
  dataVersion = 0;

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
        // appVersion: this.state.appVersion + 1,
        allState: this.state.allState,
        appData: this.state.appData.filter(function(item) {
          return item.key != key;
        })
      });
    } else {
      // 插入
      let key_index = -1;
      for (var i = 0; i < treeData.length; i++) {
        if (key == treeData[i].key) {
          key_index = i;
          break;
        }
      }

      this.state.appData.push(Object.assign({}, treeData[key_index]));
      this.setState({
        // appVersion: this.state.appVersion + 1,
        appData: [...this.state.appData]
      });
    }

    // 改变版本
    this.dataVersion++;
    console.log('click:', this.state.appData);
  }

  onChildChanged(data) {
    console.log('onCheck in App:', data);
  }

  componentDidMount() {
    // 订阅相应的事件
    this.pubsub_token = PubSub.subscribe(
      TOPIC_KEYS.click,
      function(topic, message) {
        console.log('===> subscribe click:', message);
        this.click(...message);
      }.bind(this)
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_token);
  }

  render() {
    return (
      <div>
        <div>
          {treeData.map(item => (
            <SelectButton
              key={item.key}
              itemKey={item.key}
              topicKey={TOPIC_KEYS.click}
            />
          ))}
        </div>
        <TreeHoriz
          treeData={this.state.appData}
          onChange={this.onChildChanged}
          version={this.dataVersion}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
