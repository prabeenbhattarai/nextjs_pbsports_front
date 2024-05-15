"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  //video path
  let videosrc = "https://www.youtube.com/watch?v=RfZmY_k3UP4&ab_channel=ActionSportsHD";

  return (
    <div>
      <h1>my custome player</h1>
      <ReactPlayer
        width="500px"
        height="400px"
        url={videosrc}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
      <source src={videosrc} />
    </div>
  );
};

export default VideoPlayer;