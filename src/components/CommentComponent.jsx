// CommentComponent.js

import { useSelector } from 'react-redux';

const CommentComponent = () => {
  const comments = useSelector((state) => state.comments);
  const currentTime = useSelector((state) => state.video.currentTime);

  const filteredComments = comments.filter(comment => comment.timestamp <= currentTime);

  return (
    <div className="w-full h-full resizeable">
      {filteredComments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 mb-4 rounded">
          <p className="text-lg font-semibold">{comment.text}</p>
          <p className="text-sm text-gray-500">Timestamp: {comment.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentComponent;
