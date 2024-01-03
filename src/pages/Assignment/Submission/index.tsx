import React, {useEffect, useState} from 'react';
import {history, useAccess, useParams} from 'umi';
import {getAssignmentById, getSubmissionById, getUserBaseInformationById, submitReview} from "@/services/ant-design-pro/api";
import {Badge, Button, Descriptions, Form, message} from "antd";
import {PageContainer, ProFormText} from "@ant-design/pro-components";
import {marked} from "marked";
import PdfViewer from "@/pages/Assignment/Submission/PdfViewer";
import {ProFormDigit} from "@ant-design/pro-form";

const Submission = () => {
  // @ts-ignore
  const {submissionId} = useParams();
  const [submission, setSubmission] = useState({});
  const [assignment, setAssignment] = useState({});
  const [submitter, setSubmitter] = useState({});
  const [teacher, setTeacher] = useState({});
  const [content, setContent] = useState(<></>);
  const access = useAccess();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const submissionRes = await getSubmissionById(submissionId);
        const assignmentRes = await getAssignmentById(submissionRes.assignmentId);
        const submitterRes = await getUserBaseInformationById(submissionRes.submitterId);
        if (submissionRes.teacherId != null) {
          const teacherRes = await getUserBaseInformationById(submissionRes.teacherId);
          setTeacher(teacherRes);
        }
        setSubmission(submissionRes);
        setAssignment(assignmentRes);
        setSubmitter(submitterRes);

        // 根据提交内容的文件类型不同进行渲染
        switch (submissionRes.contentType) {
          case 'TEXT':
            setContent(<div dangerouslySetInnerHTML={{__html: submissionRes.content}}/>);
            break;
          case 'PDF':
            setContent(<PdfViewer url={submissionRes.content}/>)
            break;
          case 'MD':
            fetch(submissionRes.content)
            .then(response => response.text())
            .then(text => {
              setContent(<div dangerouslySetInnerHTML={{__html: marked(text)}}/>);
            })
            .catch(error => console.error('Error fetching markdown:', error));
            break;
          default:
            setContent(<p>不支持的文件类型</p>);
        }
      } catch (error) {
        message.error('获取提交详情失败！');
      }
    }

    fetchDetails();
  }, [submissionId]);

  return (
    <PageContainer>
      <Descriptions title="提交详情" bordered>
        <Descriptions.Item label="提交id">{submission.id}</Descriptions.Item>
        <Descriptions.Item label="作业名称">{assignment.title}</Descriptions.Item>
        <Descriptions.Item label="提交者学工号">{submitter.sid}</Descriptions.Item>
        <Descriptions.Item label="提交者姓名">{submitter.name}</Descriptions.Item>
        <Descriptions.Item label="提交时间">{new Date(submission.submitTime).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="评分状态">{submission.score !== undefined && submission.score !== null ? <Badge status="success" text="已评分"/> :
          <Badge status="error" text="未评分"/>}</Descriptions.Item>
        <Descriptions.Item label="评分时间">{submission.scoreTime ? new Date(submission.scoreTime).toLocaleString() : "-"}</Descriptions.Item>
        <Descriptions.Item label="评分教师">{teacher && teacher.name ? teacher.name : "-"}</Descriptions.Item>
        <Descriptions.Item label="分数">{submission.score !== undefined && submission.score !== null ? submission.score : "-"}</Descriptions.Item>
        <Descriptions.Item label="教师评论" span={3}>{submission.teacherComment ? submission.teacherComment : "-"}</Descriptions.Item>
        <Descriptions.Item label="提交内容" span={3}>{content}</Descriptions.Item>
      </Descriptions>
      {access.canTA && (
        // <div>
        //   <Input type={number} placeholder="评分" required={true} style={{marginTop: 30}} onChange={(e) => setScore(e.target.value)}/>
        //   <Input.TextArea placeholder="评论" style={{marginTop: 10}}/>
        //   <Button type="primary" onClick={handleSubmit} style={{marginTop: 10}}>提交</Button>
        // </div>
        <Form
          style={{marginTop: 30}}
          onFinish={async (value) => {
            try {
              const result = await submitReview({...value, submissionId: submissionId} as API.ReviewSubmit);
              // @ts-ignore
              if (result) {
                history.push(`/review/${submission.assignmentId}`);
                // actionRef.current?.reload();
                return true;
              } else {
                throw new Error();
              }
            } catch (error) {
              console.error('Error during Review:', error);
              return true;
            }
          }}
        >
          <ProFormDigit
            name="score"
            label="分数"
            rules={[
              {
                required: true,
                message: '请输入分数!',
              },
            ]}
            width="md"
          />
          <ProFormText
            name="comment"
            label="评论"
            width="md"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
    </PageContainer>
  );
}

export default Submission;
