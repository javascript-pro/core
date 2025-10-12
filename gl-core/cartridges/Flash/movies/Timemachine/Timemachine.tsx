// /Users/goldlabel/GitHub/core/gl-core/cartridges/Flash/movies/Timemachine/Timemachine.tsx
import React from 'react';
import { MovieClip } from '../../../Flash';
import { TimemachineAS, Machine } from './';

export type TTimemachine = {
  id?: string;
};

export default function Timemachine({ id }: TTimemachine) {
  React.useEffect(() => {
    const timemachineAS = new TimemachineAS(id as string);
    timemachineAS.init();
    return () => timemachineAS.destroy();
  }, [id]);

  return (
    <MovieClip id={id}>
      <Machine id="mc_machine" />
    </MovieClip>
  );
}
