import React from 'react';
import { Link } from 'react-router-dom';

import Canvas from '../shared/components/Canvas';
import Content from '../shared/components/Content';
import Meta from '../shared/components/Meta';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function WentWrong() {
  return (
    <Content>
      <Meta
        title="Something Went Wrong"
        description="Oh oh, something went wrong in this airspace!"
        noindex
        nofollow
      />
      <Canvas particles={['5', '0']} />
      <Container>
        <Typography variant="h2" component="h1" color="textPrimary">
          Something Went Wrong
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Oh oh, something went wrong in this airspace!
        </Typography>
        <Container>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go To Home
          </Button>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            Refresh This Page
          </Button>
        </Container>
      </Container>
    </Content>
  );
}
