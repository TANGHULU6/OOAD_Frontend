import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Button, List, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import {
  getProjectDelGroups, //获取小组列表 参数projectId
  getProjectDelGroups2, //查询用户在哪个小组内 参数projectId
  joinGroups, //用户加入小组 参数groupId
  leaveGroups, //用户退出小组 参数groupId
} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { history, useAccess } from 'umi';

interface DataType {
  groupName: string;
  groupCurrentNumber: string;
  groupMaxNumber: string;
  publicInfo: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '小组名称',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: '小组当前人数',
    dataIndex: 'groupCurrentNumber',
    key: 'groupCurrentNumber',
  },
  {
    title: '小组最大人数',
    dataIndex: 'groupMaxNumber',
    key: 'groupMaxNumber',
  },
  {
    title: '小组公开信息',
    key: 'publicInfo',
    dataIndex: 'publicInfo',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            handleJoin(record);
          }}
        >
          加入
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            handleExit(record);
          }}
        >
          退出
        </Button>
      </Space>
    ),
  },
];

//加入小组
const handleJoin = async (record: DataType) => {
  console.log('加入 clicked for record:', record);
  await joinGroups({ groupId: 1 });
};
//退出小组
const handleExit = async (record: DataType) => {
  console.log('退出 clicked for record:', record);
  await leaveGroups({ groupId: 1 });
};

const data: DataType[] = [
  {
    groupName: '小组名称',
    groupCurrentNumber: '10',
    groupMaxNumber: '100',
    publicInfo: '公开信息',
  },
];

interface GroupOverviewProps {
  projectId: number; // 传入的 projectId 属性
}

const GroupOverview: React.FC<GroupOverviewProps> = ({ projectId }) => {
  const [groupList, setGroupList] = useState<any>([]);
  useEffect(() => {
    // 定义一个异步函数来获取分组列表
    async function fetchGroupList() {
      try {
        // 发起异步请求获取分组列表
        const mydata = await getProjectDelGroups(projectId);

        // 使用从异步请求获取的数据更新状态
        setGroupList(mydata);
      } catch (error) {
        // 如果有错误发生，你可以在这里处理它(例如，设置错误状态或者打印到控制台)
        console.error('Failed to fetch group list:', error);
      }
    }
    console.log('🚀 ~ file: GroupOverview.tsx:185 ~ groupList:', groupList);

    // 调用上面定义的异步函数来获取数据
    fetchGroupList();
  }, [projectId]); // 这里的projectId是这个effect的依赖项，如果它变化了，effect会重新运行
  const access = useAccess();

  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.right}>
            <div className={styles.mytit}>项目内小组详情</div>
            <Table
              columns={columns}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    console.log('🚀 ~ file: index.tsx:192 ~ ProjectDetail ~ event:', record);
                    history.push(`/group`);
                  },
                };
              }}
              dataSource={groupList}
            />
          </div>
        </>
      }
    </div>
  );
};

export default GroupOverview;
