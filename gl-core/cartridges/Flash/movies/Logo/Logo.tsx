// /app/src/Flash/movieclips/Logo/Logo.tsx
import React from 'react';
import { MovieClip } from '../../../Flash';
import { LogoAS, Bolt, F, L, A, S, H } from '../Logo';

export type TLogo = {
  id?: string;
};

export default function Logo({ id = 'mc_logo' }: TLogo) {

  console.log("Logo", id)

  React.useEffect(() => {
    const logoAS = new LogoAS(id);
    logoAS.init();
  }, [id]);

  return (
    <MovieClip
      id={id}
      height="auto"
      width="auto"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25em', // optional spacing between letters
      }}
    >
      <Bolt id="mc_bolt" />
      <F id="ma_F" />
      <L id="ma_L" />
      <A id="ma_A" />
      <S id="ma_S" />
      <H id="ma_H" />
    </MovieClip>
  );
}
