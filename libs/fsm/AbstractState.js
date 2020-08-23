export class AbstractState {

    constructor(name, fsm) {
        this.name = name;
        this.fsm = fsm;
    }

    onEnterState() {
        throw new Error("Method must be implemented");
    };

    onExitState(onFinish) {
        throw new Error("Method must be implemented");
    };

    goToNextState(stateName) {
        this.fsm.changeStateTo(stateName);
    }
}