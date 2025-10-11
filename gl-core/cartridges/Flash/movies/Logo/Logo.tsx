import React from 'react';
import { useRouter } from 'next/navigation';
import { MovieClip } from '../../../Flash';
import { LogoAS, Bolt, F, L, A, S, H } from '../Logo';

export type TLogo = {
  id?: string;
};

export default function Logo({ id = 'mc_logo' }: TLogo) {
  const router = useRouter();

  React.useEffect(() => {
    const logoAS = new LogoAS(id, {
      onNavigate: () => router.push('/work/goldlabel/cartridges/flash'),
    });

    logoAS.init();

    return () => {
      logoAS.destroy();
    };
  }, [id, router]);

  return (
    <MovieClip
      id={id}
      height="auto"
      width="auto"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25em',
        cursor: 'pointer',
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
