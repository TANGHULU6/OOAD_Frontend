import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {getProjectDelGroups, getGroupDetails, joinGroups, leaveGroups,GroupUpdate} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {history, useAccess} from 'umi';
import moment from 'moment';

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
  const access = useAccess();
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
            <Button
              onClick={(e) => {e.stopPropagation();handleEditClick(record);}} disabled={!access.canTeacher}
            >
              编辑
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleEditClick = (record) => {
    setCurrentRecord(record);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedRecord) => {
    console.log('编辑 clicked for record:', updatedRecord);

    try {
      // 等待异步获取数据
      const data = await getGroupDetails(updatedRecord.groupId);

      // 确保 data 已经被成功获取后再执行更新
      await GroupUpdate({
        groupId: updatedRecord.groupId,
        groupName: updatedRecord.name,
        groupLeader: data.groupLeader,
        defenceTeacher: data.defenceTeacher,
        presentationTime: data.presentationTime,
        publicInfo: updatedRecord.publicInfo
      });

      setIsEditing(false);
    } catch (error) {
      // 错误处理
      console.error('Failed to update group:', error);
    }
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
  const handleDateChange = (date, dateString) => {
    setCurrentRecord({ ...currentRecord, presentationTime: dateString });
  };
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
                    // history.push(`/group`);
                  },
                };
              }}
              dataSource={groupList}
            />
          </div>
        </>
      }
      {isEditing && (
        <div className={styles.editForm}>
          <Card>
            {/* 这里放置编辑表单，根据 currentRecord 的数据来填充 */}
            {/* 例如: */}
            <p>答辩教师: <input type="text" value={currentRecord?.defenceTeacher} /></p>
            <p>
              答辩时间:
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={currentRecord ? moment(currentRecord.presentationTime) : null}
                onChange={handleDateChange}
              />
            </p>
            {/* 添加其他必要的字段 */}
            <Button onClick={() => handleUpdate(currentRecord)}>保存更改</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GroupOverview;
