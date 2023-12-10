import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CourseOverview from '@/pages/courseOverview/CourseOverview';

const ParentComponent: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseId, setCourseId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setCourseId(id);
    setIsModalVisible(true);
  };

  return (
    <>
      {/* 这里是触发模态窗口的按钮，您可以根据需要放置在任何地方 */}
      <Button onClick={() => handleOpenModal(1)}>查看课程详情</Button>

      {/* 模态窗口 */}
      <Modal
        title="课程详情"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {courseId && <CourseOverview id={courseId} />}
      </Modal>
    </>
  );
};

export default ParentComponent;
