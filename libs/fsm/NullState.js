import { AbstractState } from "./AbstractState";

export class NullState extends AbstractState {
    constructor(name, fsm) {
        super(name, fsm);
    }

    onEnterState() {
        throw new Error(`${this.name} state was not fund, NullState was used`);
    }

    onExitState(onFinish) {
        throw new Error(`${this.name} state was not fund, NullState was used`);
    }
}