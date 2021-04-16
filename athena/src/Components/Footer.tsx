import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginRight: theme.spacing(2),
    },
    copyright: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
}));

export default function Footer() {

    const classes = useStyles();

    return (
        <AppBar position="relative" color="secondary" component="footer">
            <Container>
                <Toolbar className={classes.container}>
                    <Typography variant="body1" color="inherit" className={classes.copyright}>
                        © 2021 Xetha Development
                    </Typography>
                    <Button component={Link} to="/discord" className={classes.btn}>Official Discord</Button>
                    <Button component={Link} to="/terms" className={classes.btn}>Terms of Service</Button>
                    <Button component={Link} to="/privacy" className={classes.btn}>Privacy Policy</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}