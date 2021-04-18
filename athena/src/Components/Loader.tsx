import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  center: {
    minHeight: '80vh',
    display: 'grid',
    placeItems: 'center',
  },
  white: {
    color: grey[100],
  },
});

export default function Loader() {
  const styles = useStyles();

  return (
    <div className={styles.center}>
      <CircularProgress className={styles.white} />
    </div>
  );
}
