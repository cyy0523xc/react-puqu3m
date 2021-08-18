import React, { useState } from 'react';
import { Tree } from 'antd';

/**
 * treeData:
 * onCheck:
 */
export const TreeSingle = props => {
  const data = props.treeData;
  const key = data[0].key;
  console.log('====== TreeSingle RUN:', key, data);

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue);
    console.log(expandedKeys);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    // 数据返回给父组件
    props.onCheck(key, checkedKeysValue);
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
