import React, { useState, useEffect } from 'react';
import { Card, Button, message } from 'antd';
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
            <div>
              <p>小组编号: {groupDetails.groupId}</p>
              <p>小组名称: {groupDetails.groupName}</p>
              <p>组长: {groupDetails.groupLeader}</p>
              <p>小组: {groupDetails.groupTeacher}</p>
              <p>小组名称: {groupDetails.presentationTimee}</p>
              <p>小组名称: {groupDetails.publicInfo}</p>
            </div>
        ) : (
            <div>
              <p>您当前不在任何小组内</p>
            </div>
        )}
      </Card>
  );
};

export default UserGroup;
