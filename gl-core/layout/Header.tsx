'use client';

import * as React from 'react';
import { 
  IconButton,
  CardHeader,
  // CardContent,
  Typography,
} from '@mui/material';
import { 
  useRouter,
} from 'next/navigation';
import { 
  useIsMobile, 
  Icon, 
  // Nav,
} from '../';

export type THeader = {
  frontmatter?: any;
};

export default function Header({
 frontmatter = null,
}: THeader) {

  const isMobile = useIsMobile();
  const router = useRouter();
  const {
    title,
    description,
    icon,
  } = frontmatter;


  const onAvatarClick = () => {
    router.push("/");
  }

  return (<>
  <CardHeader 
    // action={<Nav />}
    // action={<IconButton
    //   size='small'
    //   onClick={onAvatarClick}
    // >
    //   <Icon icon={icon} />
    // </IconButton>}
    title={<Typography variant={"h4"} component={"h1"}>{title}</Typography>}
    subheader={<Typography variant={"body1"} component={"h2"}>{description}</Typography>}
  />
  </>
        
  );
}

/* <pre>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre> */