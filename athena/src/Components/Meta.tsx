import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  themeColor: string;
  url: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  noindex: boolean;
  nofollow: boolean;
  revisitAfter: string;
}

export default function Meta(iprops: Partial<Props>) {
  const props: Partial<Props> = {};

  props.themeColor = iprops.themeColor || '#212121';
  props.title = iprops.title
    ? `${iprops.title} | Xetha Bot`
    : 'Xetha - Discord Bot';
  props.description =
    iprops.description ||
    'A Powerful Multi-purpose Discord Bot That Has Almost You Need For Your Awesome Discord Server.';
  props.image = iprops.image || 'favicon.ico';
  props.url = `${iprops.url ? iprops.url : '/'}`;
  props.revisitAfter = iprops.revisitAfter || '7 days';

  const keywords = `${
    iprops.keywords && iprops.keywords.length ? iprops.keywords.join(', ') : ''
  }, discord, bot, xetha, moderation, oadpoaw, logging, economy, currency, dashboard`;
  const robots = `${iprops.noindex ? 'noindex' : 'index'}, ${
    iprops.nofollow ? 'nofollow' : 'follow'
  }`;

  document.title = props.title;

  return (
    <Helmet>
      <meta property="theme-color" content={props.themeColor} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="revisit-after" content={props.revisitAfter} />
      <meta property="og:title" content={props.title} />
      <meta name="description" content={props.description} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:url" content={props.url} />
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />
      <meta property="twitter:image" content={props.image} />
      <meta property="twitter:url" content={props.url} />
    </Helmet>
  );
}
