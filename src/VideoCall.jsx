import React, { useEffect, useState } from 'react';
import eyeson from 'eyeson';
import Video from './Video';
import getConf from './config';

const conf = getConf(process.env.NODE_ENV);

export function VideoCall ({playerName, roomId}) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const handleEvent = event => {
    const { type } = event;
    console.debug(type, event);
    if (type === 'accept') {
      setLocalStream(event.localStream);
      setRemoteStream(event.remoteStream);
      setConnecting(false);
      return;
    }
    if (type === 'stream_update') {
      setLocalStream(event.localStream);
      setRemoteStream(event.remoteStream);
      setConnecting(false);
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

  const endSession = () => {
    eyeson.offEvent(handleEvent);
    eyeson.destroy();
    setLocalStream(null);
    setRemoteStream(null);
    setConnecting(false);
  }

  useEffect(() => {
    eyeson.config.api = conf.APIKEY;
  }, []);

  useEffect(() => {
    eyeson.offEvent(handleEvent);
    eyeson.onEvent(handleEvent);
  }, [playerName, roomId]);

  return(
    <div>
      <Video stream={remoteStream} />
    </div>
  )
}
