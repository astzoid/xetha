// / <reference types="node" />
// / <reference types="react" />
// / <reference types="react-dom" />

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.styl' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.styl';

declare module '*.bmp' {
    const ref: string;
    export default ref;
}
declare module '*.gif' {
    const ref: string;
    export default ref;
}
declare module '*.jpg' {
    const ref: string;
    export default ref;
}
declare module '*.jpeg' {
    const ref: string;
    export default ref;
}
declare module '*.png' {
    const ref: string;
    export default ref;
}

declare module '*.svg' {
    import React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
}
