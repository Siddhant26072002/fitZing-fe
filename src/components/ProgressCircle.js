import React from 'react';

const ProgressCircle = ({ progress }) => {
  const progressDegrees = (progress / 100) * 360;
  const progressStyle = {
    '--progress': `${progressDegrees}deg`
  };

  return (
    <div
      className="progress-circle"
      style={progressStyle}
      data-progress={progress}
    >
      {progress}%
    </div>
  );
};

export default ProgressCircle;
