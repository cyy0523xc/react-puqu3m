import React, { useState } from 'react';
import { Tree } from 'antd';
import PubSub from 'pubsub-js';

export const TreeSingle = props => {
  const data = props.treeData;
  console.log(
    'initCheckKeys in TreeSingle:',
    props.initCheckKeys,
    props.parentVersion
  );
  console.log('data of in TreeSingle', data);
  const key = data[0].key;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(props.initCheckKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [appVersion, setAppVersion] = useState(0);
  console.log('checkedKeys of in TreeSingle', checkedKeys);

  if (props.parentVersion != appVersion) {
    // 父节点版本更新，意味着组件重新渲染，这时需要重新设置初始值
    console.log('-------Before checkedKeys:');
    setAppVersion(props.parentVersion);
    setCheckedKeys(props.initCheckKeys);
    console.log('-------After checkedKeys:');
  }
  const onExpand = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue);
    console.log(expandedKeys);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    PubSub.publish(props.topicKey, [key, checkedKeysValue]);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    console.log(selectedKeysValue);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      style={{ float: 'left' }}
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
