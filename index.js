import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Button } from 'antd';
import PubSub from 'pubsub-js';
import { treeData, TOPIC_KEYS } from './config';
import { Demo } from './components/demo';

const SelectButton = props => {
  const [isSelect, setIsSelect] = useState(false);

  const click = key => {
    setIsSelect(!isSelect);
    PubSub.publish(TOPIC_KEYS.click, [key, !isSelect]);
  };

  return (
    <Button onClick={() => click(props.itemKey)}>
      {isSelect ? 'Delete' : 'Add'} {props.itemKey}
    </Button>
  );
};

class App extends React.Component {
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
      return false;
    }
    console.log('click is in:', is_in, key);
    if (is_in) {
      this.state.allState[key] = [];
      this.setState({
        appVersion: this.state.appVersion + 1,
        allState: this.state.allState,
        appData: this.state.appData.filter(function(item) {
          return item.key != key;
        })
      });
    } else {
      let key_index = -1;
      for (var i = 0; i < treeData.length; i++) {
        if (key == treeData[i].key) {
          key_index = i;
          break;
        }
      }

      this.state.appData.push(Object.assign({}, treeData[key_index]));
      this.setState({
        appVersion: this.state.appVersion + 1,
        appData: [...this.state.appData]
      });
    }

    console.log('click:', this.state.appData);
  }

  componentDidMount() {
    this.pubsub_token = PubSub.subscribe(
      TOPIC_KEYS.click,
      function(topic, message) {
        console.log('====subscribe:', message);
        this.click(...message);
      }.bind(this)
    );
    this.pubsub_child = PubSub.subscribe(
      TOPIC_KEYS.check,
      function(topic, message) {
        console.log('====subscribe:', message);
        this.onChildChanged(...message);
      }.bind(this)
    );
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubsub_token);
    PubSub.unsubscribe(this.pubsub_child);
  }

  render() {
    return (
      <div>
        <div>
          {treeData.map(item => (
            <SelectButton itemKey={item.key} />
          ))}
        </div>
        <div style={{ float: 'left' }}>
          {this.state.appData.map(item => (
            <Demo
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
