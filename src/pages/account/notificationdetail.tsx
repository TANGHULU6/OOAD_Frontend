import { Card, List, Switch } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { getNotices } from '@/services/ant-design-pro/api';
import { history } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const Notificationdetail: React.FC = () => {
  const [des, setDes] = useState<any>({});
  useEffect(() => {
    (async () => {
      const { query } = history.location;
      console.log(query);
      setDes(query);
    })();
  }, []);

  return (
    <div>
      <Card style={{ height: '400px' }}>
      <div style={{ margin: '20px' }}>
        <b>消息详情：</b>
      </div>
      <div style={{ margin: '20px' }}><b>{des.title}</b></div>
      <div>{des.message=="undefined"?'':des.message}</div>
    </Card>
    </div>
  );
};

export default Notificationdetail;
