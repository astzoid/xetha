import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../../Components/Meta';
import { useStyles } from '../../Styles';
import NoData from './no_data.svg';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function NotFound() {

    const styles = useStyles();

    return (
        <div className={styles.content}>
            <Meta title="Not Found" description="Not Found" noindex nofollow />
            <Container className={styles.mg}>
                <Container className={styles.center}>
                    <Avatar alt="paper" src={NoData} className={styles.logo} />
                    <Typography color="textPrimary" component="h1" variant="h2">Not Found</Typography>
                    <Typography className={styles.mg} color="textSecondary">
                        You have visited an unknown airspace!
                    </Typography>
                    <Button component={Link} to="/" variant="contained" color="primary">Go to Home</Button>
                </Container>
            </Container>
        </div>
    );
}