
import { Container } from "pixi.js";

export class AbstractLayer extends Container {
    constructor({ name, zIndex, ...config }) {
        super();

        this.name = name;
        this.zIndex = zIndex;
        this.config = config;
    }

    resize(sizes) {
        throw new Error("Method must be implemented");
    };

    update(dt) {
        throw new Error("Method must be implemented");
    };

    cleanup() {
        throw new Error("Method must be implemented");
    };
}