import React, { useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Loader from '../Components/Loader';
import Meta from '../Components/Meta';
import { userContext } from '../Contexts/userContext';
import Content from '../Components/Content';
import type { DiscordGuild } from '../Typings';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        minHeight: '315px',
        minWidth: '200px',
        maxHeight: '315px',
        maxWidth: '200px',
        textAlign: 'center',
        margin: '2rem',
        display: 'grid',
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
    avatar: {
        minHeight: '156px',
        minWidth: '156px',
        maxHeight: '156px',
        maxWidth: '156px',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    actions: {
        marginTop: 'auto',
        marginBottom: '2px',
    },
    manage: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },
});

function Guild(props: DiscordGuild) {

    const styles = useStyles();

    return (
        <Grow in>
            <Card className={styles.card}>
                <CardContent>
                    <Avatar className={styles.avatar} alt={props.name} src={`https://cdn.discordapp.com/icons/${props.id}/${props.icon}.webp`} />
                    <Typography variant="h6" component="h3" color="textSecondary">{props.name}</Typography>
                </CardContent>
                <CardActions className={styles.actions}>
                    <Button component={Link} to={`/manage/${props.id}`} className={styles.manage} variant="contained" color="primary">Manage</Button>
                </CardActions>
            </Card>
        </Grow>
    );
}

export default function Dashboard() {

    const { user, loaded } = useContext(userContext);

    if (!loaded) return <Loader />;

    if (!user) {
        window.location.href = '/api/login';
        return <Loader />;
    }

    const location = useLocation();
    const guild_id = new URLSearchParams(location.search).get('guild_id');

    const history = useHistory();

    if (user.guilds.find((guild) => guild.id === guild_id) && guild_id) {
        history.push(`/manage/${guild_id}`);
    }

    const styles = useStyles();

    return (
        <Content>
            <Meta title="Dashboard" noindex nofollow />

            <Container className={styles.center}>
                <Typography color="textPrimary" component="h2" variant="h3">Select a Server</Typography>
                <Container className={styles.container}>
                    {user.guilds.map((props) => <Guild {...props} />)}
                </Container>
            </Container>
        </Content>
    );
}
