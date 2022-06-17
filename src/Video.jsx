import React, { useRef, useEffect } from 'react';

function Video({ stream }) {
  const ref = useRef(null);

  useEffect(() => {
    if(ref.current) {
      ref.current.srcObject = stream;
    }
  }, [ref]);

  return (
    <video ref={ref} playsInline autoPlay />
  );
}

export default React.memo(Video)
