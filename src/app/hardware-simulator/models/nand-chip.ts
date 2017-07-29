import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Chip } from './chip';

export class NandChip extends Chip {

    constructor() {
        super();

        // set out input names
        this.inputNames.push("a");
        this.inputNames.push("b");

        // set our output names
        this.outputNames.push("out");

        // setup the input subjects
        this.inputs["a"] = new BehaviorSubject<Uint8Array>(new Uint8Array([0]));
        this.inputs["b"] = new BehaviorSubject<Uint8Array>(new Uint8Array([0]));

        // setup our internal observables so we can get updates
        this._inputs["a"] = this.inputs["a"].asObservable();
        this._inputs["b"] = this.inputs["b"].asObservable();

        // setup the outputs
        this._outputs["out"] = new BehaviorSubject<Uint8Array>(new Uint8Array([]));
        this.outputs["out"] = this._outputs["out"].asObservable();

        // subscribe to the input observables to compute the output
        const combinedInputs = Observable.combineLatest(this._inputs["a"], this._inputs["b"]);
        this.subscriptions.push(combinedInputs.subscribe(value => {
            let a: number = +value[0];
            let b: number = +value[1];

            if (a && b) {
                this._outputs["out"].next(new Uint8Array([0]));
            } else {
                this._outputs["out"].next(new Uint8Array([1]));
            }
        }));
    }
}