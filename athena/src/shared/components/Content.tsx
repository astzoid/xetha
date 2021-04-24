import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content: {
    minHeight: '100%',
    padding: '2rem',
  },
});

export default function Content(props: { children: React.ReactNode }) {
  const classes = useStyles();

  return <main className={classes.content}>{props.children}</main>;
}
