import ArrayShuffle from '@oadpoaw/array-shuffle';
import Escapes from '@oadpoaw/escapes';
import shorten from '@oadpoaw/shorten';

const Utils = {
    cleanMessage(content: string, length = 2000) {
        return Escapes.addressSign(Escapes.backticks(shorten(content, length)));
    },

    booleanEmoji(bool: boolean) {
        return bool ? '<:yes:800415381340684330>' : '<:no:800415449488556053>';
    },

    chunkString(str: string, size = 0): string[] {
        const len = Math.ceil(str.length / size);
        let offset = 0;

        return Array(len).map((_) => {
            offset += len;
            return str.substr(offset, len);
        });
    },

    shuffleString(str: string): string {
        return ArrayShuffle(str.split('')).join('');
    },
};

export default Utils;
