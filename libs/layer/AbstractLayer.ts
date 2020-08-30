import { Container } from 'pixi.js';

export abstract class AbstractLayer extends Container implements Layer.ILayer {
    name: string;
    zIndex: number;
    config: Record<string, unknown>;

    constructor({ name, zIndex, config }: Layer.IData) {
        super();

        this.name = name;
        this.zIndex = zIndex;
        this.config = config;
    }

    abstract resize(sizes: { [key: string]: number }): void;

    abstract update(dt: number): void;

    abstract cleanup(): void;
}
