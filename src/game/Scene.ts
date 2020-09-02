import { AbstractLayer } from '@libs/layer';
import { UIBuilder } from '@libs/UIBuilder';
import Layer = Core.Layer;

type LayersNames = 'Background' | 'Game' | 'UI' | 'Transition';
type LayersCollection = Map<LayersNames, PIXI.Container>;

export class Scene extends AbstractLayer {
    private layers: LayersCollection;

    constructor(params: Layer.IData) {
        super(params);

        this.sortableChildren = true;
        this.layers = new Map();

        this.layers.set('Transition', this.addChild(Scene.createLayer('Transition', 300)));
        this.layers.set('Background', this.addChild(Scene.createLayer('Background', 1)));
        this.layers.set('Game', this.addChild(Scene.createLayer('Game', 100)));
        this.layers.set('UI', this.addChild(Scene.createLayer('UI', 200)));
    }

    public getLayer(name: LayersNames): PIXI.Container {
        if (!this.layers.has(name)) {
            throw new Error(`Scene: You are a little bastard, the layer '${name}' does not exist in Scene list!`);
        }
        return this.layers.get(name) as PIXI.Container;
    }

    public resize(): void {
        /*do nothing here for now*/
    }
    public update(): void {
        /*do nothing here for now*/
    }
    public cleanup(): void {
        /*do nothing here for now*/
    }

    static createLayer(name: LayersNames | string, zIndex: number): PIXI.Container {
        return UIBuilder.createContainer({ name: name, modifiers: { zIndex } });
    }
}
