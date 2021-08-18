import React, { useState } from 'react';
import { Tree } from 'antd';

export const TreeSingle = props => {
  const data = props.treeData;
  console.log(
    'initCheckKeys in TreeSingle:',
    props.initCheckKeys
    // props.parentVersion
  );
  console.log('data of in TreeSingle', data);
  const key = data[0].key;

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  console.log('checkedKeys of in TreeSingle', checkedKeys);

  const onExpand = expandedKeysValue => {
    console.log('onExpand', expandedKeysValue);
    console.log(expandedKeys);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeysValue => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    props.onCheck([key, checkedKeysValue]);
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
