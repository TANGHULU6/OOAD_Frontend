import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Space, Table, Button, List, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import {
  projectDelUpdate, //更新项目信息 参数projectId
  getProjectDel, //获取项目信息 参数projectId
} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { history, useAccess } from 'umi';

interface ProjectOverviewProps {
  projectId: number; // 传入的 projectId 属性
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projectId }) => {
  const [projectDel, setProjectDel] = useState<any>({});
  const [groupList, setGroupList] = useState<any>({});
  const access = useAccess();
  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>
            <div className={styles.mytit}>项目详情</div>
            <ProForm
              layout="vertical"
              submitter={{
                submitButtonProps: {
                  // 设置为不可点击
                  disabled: !access.canTA,
                },
                searchConfig: {
                  submitText: '修改项目信息',
                },
                render: (_, dom) => dom[1],
              }}
              onFinish={async (values) => {
                console.log(values);
                await projectDelUpdate({ ...projectDel, ...values, projectId });
                // console.log(values);
                // message.success('修改成功');
              }}
              request={async () => {
                const projectDel = await getProjectDel(projectId);
                setProjectDel(projectDel);

                return {
                  ...projectDel,
                };
              }}
            >
              <ProFormText
                name="projectName"
                label="项目名称"
                disabled={!access.canTA}
                rules={[
                  {
                    required: true,
                    message: '请输入项目名称!',
                  },
                ]}
                width="md"
              />
              <ProFormText
                name="description"
                label="项目描述"
                disabled={!access.canTA}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '请输入项目描述!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="groupNumber"
                disabled={!access.canTA}
                label="项目小组数"
                rules={[
                  {
                    required: true,
                    message: '请输入项目小组数!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="maxNumber"
                disabled={!access.canTA}
                label="每个小组最大人数"
                rules={[
                  {
                    required: true,
                    message: '请输入每个小组最大人数!',
                  },
                ]}
              />
              <ProFormDateTimePicker
                name="groupDeadline"
                disabled={!access.canTA}
                label="组队截止时间"
                rules={[
                  {
                    required: true,
                    message: '请选择组队截止时间!',
                  },
                ]}
                width="md"
              />
              <ProFormDateTimePicker
                name="endDeadline"
                disabled={!access.canTA}
                label="项目截止时间"
                rules={[
                  {
                    required: true,
                    message: '请选择项目截止时间!',
                  },
                ]}
                width="md"
              />
            </ProForm>
          </div>
        </>
      }
    </div>
  );
};

export default ProjectOverview;
