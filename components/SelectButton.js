import React, { useState } from 'react';
import { Button } from 'antd';
import PubSub from 'pubsub-js';
import { TOPIC_KEYS } from '../config';

export const SelectButton = props => {
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
