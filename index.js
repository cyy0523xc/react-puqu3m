import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Tree, Button } from 'antd';
//import PubSub from 'pubsub-js'

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0'
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1'
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2'
          }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0'
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1'
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2'
          }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0-0',
        key: '0-1-0-0'
      },
      {
        title: '0-1-0-1',
        key: '0-1-0-1'
      },
      {
        title: '0-1-0-2',
        key: '0-1-0-2'
      }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
];

const Demo = props => {
  const data = props.ibbdData;
  const initCheckKeys = props.initCheckKeys;
  const callParent = props.callParent;
  const appVersion = props.appVersion;
  console.log('initCheckKeys in demo:', initCheckKeys);
  console.log('data of in demo', data);
  const key = data[0].key;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(initCheckKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [childVersion, setChildVersion] = useState(appVersion);
  console.log('checkedKeys of in demo', checkedKeys);

  if (appVersion != childVersion) {
    // 通过版本号来判断是否需要重新设置默认选中状态
    setChildVersion(appVersion);
    setCheckedKeys(initCheckKeys);
  }

  const onExpand = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    console.log(expandedKeys);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    callParent(key, checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    console.log(selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={data}
    />
  );
};

var allCheckKeys = {};
for (var i = 0; i < treeData.length; i++) {
  allCheckKeys[treeData[i].key] = [];
}

const App = () => {
  const [appData, setAppData] = useState([]);
  const [appVersion, setAppVersion] = useState(0);

  const onChildChanged = (key, checkedKeys) => {
    allCheckKeys[key] = checkedKeys;
    console.log('onChildChanged:', key, checkedKeys);
  };

  const click = key => {
    console.log('click:', treeData, key);
    console.log('click:', key);
    let is_in = false;
    let index = 0;
    for (var i = 0; i < appData.length; i++) {
      let v = appData[i];
      if (v.key == key) {
        is_in = true;
        index = i;
        break;
      }
    }
    console.log('click:', is_in, index);

    if (is_in) {
      appData.splice(index, 1);
      // 改变状态
      allCheckKeys[key] = [];
    } else {
      let key_index = -1;
      for (var i = 0; i < treeData.length; i++) {
        if (key == treeData[i].key) {
          key_index = i;
          break;
        }
      }
      appData.push(treeData[key_index]);
    }
    setAppData(appData);
    setAppVersion(appVersion + 1);
    console.log('click:', appData);
  };

  useEffect(() => {
    console.log('模拟componentDidMount，即只运行一次该函数');
  }, []);

  return (
    <div>
      <div>
        <Button onClick={() => click('0-0')}>Select 0-0</Button>
        <Button onClick={() => click('0-1')}>Select 0-1</Button>
      </div>
      <div style={{ float: 'left' }}>
        {appData.map(item => (
          <Demo
            ibbdData={[item]}
            initCheckKeys={allCheckKeys[item.key]}
            callParent={onChildChanged}
            appVersion={appVersion}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
