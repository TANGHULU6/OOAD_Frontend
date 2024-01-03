import React, { useState, useEffect } from 'react';
import {Card, Button, message, Descriptions} from 'antd';
import {
  getCurrentUserGroupInProject,
  getGroupDetails,
} from '@/services/ant-design-pro/api';

const UserGroup = ({ projectId, courseId }) => {
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    fetchUserGroupDetails();
  }, [projectId]);

  const fetchUserGroupDetails = async () => {
    try {
      const response = await getCurrentUserGroupInProject(projectId);
      if (response) {
        const data = await getGroupDetails(response);
        setGroupDetails({
          groupId: response,
          groupName: data.groupName,
          groupLeader: data.groupLeader,
          defenceTeacher: data.defenceTeacher,
          presentationTime: data.presentationTime,
          publicInfo: data.publicInfo
        });
      } else {
        // Handle case where user is not in any group
        setGroupDetails(null);
      }
    } catch (error) {
      message.error('获取用户小组详情失败');
    }
  };


  return (
      <Card title="用户小组">
        {groupDetails ? (
          <Descriptions title="小组详情" bordered>
            <Descriptions.Item label="小组编号" span={3}>{groupDetails.groupId}</Descriptions.Item>
            <Descriptions.Item label="小组名称" span={3}>{groupDetails.groupName}</Descriptions.Item>
            <Descriptions.Item label="组长" span={3}>{groupDetails.groupLeader}</Descriptions.Item>
            <Descriptions.Item label="小组答辩老师" span={3}>{groupDetails.defenceTeacher}</Descriptions.Item>
            <Descriptions.Item label="答辩时间" span={3}>{new Date(groupDetails.presentationTime).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="公开信息" span={3}>{groupDetails.publicInfo}</Descriptions.Item>
          </Descriptions>
        ) : (
            <div>
              <p>您当前不在任何小组内</p>
            </div>
        )}
      </Card>
  );
};

export default UserGroup;
