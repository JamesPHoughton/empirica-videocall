import fetch from 'node-fetch';
import getConf from './config.js';

const config = getConf(process.env.NODE_ENV);

export async function CreateRoom() {
  const resp = await fetch('https://api.eyeson.team/rooms', {
    method: 'POST',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user[name]': 'admin',
      'options[show_label]': false, // turn off eyeson logo
      'options[kick_available]': false, // disable participant kick
    }),
  });
  const body = await resp.json();
  if (resp.status === 400) {
    console.log(body);
    throw new Error('Room Creation Failed');
  }
  const { access_key, room : { guest_token } } = body;
  const record = await fetch(`https://api.eyeson.team/rooms/${access_key}/recording`, {
    method: 'POST',
    headers: {
        'Authorization': config.APIKEY,
    }
  })
  if (record.status !== 201) {
    throw new Error('Failed to record meeting');
  }
  return { access_key, guest_token };
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
  const { room: { id } } = body;
  const rm = await fetch(`https://api.eyeson.team/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': config.APIKEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status !== 204) {
    throw new Error('Room Closure failed');
  }
}
/*
const { access_key } = await CreateRoom();
CloseRoom(access_key);
*/