import React, {useEffect, useState} from 'react';
import {Button, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {getProjectDelGroups, joinGroups, leaveGroups,} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {history, useAccess} from 'umi';
import {toNumber} from "lodash";

interface DataType {
  groupId: number;
  name: string;
  groupCurrentNumber: string;
  groupMaxNumber: string;
  publicInfo: string;
  projectId: number;
}

interface GroupOverviewProps {
  projectId: number; // 传入的 projectId 属性
}

const GroupOverview: React.FC<GroupOverviewProps> = ({ projectId }) => {
  const [groupList, setGroupList] = useState<any>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: '小组名称',
      dataIndex: 'name',
      key: 'name',
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
                  handleJoin(record, projectId);
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
  const handleJoin = async (record: DataType, projectId: number) => {
    console.log('加入 clicked for record:', record);
    await joinGroups({ projectId: projectId, groupId: record.groupId });
  };
//退出小组
  const handleExit = async (record: DataType) => {
    console.log('退出 clicked for record:', record);
    await leaveGroups({ groupId: record.groupId });
  };


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
