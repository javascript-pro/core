'use client';
import * as React from 'react';
import { Controls } from './';
import { Typography, Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useSlice, useDispatch } from '../../';
import {updateCVSlice} from "./";

export type TCV = {
  body?: string;
};

export default function CV({ body = 'No content' }: TCV) {

  const slice = useSlice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!slice.cv?.originalCV && body) {
      dispatch(updateCVSlice(body));
    }
  }, [slice.cv?.originalCV, body, dispatch]);

  return (
    <Container maxWidth="md">
      <Controls markdown={body} />

      {/* <Typography component="div">
        <ReactMarkdown>{body}</ReactMarkdown>
      </Typography> */}

      <pre>slice: {JSON.stringify(slice, null, 2)}</pre>
    </Container>
  );
}
