import React from 'react';
import { Link } from 'react-router-dom';

import Canvas from '../shared/components/Canvas';
import Content from '../shared/components/Content';
import Meta from '../shared/components/Meta';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function NotFound() {
  return (
    <Content>
      <Meta
        title="Not Found"
        description="This Page Not Found"
        noindex
        nofollow
      />
      <Canvas particles={['4', '0']} />
      <Container>
        <Typography variant="h2" component="h1" color="textPrimary">
          Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Oh oh, you entered an unknown airspace!
        </Typography>
        <Container>
          <Button variant="contained" color="primary" component={Link} to="/">
            Go To Home
          </Button>
        </Container>
      </Container>
    </Content>
  );
}
