
export class ResourcesParser {
    constructor() {
        this.rules = {
            json: new RegExp(/json$/, "i"),
            json_img: new RegExp(/_image*$/, "i"),
            img: new RegExp(/(jpg|jpeg|png)$/, "i")
        };
    }

    parseResources(resources) {
        const keys = Object.keys(resources);

        return {
            ...this._parseSprites(keys, resources),
            ...this._parseSpritesheet(keys, resources)
        };
    }

    _parseSprites(keys, resources) {
        return keys.reduce((acc, key) => {
            if (this.rules.img.test(resources[key].extension)) {
                acc[key] = resources[key].texture;
            }
            return acc
        }, {});
    }

    _parseSpritesheet(keys, resources) {
        return keys.reduce((acc, key) => {
            if (this.rules.json.test(resources[key].extension)) {
                const { textures = [] } = resources[key];
                Object.entries(textures)
                    .forEach(([name, texture]) => (acc[name] = texture));
            }
            return acc
        }, {});
    }
}