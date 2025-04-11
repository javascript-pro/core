'use client'

import * as React from 'react'
import {
  Alert,
  AlertTitle,
  Typography,
  ButtonBase,
} from "@mui/material"
import { useRouter } from 'next/navigation'
import {
  Icon,
} from '../'
export interface IAdvert {
  title?: string
  url?: string
  description?: string
  icon?: string
  image?: string
}

export default function Advert() {
  const router = useRouter()

  const ad: IAdvert = {
    title: "SpeakWrite",
    icon: "star",
    url: "/work/examples/speakwrite",
    description: "An Open Source transcription engine to create propaganda.  Foreseen by Orwell in 1984, built for reals by us, just now. Out of our heads",
    image: "/jpg/speakwrite.jpg",
  }
  
  const handleClick = () => {
    router.push(ad.url as string)
  }

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{ textAlign: "left" }}
    >
      <Alert severity="success" icon={<Icon icon={ad.icon as any} />}>
        <AlertTitle>
          {ad.title}
        </AlertTitle>
        <Typography>
          {ad.description}
        </Typography>
      </Alert>
    </ButtonBase>
  )
}
