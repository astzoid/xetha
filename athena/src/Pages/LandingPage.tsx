import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../Components/Content';
import Canvas from '../Components/Canvas';
import Meta from '../Components/Meta';
import { useStyles } from '../Styles';
import Logo from '../images/logo.webp';
import Features from './Partials/Features';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function LandingPage() {

    const styles = useStyles();

    return (
        <Content>
            <Meta />
            <Canvas />
            <Container className={styles.mg}>
                <Container className={styles.center}>
                    <Avatar alt="Xetha Logo" src={Logo} className={styles.logo}/>
                    <Typography color="textPrimary" component="h1" variant="h2">Xetha Bot</Typography>
                    <Typography className={styles.mg} color="textSecondary">A super powerful multi-purpose discord bot to manage your discord server</Typography>
                    <Button component={Link} to="/invite" variant="contained" color="primary">Add to Discord</Button>
                </Container>
                <Features />
            </Container>
        </Content>
    );
}