// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movies/Pingpong/Pingpong.tsx
import React from 'react';
import { MovieClip } from '../../../Flash';
import { PingpongAS, Pingpongball } from '../Pingpong';

export type TPingpong = {
  id?: string;
};

export default function Pingpong({ 
  id = 'mc_pingpong',
}: TPingpong) {
  
  React.useEffect(() => {
    const pingpongAS = new PingpongAS(id);
    pingpongAS.init();
  }, [id]);

  return (
    <MovieClip
      id={id}
      height="auto"
      width="auto"
    >
      <Pingpongball id="mc_pingpongball" />
    </MovieClip>
  );
}
