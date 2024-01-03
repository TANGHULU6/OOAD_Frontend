import React, {useRef, useState} from 'react';
import {history, useAccess} from 'umi';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {getGradeBook} from "@/services/ant-design-pro/api";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import styles from "@/pages/account/settings/components/BaseView.less";
import {UploadFile, UploadProps} from "antd/es/upload/interface";

const GradeBook = ({courseId}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const actionRef = useRef<ActionType>();
  const access = useAccess()

  const customRequest = (option: any) => {
    const formData = new FormData();

    formData.append('file', option.file);
    fetch('http://localhost:8000/api/gradeBook/upload', {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      // setUserInfo({avatarUrl: res.data})
      setFileList([]);
      option.onSuccess();
      actionRef.current?.reload()
    })
    .catch(() => {
      message.error('upload failed.');
    })
    .finally(() => {
      setUploading(false);
    });
  }

  const beforeUpload = (file: any) => {
    console.debug("file type:", file.type);
    // const allowFormat = file.type === 'csv';
    // if (!allowFormat) {
    //   message.error('只允许 CSV 文件!', 1000)
    // }
    const fileSize = file.size / 1024 / 1024 < 5;
    if (!fileSize) {
      message.error('CSV文件应当小于5MB!', 1000)
    }
    // return allowFormat && fileSize;
    return fileSize;
  }

  const handleChange = (info: any) => {
    // console.debug("info:", info)
    if (info.file.status === 'done') {
      message.success('上传成功');
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };

  const props: UploadProps = {
    accept: ".csv",	//文件类型
    maxCount: 1,
    showUploadList: false,
    beforeUpload: beforeUpload,	//上传前的钩子
    onChange: handleChange,	//上传中、完成、失败都会调用这个函数
    customRequest: customRequest,	//覆盖默认的上传行为，自定义上传实现
  };

  return (
    <PageContainer>
      <ProTable<API.GradeBook>
        columns={[
          {
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48,
            hideInTable: true,
          },
          {
            title: '名称',
            dataIndex: 'title',
            sorter: true,
          },
          {
            title: '提交者学工号',
            dataIndex: 'submitterSid',
            sorter: true,
          },
          {
            title: '提交者姓名',
            dataIndex: 'submitterName',
            sorter: true,
          },
          {
            title: '分数',
            dataIndex: 'score',
            sorter: true,
          },
          {
            title: '评阅状态',
            dataIndex: 'isReviewed',
            sorter: true,
            valueType: 'select',
            valueEnum: {
              true: {
                status: 'success',
                text: '已评阅'
              },
              false: {
                status: 'error',
                text: '未评阅'
              }
            }
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
              record.id > 0 && <a
                key="view"
                onClick={() => {
                  // 这里添加你的查看详情逻辑，比如跳转到详情页面
                  history.push(`/submission/${record.id}`);
                }}
              >
                查看
              </a>,
            ].filter(Boolean),
          },
        ]}

        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params = {}, sort, filter) => {
          const gradeBook = await getGradeBook(courseId);
          return {
            data: gradeBook
          }
        }}

        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        pagination={false}
        dateFormatter="string"
        headerTitle="成绩册"
        toolBarRender={() => [
          access.canTA && (
            <Upload {...props}>
              <div className={styles.button_view}>
                <Button type="primary">
                  <UploadOutlined/>
                  上传CSV成绩册
                </Button>
              </div>
            </Upload>
          ),
        ]}
      />
    </PageContainer>
  );
};

export default GradeBook;
