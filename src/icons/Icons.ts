import path from "path/posix";


export interface IconSizes {
    [key: string]: string;
}

export interface Icon {
    name: string;
    sizes: IconSizes;
}

export interface IconsPack {
    name: string;
    source: string;
    stickers: Icon[];
}

export default class Icons {
    static readonly DEFAULT_SIZE = '128';
    protected packs: IconsPack[] = [];

    constructor(...packs: IconsPack[]) {
        if (packs) {
            this.packs.push(...packs);
        }
    }

    getIcon(name: string, size?: string) {
        for (const pack of this.packs) {
            const icon = pack.stickers.find(sticker => sticker.name === name);
            if (icon) {
                if (size) {
                    return icon.sizes[size];
                }
                return icon.sizes[Icons.DEFAULT_SIZE];
            }
        }
    }

    getRandomIcon(size?: string) {
        const pack = this.packs[Math.floor(Math.random() * this.packs.length)];
        const icon = pack.stickers[Math.floor(Math.random() * pack.stickers.length)];
        if (size) {
            return icon.sizes[size];
        }
        return icon.sizes[Icons.DEFAULT_SIZE];
    }

    getIndexedIcon(index: number, size?: string) {
        for (const pack of this.packs) {
            const icon = pack.stickers[index % pack.stickers.length];
            if (icon) {
                if (size) {
                    return icon.sizes[size];
                }
                return icon.sizes[Icons.DEFAULT_SIZE];
            }
        }
    }
}