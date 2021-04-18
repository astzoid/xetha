import ArrayShuffle from '@xetha/array-shuffle';
import Escapes from '@xetha/escapes';
import { createHash } from 'crypto';

export default class Utils {
    constructor() {
        throw new Error(
            `The ${this.constructor.name} class cannot be instantiated`,
        );
    }

    static trimArray(array: any[], maxLen: number = 10): any[] {
        if (array.length < maxLen) {
            return array;
        }

        array = array.slice(0, maxLen);

        array.push(`${array.length - maxLen} more...`);

        return array;
    }

    static shorten(text: string, maxLen: number = 2000) {
        return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
    }

    static toHumanReadable(n: number, separator: string = ',') {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }

    static hash(algorithm: 'sha256' | 'md5' | 'sha1' | 'sha512', text: string) {
        return createHash(algorithm).update(text).digest('hex');
    }

    static cleanMessage(content: string, length: number = 2000) {
        return Escapes.addressSign(
            Escapes.backticks(Utils.shorten(content, length)),
        );
    }

    static chunkString(str: string, size: number = 0): string[] {
        const len = Math.ceil(str.length / size);
        let offset = 0;

        return Array(len).map((_) => {
            offset += len;
            return str.substr(offset, len);
        });
    }

    static shuffleString(str: string): string {
        return ArrayShuffle(str.split('')).join('');
    }
}
