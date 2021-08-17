import React, { useState } from 'react';
import { Tree } from 'antd';
import PubSub from 'pubsub-js';
import { TOPIC_KEYS } from '../config';

export const Demo = props => {
  const data = props.ibbdData;
  console.log(
    'initCheckKeys in demo:',
    props.initCheckKeys,
    props.parentVersion
  );
  console.log('data of in demo', data);
  const key = data[0].key;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(props.initCheckKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [appVersion, setAppVersion] = useState(0);
  console.log('checkedKeys of in demo', checkedKeys);

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
    PubSub.publish(TOPIC_KEYS.check, [key, checkedKeysValue]);
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
