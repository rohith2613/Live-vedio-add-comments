import  { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTime , addComment } from '../store';
import CommentComponent from './CommentComponent';
import CommentFormComponent from './CommentFormComponent';
import Vedio from '../assets/vedio.mp4'
import '../index.css'

const VideoPlayerComponent = () => {
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTimeState] = useState(0);
  const [duration, setDuration] = useState(0);
  const comments = useSelector(state => state.comments);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        setCurrentTimeState(currentTime);
        dispatch(setCurrentTime(currentTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const commentUpdateInterval = setInterval(() => {
      // Simulate new comment arrival every 10 seconds
      const newComment = {
        id: comments.length + 1,
        text: `New Comment at ${currentTime}`,
        timestamp: currentTime + 10, // Increment timestamp by 10 seconds
      };
      dispatch(addComment(newComment));
    }, 10000); // Trigger every 10 seconds

    return () => clearInterval(commentUpdateInterval);
  }, [comments, currentTime, dispatch]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleSeek = (time) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(time, 'seconds');
    }
  };

  return (
    <div className="w-full resizable">
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={Vedio}
        playing={isPlaying}
        controls
        width="100%"
        height="100%"
        onProgress={() => {}}
        onDuration={(duration) => setDuration(duration)}
      />
      <progress
        className="w-full"
        max={duration}
        value={currentTime}
        onChange={(e) => handleSeek(parseFloat(e.target.value))}
      />
      <div className='m-3'>
        <button className='bg-blue-300 p-2 rounded-xl' onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
      <div className='m-2'>
        <h2 className='text-center text-lg font-bold underline mb-2'>Comments</h2>
        <CommentComponent comments={comments} currentTime={currentTime} />
        <CommentFormComponent />
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
