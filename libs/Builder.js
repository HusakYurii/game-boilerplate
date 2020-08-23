import {
    Container,
    Sprite,
    TextStyle,
    Text,
    Graphics,
} from "pixi.js";

export class UIBuilder {
    static strokeRect({ rectWidth = 10, rectHeight = 10, width = 2, color = 0x000000 } = {}) {
        const rect = new Graphics().lineStyle(width, color)
            .drawRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight)
            .endFill();
        return rect;
    }

    static rect({ rectWidth = 10, rectHeight = 10, color = 0x000000, alpha = 1 } = {}) {
        const rect = new Graphics().beginFill(color, alpha)
            .drawRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight)
            .endFill();
        return rect;
    }

    static fromConfig(treeConfig) {
        return treeConfig.map((config) => {
            const methodName = UIBuilder.methodsMap[config.type];
            const el = UIBuilder[methodName](config);
            if (config.children) {
                el.addChild(...Builder.fromConfig(config.children));
            }
            return el;
        });
    }

    static createContainer({ name, modifiers }) {
        const container = new Container();
        this._useModifiers(container, modifiers);
        container.name = name;
        return container;
    }

    static createSprite({ name, textureName, modifiers }) {
        const sprite = Sprite.from(textureName);
        this._useModifiers(sprite, modifiers);
        sprite.name = name;
        return sprite;
    }

    static createText({ name, text = "", style = {}, modifiers }) {
        const txt = new Text(text, new TextStyle(style));
        this._useModifiers(txt, modifiers);
        txt.name = name;
        return txt;
    }

    static _useModifiers(target, modifiers) {
        const filtered = UIBuilder.modifiersList.filter((prop) => {
            return Boolean(modifiers[prop]);
        });

        filtered.forEach((prop) => {
            this._modify(target, prop, modifiers[prop]);
        });
    }

    static _modify(target, property, modifier) {
        if (typeof (modifier) !== "object") {
            target[property] = modifier;
        }
        else {
            target[property] = Object.assign(target[property], modifier);
        }
    }
}

UIBuilder.methodsMap = {
    "Container": "createContainer",
    "Sprite": "createSprite",
    "Text": "createText"
};

UIBuilder.modifiersList = [
    // basic DisplayObject props
    "position", "scale", "width", "height",
    "alpha", "zIndex", "rotation",
    // for Sprite 
    "anchor"
];