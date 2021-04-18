import React, { useState } from 'react';
import Sensor from '../../Components/Sensor';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import { yellow, blue, red, green, pink } from '@material-ui/core/colors';

import GavelIcon from '@material-ui/icons/Gavel';
import BuildIcon from '@material-ui/icons/Build';
import CloudIcon from '@material-ui/icons/Cloud';
import PeopleIcon from '@material-ui/icons/People';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles({
  card: {
    maxWidth: '500px',
    minHeight: '100px',
    textAlign: 'center',
    margin: '1rem',
  },
  container: {
    margin: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  center: {
    display: 'grid',
    placeItems: 'center',
  },
  yellowBottom: {
    borderBottom: `4px solid ${yellow[400]}`,
  },
  blueBottom: {
    borderBottom: `4px solid ${blue[400]}`,
  },
  redBottom: {
    borderBottom: `4px solid ${red[400]}`,
  },
  greenBottom: {
    borderBottom: `4px solid ${green[400]}`,
  },
  pinkBottom: {
    borderBottom: `4px solid ${pink[300]}`,
  },
  yellow: {
    color: yellow[400],
  },
  blue: {
    color: blue[400],
  },
  red: {
    color: red[400],
  },
  green: {
    color: green[400],
  },
  pink: {
    color: pink[300],
  },
});

export default function Features() {
  const styles = useStyles();

  const [feat, setFeat] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);

  return (
    <Container className={styles.center}>
      <Sensor once onChange={(visible) => setFeat(visible)}>
        <Fade timeout={400} in={feat}>
          <Typography color="textPrimary" component="h2" variant="h5">
            Features
          </Typography>
        </Fade>
      </Sensor>
      <Container className={styles.container}>
        <Sensor once onChange={(visible) => setOne(visible)}>
          <Grow timeout={400} in={one}>
            <Card className={`${styles.redBottom} ${styles.card}`}>
              <CardContent>
                <GavelIcon className={styles.red} />
                <Typography variant="h5" component="h2">
                  Heavy Moderation
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  Simple yet, cool moderation utilities with our warning system
                  to punish those rule breakers with our simple moderation
                  commands.
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Sensor>

        <Sensor once onChange={(visible) => setTwo(visible)}>
          <Grow timeout={400} in={two}>
            <Card className={`${styles.blueBottom} ${styles.card}`}>
              <CardContent>
                <BuildIcon className={styles.blue} />
                <Typography variant="h5" component="h2">
                  Web Dashboard
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  With our powerful intuitive dashboard you can now configure
                  almost every aspect of the bot to your preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Sensor>

        <Sensor once onChange={(visible) => setThree(visible)}>
          <Grow timeout={400} in={three}>
            <Card className={`${styles.yellowBottom} ${styles.card}`}>
              <CardContent>
                <CloudIcon className={styles.yellow} />
                <Typography variant="h5" component="h2">
                  Logging
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  A feature that allows you to log almost every action done in
                  your server with ease and time efficiency
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Sensor>

        <Sensor once onChange={(visible) => setFour(visible)}>
          <Grow timeout={400} in={four}>
            <Card className={`${styles.greenBottom} ${styles.card}`}>
              <CardContent>
                <PeopleIcon className={styles.green} />
                <Typography variant="h5" component="h2">
                  Active Support
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  Xetha is user driven meaning your suggestions and requests
                  come to life quickly and effectively.
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Sensor>

        <Sensor once onChange={(visible) => setFive(visible)}>
          <Grow timeout={400} in={five}>
            <Card className={`${styles.pinkBottom} ${styles.card}`}>
              <CardContent>
                <VerifiedUserIcon className={styles.pink} />
                <Typography variant="h5" component="h2">
                  99.99% Uptime
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  With incredibly low latency with flawless up-times, Xetha puts
                  your community at rest - 24/7
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </Sensor>
      </Container>
    </Container>
  );
}
