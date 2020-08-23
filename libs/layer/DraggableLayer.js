
import { AbstractLayer } from "./AbstractLayer";

export class DraggableLayer extends AbstractLayer {

    constructor({ viewPortSizes, ...layerData }) {
        super(layerData);

        this._isClicked = false;
        this._pointersId = [];
        this._viewPortSizes = viewPortSizes;

        this._pointerStartPos = { x: 0, y: 0 };
        this._moveBy = { dx: 0, dy: 0 };

        this.on("pointerdown", this._onPointerDown, this);
        this.on("pointermove", this._onPointerMove, this);
        this.on("pointerup", this._onPointerUp, this);
        this.on("pointerupoutside", this._onPointerUp, this);
    }

    /**
     * Activate interactivity of the layer
     */
    activate() {
        this.interactive = true;
    }

    /**
     * Deactivate interactivity of the layer
     */
    deactivate() {
        this.interactive = false;
    }

    _onPointerDown({ data }) {
        if (this._isClicked) {
            return;
        }

        this._pointersId.push(data.pointerId);
        this._isClicked = true;

        this._pointerStartPos = data.getLocalPosition(this);
    }

    _onPointerMove({ data }) {
        if (!this._isClicked) {
            return;
        }

        this._calculateMove(data);
    }

    _onPointerUp({ data }) {
        if (this._pointersId.indexOf(data.pointerId) !== -1) {
            return;
        }

        this._pointersId = [];
        this._isClicked = false;
    }

    _calculateMove(data) {
        const endPos = data.getLocalPosition(this);
        this._moveBy = {
            dx: endPos.x - this._pointerStartPos.x,
            dy: endPos.y - this._pointerStartPos.y
        }
    }

    _move() {
        const { x, y } = this.position;
        const { width, height } = this._viewPortSizes;
        const bounds = this.getLocalBounds();

        const newX = x + this._moveBy.dx;
        const newY = y + this._moveBy.dy;
        this._moveBy = { dx: 0, dy: 0 };

        const marginW = (bounds.width - width) / 2;
        const marginH = (bounds.height - height) / 2;

        this.position.set(
            Math.min(Math.abs(newX), marginW) * Math.sign(newX),
            Math.min(Math.abs(newY), marginH) * Math.sign(newY)
        );
    }

    update(dt) {
        this._move();
    }

    resize(sizes) { };

    cleanup() { };
}