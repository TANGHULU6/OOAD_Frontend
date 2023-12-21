import React, {useEffect, useRef, useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import ProForm, {ProFormSelect, ProFormText,} from '@ant-design/pro-form';
import {currentUser as currentUserApi, currentUserUpdate} from '@/services/ant-design-pro/api';
import type {RcFile, UploadFile, UploadProps} from 'antd/es/upload/interface';
import styles from './BaseView.less';
import {ActionType} from "@ant-design/pro-components";

const BaseView: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({});
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const actionRef = useRef<ActionType>();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file[]', file as RcFile);
    });
    console.log(formData)
    setUploading(true);
    // You can use any AJAX library you like
    fetch('http://localhost:8080/api/upload/img', {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then(() => {
      setFileList([]);
      message.success('upload successfully.');
    })
    .catch(() => {
      message.error('upload failed.');
    })
    .finally(() => {
      setUploading(false);
    });
  };
  const customRequest = (option: any) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(option.file); //转为base64格式
    // const urlData = URL.createObjectURL(option.file); //转为blob格式（二进制文件）
    // console.log("blob:",urlData);
    const formData = new FormData();

    formData.append('file', option.file);
    fetch('http://localhost:8000/api/user/avatar/upload', {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      setUserInfo({avatarUrl: res.data})
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
    const allowFormat = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!allowFormat) {
      message.error('只允许 JPG/PNG 文件!', 1000)
    }
    const fileSize = file.size / 1024 / 1024 < 5;
    if (!fileSize) {
      message.error('图片应当小于5MB!', 1000)
    }
    return allowFormat && fileSize;
  }
  const handleChange = (info: any) => {
    console.debug("info:", info)
    if (info.file.status === 'done') {
      message.success('上传成功');
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };

  const props: UploadProps = {
    accept: ".jpg , .png",	//文件类型
    maxCount: 1,
    showUploadList: false,
    beforeUpload: beforeUpload,	//上传前的钩子
    onChange: handleChange,	//上传中、完成、失败都会调用这个函数
    customRequest: customRequest,	//覆盖默认的上传行为，自定义上传实现
  };
  // 头像组件 方便以后独立，增加裁剪之类的功能
  const AvatarView = ({avatar}: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar"/>
      </div>
      <Upload {...props}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined/>
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
  useEffect(() => {
    // (async () => {
    //   const res = await currentUserApi();
    //   console.log('🚀 ~ file: base.tsx:55 ~ res:', res);
    //   setUserInfo(res);
    // })();
  }, []);

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              onFinish={async (values) => {
                console.log(values);
                await currentUserUpdate({...userInfo, ...values});
                // console.log(values);
                message.success('提交成功');
              }}
              request={async () => {
                const user = await currentUserApi();
                setUserInfo(user);
                return {
                  ...user,
                };
              }}
            >
              <ProFormText width="md" name="userAccount" label="账户" disabled/>
              <ProFormText width="md" name="username" label="姓名" disabled/>
              <ProFormSelect
                disabled
                options={[
                  {
                    value: 0,
                    label: '学生',
                  },
                  {
                    value: 1,
                    label: '教师助理',
                  },
                  {
                    value: 2,
                    label: '教师',
                  },
                  {
                    value: 3,
                    label: '管理员',
                  },
                ]}
                name="userRole"
                label="身份"
              />
              <ProFormText disabled width="md" name="email" label="邮箱" placeholder={''}/>
              <ProFormText
                width="md"
                name="age"
                label="年龄"
                rules={[
                  {
                    // required: true,
                    message: '请输入您的年龄!',
                  },
                ]}
              />

              <ProFormText
                width="md"
                name="technicalStack"
                label="技术栈"
                rules={[
                  {
                    // required: true,
                    message: '请输入技术栈!',
                  },
                ]}
              />
              <ProFormText
                name="programmingSkills"
                label="编程技能"
                rules={[
                  {
                    // required: true,
                    message: '请输入编程技能!',
                  },
                ]}
              />
              <ProFormText
                name="intendedTeammates"
                label="意向队友"
                rules={[
                  {
                    // required: true,
                    message: '请输入意向队友!',
                  },
                ]}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={userInfo.avatarUrl}/>
          </div>
        </>
      }
    </div>
  );
};

export default BaseView;
