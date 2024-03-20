// CommentFormComponent.js
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store';

const CommentFormComponent = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [timestamp, setTimestamp] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ text, timestamp: timestamp || 0 })); // Default timestamp to 0 if not provided
    setText('');
    setTimestamp(0);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your comment"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        placeholder="Enter timestamp (seconds)"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default CommentFormComponent;
