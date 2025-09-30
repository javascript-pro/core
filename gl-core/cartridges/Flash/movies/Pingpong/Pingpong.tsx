// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movies/Pingpong/Pingpong.tsx
import React from 'react';
import { MovieClip } from '../../../Flash';
import { PingpongAS, Pingpongball } from '../Pingpong';

export type TPingpong = {
  id?: string;
};

export default function Pingpong({ id }: TPingpong) {
  React.useEffect(() => {
    const pingpongAS = new PingpongAS(id as string);
    pingpongAS.init();
    return () => pingpongAS.destroy();
  }, [id]);

  return (
    <MovieClip id={id}>
      <Pingpongball id="mc_pingpongball" />
    </MovieClip>
  );
}
