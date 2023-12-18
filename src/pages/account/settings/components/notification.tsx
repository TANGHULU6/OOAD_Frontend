import { List, Switch } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { getNotices } from '@/services/ant-design-pro/api';
import { history } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;
const NotificationView: React.FC = () => {
  const [lists, setLists] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const res = await getNotices();
      console.log('🚀 ~ file: base.tsx:55 ~ res:', res);
      setLists(res.data);
    })();
  }, []);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={lists}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              console.log(item);
              history.push(
                `/account/notificationdetail?id=${item.id}&title=${item.title}&message=${item.message}`,
              );
            }}
          >
            <List.Item.Meta title={'通知 ' + (index + 1)} description={item.title} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationView;
