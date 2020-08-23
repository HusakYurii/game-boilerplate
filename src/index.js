
import { Application, AnimatedSprite, Container } from "pixi.js";
import assets from "../assets/assets.json";

const view = document.body.querySelector("#game-canvas");
const app = new Application({ view });

class Hero extends Container {
    constructor(heroAnimations) {
        super();
        heroAnimations.forEach(animation => {
            animation.stop();
            animation.visible = false;
            this.addChild(animation);
        })

        this._currentAnimation = heroAnimations[0];
        this._heroAnimations = heroAnimations;
    }

    hide() {
        this._currentAnimation.stop();
        this._currentAnimation.visible = false;
    }

    show() {
        this._currentAnimation.visible = true;
        this._currentAnimation.play();
    }

    /**
     * @param {"down" | "left" | "right" | "up"} name 
     */
    play(name) {
        this.hide();
        this._currentAnimation = this._heroAnimations
            .find((animation) => animation.name === name);
        this.show();
    }
}

const getAnimations = () => {
    const animations = [
        { animationName: "down", baseName: "tile", start: 130, amount: 9 },
        { animationName: "left", baseName: "tile", start: 117, amount: 9 },
        { animationName: "right", baseName: "tile", start: 143, amount: 9 },
        { animationName: "up", baseName: "tile", start: 104, amount: 9 }
    ];

    return animations.reduce((collection, config) => {
        const { animationName, baseName, start, amount } = config;

        const tileNames = Array.from({ length: amount })
            .map((_, i) => `${baseName}${start + i}`);

        const animation = AnimatedSprite.fromImages(tileNames);
        animation.name = animationName;
        animation.anchor.set(0.5);
        animation.animationSpeed = 24 / 60;

        collection.push(animation);
        return collection;
    }, []);
};

const onAssetsLoaded = () => {

    const heroAnimations = getAnimations();
    const hero = new Hero(heroAnimations);
    hero.position.set(200, 200);
    hero.scale.set(2);
    hero.play("left");

    app.stage.addChild(hero);
}

app.loader.add(assets.sprites);
app.loader.load(onAssetsLoaded);
