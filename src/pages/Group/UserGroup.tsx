import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import {
  getCurrentUserGroupInProject,
  getGroupDetails,
  joinGroup,
  leaveGroup
} from '@/services/ant-design-pro/api';

const UserGroup = () => {
  const [groupDetails, setGroupDetails] = useState(null);
  const { projectId } = useParams(); // Assuming projectId is passed in URL

  useEffect(() => {
    // if (projectId) {
    //   fetchUserGroupDetails();
    // }
    fetchUserGroupDetails();
  }, [projectId]);

  const fetchUserGroupDetails = async () => {
    try {
      const response = await getCurrentUserGroupInProject(1);
      const data = await getGroupDetails(response.groupId)
      setGroupDetails({
        groupName: data.groupName,
        groupLeader: data.groupLeader,
        defenceTeacher: data.defenceTeacher,
        presentationTime: data.presentationTime,
        publicInfo:data.publicInfo
      });
    } catch (error) {
      message.error('获取用户小组详情失败');
    }
  };

  const handleJoinGroup = async () => {
    try {
      await joinGroup(groupDetails.groupId);
      message.success('成功加入小组');
      fetchUserGroupDetails();
    } catch (error) {
      message.error('加入小组失败');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(groupDetails.groupId);
      message.success('已退出小组');
      setGroupDetails(null); // Clear group details after leaving
    } catch (error) {
      message.error('退出小组失败');
    }
  };

  return (
    <Card title="用户小组">
      {groupDetails ? (
        <div>
          <p>小组名称: {groupDetails.groupName}</p>
          <p>组长: {groupDetails.groupLeader}</p>
          <Button onClick={handleLeaveGroup}>退出小组</Button>
        </div>
      ) : (
        <div>
          <p>您当前不在任何小组内</p>
          <Button onClick={handleJoinGroup}>加入小组</Button>
        </div>
      )}
    </Card>
  );
};

export default UserGroup;
