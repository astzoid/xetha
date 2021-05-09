import React from 'react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useScreenType from 'hooks/useScreenType';
import {
    AppBar,
    Divider,
    Grid,
    Typography,
    makeStyles,
    Link,
} from '@material-ui/core';

const useStyles = makeStyles({
    section: {
        maxWidth: 300,
        margin: '1rem',
        maxHeight: 200,
    },
    copyright: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },
});

function FooterSection({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    const classes = useStyles();
    const screenType = useScreenType();
    const Mobile = screenType === '1-cols' || screenType === '2-cols';

    return (
        <Grid
            container
            direction="column"
            alignItems={Mobile ? 'center' : 'flex-start'}
            className={classes.section}
        >
            <Typography variant="h6" component="h1" color="textPrimary">
                {title.toUpperCase()}
            </Typography>
            {children}
        </Grid>
    );
}

function FooterLink({ children, href }: { children: ReactNode; href: string }) {
    return (
        <Link variant="subtitle2" component={RouterLink} to={href}>
            {children}
        </Link>
    );
}

function FooterContents() {
    return (
        <>
            <FooterSection title="Xetha Bot">
                <Typography color="textSecondary">
                    Advanced multi-purpose discord bot to enhance your discord
                    experience with ease and to enhance your awesome community.
                </Typography>
            </FooterSection>
            <FooterSection title="Information">
                <FooterLink href="/invite">Add To Discord</FooterLink>
                <FooterLink href="/status">Service Status</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/patreon">Patreon</FooterLink>
            </FooterSection>
            <FooterSection title="Support">
                <FooterLink href="/discord">Official Discord</FooterLink>
                <FooterLink href="/suggest">Suggest a Feature</FooterLink>
                <FooterLink href="/bug-report">Report a Bug</FooterLink>
                <FooterLink href="/report">Report a Guild or User</FooterLink>
                <FooterLink href="/appeal">Ban Appeal</FooterLink>
            </FooterSection>
        </>
    );
}

function FooterCopyright() {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.copyright}
        >
            <Typography variant="caption" color="textPrimary">
                &copy; 2021 Xetha Development. All rights reserved.
            </Typography>
        </Grid>
    );
}

export default function Footer() {
    return (
        <AppBar component="footer" color="secondary" position="relative">
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <FooterContents />
            </Grid>
            <Divider />
            <FooterCopyright />
        </AppBar>
    );
}
