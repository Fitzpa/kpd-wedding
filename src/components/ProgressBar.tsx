import React from "react";

const ProgressBar = ({
  url,
  progress,
}: {
  url: string | null;
  progress: number;
}) => {
  console.log(progress, url);

  return <div className="progress-bar">{progress}%</div>;
};

export default ProgressBar;
