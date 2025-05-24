import * as React from 'react';
import { useTheme, SvgIcon } from '@mui/material';

export default function FlickrIcon(props: any) {
  const theme = useTheme();
  let color1 = theme.palette.primary.main;

  return (
    <SvgIcon {...props}>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="flickr">
          <rect fill="none" x="0.5" y="0.5" width="24" height="24"></rect>
          <path
            d="M10.7443939,11.6481852 C10.7443939,13.9244117 9.04618527,15.7695758 6.95122761,15.7695758 C4.85637207,15.7695758 3.15806136,13.9243096 3.15806136,11.6481852 C3.15806136,9.37195864 4.85626995,7.5267946 6.95122761,7.5267946 C9.04608315,7.5267946 10.7443939,9.37206076 10.7443939,11.6481852 Z"
            id="blue"
            fill="#0059D4"
            fill-rule="nonzero"
          ></path>
          <path
            d="M20.4461087,11.5940598 C20.4461087,13.8400579 18.6988809,15.6607123 16.5435684,15.6607123 C14.3882558,15.6607123 12.641028,13.8399557 12.641028,11.5940598 C12.641028,9.34806178 14.3882558,7.52740734 16.5435684,7.52740734 C18.6988809,7.52740734 20.4461087,9.34816391 20.4461087,11.5940598 L20.4461087,11.5940598 Z"
            id="pink"
            fill="#DA1593"
            fill-rule="nonzero"
          ></path>
        </g>
      </g>
    </SvgIcon>
  );
}
