import {useParams} from "react-router-dom";

const AssignmentDetail = () => {
  // @ts-ignore
  const {assignmentId} = useParams()

  return (
      <div>
        当前AssignmentId为：{assignmentId}
      </div>
  )
}

export default AssignmentDetail;
