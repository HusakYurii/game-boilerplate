import { AbstractState } from "./AbstractState";

export class NullState extends AbstractState {
    constructor(name: string, fsm: FSM.IStateMachine) {
        super(name, fsm);
    }

    public onEnterState(): never {
        throw new Error(`${this.name} state was not fund, NullState was used`);
    }

    public onExitState(onFinish: () => void): never {
        throw new Error("Method not implemented.");
    }
}
