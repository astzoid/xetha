import React, { ReactNode, lazy } from 'react';
import { useStyles } from '../Styles';

const ServerError = lazy(() => import('../Pages/Errors/ServerError'));

export default function Content(props: { children: ReactNode; }) {

    const styles = useStyles();

    try {

        return (
            <main className={styles.content}>
                {props.children}
            </main>
        );

    } catch (err) {

        console.error(err);

        return <ServerError />;

    }
}