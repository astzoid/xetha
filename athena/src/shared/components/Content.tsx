import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';

const useStyles = makeStyles({
  content: {
    minHeight: '80vh',
    padding: '2rem',
  },
});

export default function Content(props: { children: React.ReactNode }) {
  const classes = useStyles();

  return (
    <>
      <main className={classes.content}>{props.children}</main>
      <Footer />
    </>
  );
}
