import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { avatar } from '@functions/CDN';
import Login from '@functions/Login';
import Logout from '@functions/Logout';

import useScreenType from '@hooks/useScreenType';
import useUser from '@hooks/useUser';

import {
    makeStyles,
    AppBar,
    Avatar,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Menu,
    useScrollTrigger,
    Slide,
    SwipeableDrawer,
    Toolbar,
    Typography,
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';

import type { ReactNode } from 'react';
import type User from '@typings/User';
import useLoading from '@hooks/useLoading';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    list: {
        width: 250,
    },
}));

function Navigation({
    children,
    window,
}: {
    children: ReactNode;
    window?: () => Window;
}) {
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="sticky" color="secondary" component="nav">
                <Toolbar>{children}</Toolbar>
            </AppBar>
        </Slide>
    );
}

function Icon() {
    const classes = useStyles();

    return (
        <IconButton
            className={classes.btn}
            edge="start"
            color="inherit"
            component={Link}
            to="/"
        >
            <Avatar alt="Xetha Logo" src="favicon.ico" />
        </IconButton>
    );
}

function Title() {
    const classes = useStyles();

    return (
        <Typography
            variant="h6"
            color="textPrimary"
            component="h1"
            className={classes.title}
        >
            Xetha
        </Typography>
    );
}

function NavLink({ children, href }: { children: ReactNode; href: string }) {
    const classes = useStyles();

    return (
        <Button component={Link} className={classes.btn} to={href}>
            {children}
        </Button>
    );
}

function Links({ user }: { user: User | null }) {
    const loading = useLoading();

    return (
        <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/servers">Servers</NavLink>
            {user && !loading && <NavLink href="/dashboard">Dashboard</NavLink>}
            <NavLink href="/commands">Commands</NavLink>
        </>
    );
}

function UserDrop({ user, showTag }: { user: User | null; showTag?: boolean }) {
    const [state, setState] = useState(null);
    const loading = useLoading();
    const open = Boolean(state);
    const classes = useStyles();

    const handleMenu = (event: any) => {
        setState(event.currentTarget);
    };

    const handleClose = () => {
        setState(null);
    };

    return (
        <>
            {user && !loading ? (
                <div className={classes.flex}>
                    {showTag && (
                        <>
                            <Typography variant="body2" color="textPrimary">
                                {user.username}
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    component="span"
                                >
                                    #{user.discriminator}
                                </Typography>
                            </Typography>
                        </>
                    )}
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar
                            alt={user.username}
                            src={avatar(
                                user.user_id,
                                user.discriminator,
                                user.avatar,
                            )}
                        />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={state}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={Logout}>Logout</MenuItem>
                    </Menu>
                </div>
            ) : (
                <Button variant="outlined" onClick={Login}>
                    Login
                </Button>
            )}
        </>
    );
}

function MenuLink({ text, href }: { text: string; href: string }) {
    const history = useHistory();

    return (
        <List>
            <ListItem button onClick={() => history.push({ pathname: href })}>
                <ListItemText>{text}</ListItemText>
            </ListItem>
        </List>
    );
}

function ItemMenu({ user, noUser }: { user: User | null; noUser?: boolean }) {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const loading = useLoading();
    const { pathname } = useLocation();

    useEffect(() => {
        setState(false);
    }, [pathname]);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setState(open);
        };

    return (
        <>
            <IconButton
                edge="start"
                className={classes.btn}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className={classes.list}>
                    <MenuLink text="Home" href="/" />
                    <MenuLink text="Servers" href="/servers" />
                    {user && <MenuLink text="Dashboard" href="/dashboard" />}
                    <MenuLink text="Commands" href="/commands" />
                    <Divider />
                    {!noUser && (
                        <>
                            {user && !loading ? (
                                <>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Avatar
                                                    alt={user.username}
                                                    src={avatar(
                                                        user.user_id,
                                                        user.discriminator,
                                                        user.avatar,
                                                    )}
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    variant="body1"
                                                    color="textPrimary"
                                                >
                                                    {user.username}
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="span"
                                                    >
                                                        #{user.discriminator}
                                                    </Typography>
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                    <List>
                                        <ListItem button onClick={Logout}>
                                            <ListItemText>Logout</ListItemText>
                                        </ListItem>
                                    </List>
                                </>
                            ) : (
                                <List>
                                    <ListItem button onClick={Login}>
                                        <ListItemText>Login</ListItemText>
                                    </ListItem>
                                </List>
                            )}
                        </>
                    )}
                </div>
            </SwipeableDrawer>
        </>
    );
}

export default function Navbar() {
    const screenType = useScreenType();
    const user = useUser();

    if (screenType === '1-cols') {
        return (
            <Navigation>
                <ItemMenu user={user} />
                <Icon />
                <Title />
            </Navigation>
        );
    }
    if (screenType === '2-cols') {
        return (
            <Navigation>
                <ItemMenu user={user} noUser />
                <Icon />
                <Title />
                <UserDrop user={user} />
            </Navigation>
        );
    }
    if (screenType === '3-cols') {
        return (
            <Navigation>
                <Icon />
                <Title />
                <Links user={user} />
                <UserDrop user={user} />
            </Navigation>
        );
    }

    return (
        <Navigation>
            <Icon />
            <Title />
            <Links user={user} />
            <UserDrop user={user} showTag />
        </Navigation>
    );
}
