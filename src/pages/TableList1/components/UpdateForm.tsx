import React from 'react';
import { StepsForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Modal } from 'antd';
import type { TableListItem } from '../data';

export type FormValueType = Partial<TableListItem>;

export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalVisible: boolean;
    values: Partial<TableListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    return (
        <StepsForm
            stepsProps={{ size: 'small' }}
            stepsFormRender={(dom, submitter) => (
                <Modal
                    width={640}
                    destroyOnClose
                    title="Edit Course"
                    visible={props.updateModalVisible}
                    footer={submitter}
                    onCancel={() => props.onCancel()}
                >
                    {dom}
                </Modal>
            )}
            onFinish={props.onSubmit}
        >
            <StepsForm.StepForm initialValues={props.values} title="Basic Information">
                <ProFormText name="name" label="Course Name" rules={[{ required: true, message: 'Please enter course name' }]} />
                <ProFormTextArea name="desc" label="Description" />
            </StepsForm.StepForm>
            {/* Add more steps if needed */}
        </StepsForm>
    );
};

export default UpdateForm;
