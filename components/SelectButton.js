import React, { useState } from 'react';
import { Button } from 'antd';
import PubSub from 'pubsub-js';

export const SelectButton = props => {
  const [isSelect, setIsSelect] = useState(false);

  const click = key => {
    setIsSelect(!isSelect);
    PubSub.publish(props.topicKey, [key, !isSelect]);
  };

  return (
    <Button onClick={() => click(props.itemKey)}>
      {isSelect ? 'Delete' : 'Add'} {props.itemKey}
    </Button>
  );
};
