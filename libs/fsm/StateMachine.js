import { NullState } from "./NullState";

export class StateMachine {
    constructor(target) {
        this.target = target;
        this.states = [];
        this.currentState = undefined;
        this.previousState = undefined;
    }

    changeStateTo(name) {
        const onExitFinished = () => {
            const newState = this.getStateByName(name);
            newState.onEnterState();
            this.swapStates(newState);
        };

        if (this.currentState) {
            this.currentState.onExitState(onExitFinished);
        }
        else {
            onExitFinished();
        }
    }

    registerStates(states) {
        if (!Array.isArray(states)) {
            states = [states];
        }
        states.forEach((state) => this.states.push(state));
    }

    getStateByName(name) {
        const state = this.states.find((state) => state.name === name);
        if (!state) {
            return new NullState(name, this);
        }
        return state;
    }

    swapStates(newState) {
        this.previousState = this.currentState;
        this.currentState = newState;
        StateMachine.log(this.currentState, this.previousState);
    }

    static log(currState, previousState) {
        console.log(`%c State was change!
            previous state: ${previousState && previousState.name}
            current state: ${currState && currState.name}`, 'color: white; background: black; font-size: 15px');
    }
}