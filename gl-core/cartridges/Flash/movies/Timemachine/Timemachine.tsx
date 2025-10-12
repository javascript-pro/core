// /cartridges/Flash/movies/Timemachine/Timemachine.tsx
import React from 'react';
import { MovieClip } from '../../../Flash';
import { TimemachineAS, Machine } from './';

export type TTimemachine = {
  id?: string;
  stageId?: string;
};

export default function Timemachine({ id = 'movie_timemachine', stageId = 'stage' }: TTimemachine) {
  React.useEffect(() => {
    const timemachineAS = new TimemachineAS(stageId, id);
    timemachineAS.init();
    return () => timemachineAS.destroy();
  }, [id, stageId]);

  return (
    <MovieClip id={id} background="white">
      <Machine id="mc_machine" />
    </MovieClip>
  );
}
