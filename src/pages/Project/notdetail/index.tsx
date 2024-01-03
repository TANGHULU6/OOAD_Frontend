import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, List } from 'antd';

import styles from './BaseView.less';

const NotDetail = () => {
  const { notId } = useParams<any>();
  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>项目通知详情 {notId}</div>
        </>
      }
    </div>
  );
};

export default NotDetail;
