import React, { useEffect, useState } from 'react';
import eyeson, { StreamHelpers } from 'eyeson';
import Video from './Video';
import getConf from './config';
import { GetRoomKey } from './Room';

const conf = getConf(process.env.NODE_ENV);

export function VideoCall ({playerName, roomName}) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const handleEvent = event => {
    const { type } = event;
    console.debug(type, event);
    if (type === 'room_setup') {
      if (!event.recording) {
        eyeson.send({ type: 'start_recording' })
      }
    }
    if (type === 'accept') {
      setLocalStream(event.localStream);
      setRemoteStream(event.remoteStream);
      return;
    }
    if (type === 'stream_update') {
      setLocalStream(event.localStream);
      setRemoteStream(event.remoteStream);
      return;
    }
    if (type === 'warning') {
      console.log('Warning: ' + event.name);
      return;
    }
    if (type === 'error') {
      console.log('Error: ' + event.name);
      endSession();
      return;
    }
    if (type === 'exit') {
      console.log('Meeting has ended');
      endSession();
      return;
    }
    console.debug('[App]', 'Ignore received event:', event.type);
  };

  const startSession = async () => {
    const access_key = await GetRoomKey(playerName, roomName);
    console.log(access_key);
    eyeson.start(access_key);
  }

  const endSession = () => {
    eyeson.offEvent(handleEvent);
    eyeson.destroy();
    setLocalStream(null);
    setRemoteStream(null);
  }

  useEffect(() => {
    eyeson.config.api = conf.APIKEY;
    eyeson.offEvent(handleEvent);
    eyeson.onEvent(handleEvent);
    startSession();
    return endSession();
  }, [playerName, roomName]);

  const toggleAudio = () => {
    const audioEnabled = !audio;
    StreamHelpers.toggleAudio(localStream, audioEnabled);
    setAudio(audioEnabled);
  };

  const toggleVideo = () => {
    const videoEnabled = !video;
    eyeson.send({
      type: 'change_stream',
      stream: localStream,
      video: videoEnabled,
      audio: audio
    });
    setVideo(videoEnabled);
  };


  return(
    <>
      <div>
      <Video stream={remoteStream} />
    </div>
    <div>
      <button onClick={toggleVideo}>Video</button>
      <button onClick={toggleAudio}>Audio</button>
      <button onClick={endSession}>Quit</button>
    </div>
    </>    
  )
}
