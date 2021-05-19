import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '@components/Footer';
import type { ReactNode } from 'react';

const useStyles = makeStyles({
    content: {
        minHeight: '80vh',
        padding: '2rem',
    },
});

interface Props {
    children: ReactNode;
    nofooter: boolean;
}

export default function Content(props: Partial<Props>) {
    const classes = useStyles();

    return (
        <>
            <main className={classes.content}>{props.children}</main>
            {!props.nofooter && <Footer />}
        </>
    );
}
