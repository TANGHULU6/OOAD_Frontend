import React from 'react';

interface ProjectOverviewProps {
  projectId: number; // 传入的 projectId 属性
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({projectId}) => {
  return (
      <div>
        当前ProjectId为：{projectId}
      </div>
  )
};

export default ProjectOverview;
