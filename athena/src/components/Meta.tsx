import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface Props {
    themeColor: string;
    title: string;
    description: string;
    image: string;
    keywords: string[];
    noindex: boolean;
    nofollow: boolean;
    revisitAfter: string;
}

export default function Meta(iprops: Partial<Props>) {
    const { pathname } = useLocation();
    const props: Partial<Props> = {};

    props.themeColor = iprops.themeColor || '#00ffff';

    props.title = iprops.title
        ? `${iprops.title} | Xetha Bot`
        : 'Xetha - Discord Bot';

    props.description =
        iprops.description ||
        'Xetha is an advanced multi-purpose discord bot to enhance your discord experience with ease and to enhance your awesome community';

    props.image = iprops.image || 'favicon.ico';
    props.revisitAfter = iprops.revisitAfter || '7 days';

    const keywords = `${
        iprops.keywords && iprops.keywords.length
            ? iprops.keywords.join(', ')
            : ''
    }, discord, leveling, bot, xetha, moderation, oadpoaw, logging, economy, currency, dashboard`;

    const robots = `${iprops.noindex ? 'noindex' : 'index'}, ${
        iprops.nofollow ? 'nofollow' : 'follow'
    }`;

    document.title = props.title;

    return (
        <Helmet>
            <meta property="theme-color" content={props.themeColor} />
            <meta name="title" content={props.title} />
            <meta name="description" content={props.description} />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={pathname} />
            <meta property="twitter:title" content={props.title} />
            <meta property="twitter:description" content={props.description} />
            <meta property="twitter:image" content={props.image} />
            <meta property="twitter:url" content={pathname} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />
            <meta name="revisit-after" content={props.revisitAfter} />
        </Helmet>
    );
}
