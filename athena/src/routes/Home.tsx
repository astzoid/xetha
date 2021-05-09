import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Canvas from '../components/Canvas';
import Content from '../components/Content';
import Meta from '../components/Meta';
import Sensor from '@oadpoaw/react-sensor';

import { yellow, blue, red, green, pink } from '@material-ui/core/colors';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Grow,
    Typography,
    makeStyles,
} from '@material-ui/core';

import {
    Gavel as GavelIcon,
    Build as BuildIcon,
    Cloud as CloudIcon,
    People as PeopleIcon,
    VerifiedUser as VerifiedUserIcon,
} from '@material-ui/icons';

import type { SvgIconTypeMap } from '@material-ui/core';
import type { OverridableComponent } from '@material-ui/core/OverridableComponent';

const useStyles = makeStyles({
    margin: {
        margin: '1rem',
    },
    card: {
        maxWidth: '500px',
        minHeight: '100px',
        textAlign: 'center',
        margin: '1rem',
    },
    center: {
        display: 'grid',
        placeItems: 'center',
        marginBottom: '14rem',
    },
    logo: {
        height: '256px',
        width: '256px',
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

function FeatureCard({
    color,
    title,
    children,
    Icon,
}: {
    color: 'yellow' | 'blue' | 'red' | 'green' | 'pink';
    title: string;
    children: ReactNode;
    Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
}) {
    const [state, setState] = useState(false);
    const classes = useStyles();

    const bottomColor =
        color === 'yellow'
            ? classes.yellowBottom
            : color === 'blue'
            ? classes.blueBottom
            : color === 'red'
            ? classes.redBottom
            : color === 'green'
            ? classes.greenBottom
            : classes.pinkBottom;

    return (
        <Sensor once onChange={(visible) => setState(visible)}>
            <Grow in={state} timeout={400}>
                <Card className={`${bottomColor} ${classes.card}`}>
                    <CardContent>
                        <Icon className={classes[color]} />
                        <Typography variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="p"
                            color="textSecondary"
                        >
                            {children}
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
        </Sensor>
    );
}

export default function Home() {
    const classes = useStyles();

    return (
        <Content>
            <Meta />
            <Canvas particles={['0', '1']} />
            <Container className={classes.center}>
                <Avatar
                    alt="Xetha logo"
                    src="logo.webp"
                    className={classes.logo}
                />
                <Typography color="textPrimary" component="h1" variant="h2">
                    Xetha Bot
                </Typography>
                <Typography className={classes.margin} color="textSecondary">
                    A super advanced multi-purpose discord bot to enhance your
                    discord experience with ease and to enhance your awesome
                    community.
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button
                        component={Link}
                        to="/invite"
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                    >
                        Add to Discord
                    </Button>
                    <Button
                        component={Link}
                        to="/servers"
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                    >
                        Explore Public Servers
                    </Button>
                </Grid>
            </Container>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <FeatureCard
                    color="red"
                    title="Heavy Moderation"
                    Icon={GavelIcon}
                >
                    Simple yet, cool moderation utilities with our warning
                    system to punish those rule breakers with our simple
                    moderation
                </FeatureCard>
                <FeatureCard
                    color="blue"
                    title="Web Dashboard"
                    Icon={BuildIcon}
                >
                    With our powerful intuitive dashboard you can now configure
                    almost every aspect of the bot to your preferences
                </FeatureCard>
                <FeatureCard color="yellow" title="Logging" Icon={CloudIcon}>
                    A feature that allows you to log almost every action done in
                    your server with ease and time efficiency
                </FeatureCard>
                <FeatureCard
                    color="green"
                    title="Active Support"
                    Icon={PeopleIcon}
                >
                    Xetha is user driven meaning your suggestions and requests
                    come to life quickly and effectively.
                </FeatureCard>
                <FeatureCard
                    color="pink"
                    title="99.99% Uptime"
                    Icon={VerifiedUserIcon}
                >
                    With incredibly low latency with flawless up-times, Xetha
                    puts your community at rest - 24/7
                </FeatureCard>
            </Grid>
        </Content>
    );
}
