import fetch from 'node-fetch';
import getConf from './config.js';

const config = getConf(process.env.NODE_ENV);

export async function GetRoomKey(playerName, roomName) {
  const resp = await fetch('https://api.eyeson.team/rooms', {
    method: 'POST',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': roomName,
      'user[name]': playerName,
      'options[show_label]': false, // turn off eyeson logo
      'options[kick_available]': false, // disable participant kick
    }),
  });
  const body = await resp.json();
  if (resp.status === 400) {
    console.log(body);
    throw new Error('Join Room Failed');
  }
  const { access_key } = body;
  // const record = await fetch(`https://api.eyeson.team/rooms/${access_key}/recording`, {
  //   method: 'POST',
  //   headers: {
  //       'Authorization': config.APIKEY,
  //   }
  // })
  // if (record.status !== 201) {
  //   throw new Error('Failed to record meeting');
  // }
  return access_key;
}

export async function CloseRoom(access_key) {
  const record = await fetch(`https://api.eyeson.team/rooms/${access_key}/recording`, {
    method: 'DELETE',
    headers: {
      'Authorization': config.APIKEY,
    }
  })
  if (record.status !== 200) {
    throw new Error('Failed to stop recording');
  }
  const resp = await fetch(`https://api.eyeson.team/rooms/${access_key}`, {
    method: 'GET',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const body = await resp.json();
  if (resp.status !== 200) {
    console.log(body);
    throw new Error('Room Access Failed');
  }
  const { room: { id : rm_id }, recording: { id: recording_id } } = body;
  const rm = await fetch(`https://api.eyeson.team/rooms/${rm_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rm.status !== 204) {
    throw new Error('Room Closure failed');
  }
  const recording = await fetch(`https://api.eyeson.team/recordings/${recording_id}`, {
    method: 'GET',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (recording.status !== 200) {
    throw new Error('Failed to get Recording');
  }
  const { links: { download } } = await recording.json();
  if (!download) {
    throw new Error('Missing Recording Download Link');
  }
  return download;
}
/*
const { access_key } = await CreateRoom();
CloseRoom(access_key);
*/