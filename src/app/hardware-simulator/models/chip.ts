import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { parseNode } from '../../compiler/models/parseNode';

export class Chip {

    public inputs: BehaviorSubject<Uint8Array>[] = [];
    protected _inputs: Observable<Uint8Array>[] = [];
    public inputNames: string[] = [];

    protected _outputs: BehaviorSubject<Uint8Array>[] = [];
    public outputs: Observable<Uint8Array>[] = [];
    public outputNames: string[] = [];

    protected subscriptions: Subscription[] = [];

    constructor(node?: parseNode) {
        if (!node)
            return;
        this.inputs["a"] = new BehaviorSubject<Uint8Array>(new Uint8Array([0, 2]));
        this.inputs["b"] = new BehaviorSubject<Uint8Array>(new Uint8Array([1]));

        this.inputs["a"].next(new Uint8Array([2, 3, 4]));
        this.outputs["out"] = this.inputs["b"].asObservable();
        this.outputs["other"] = this.inputs["a"].asObservable();

        this.inputNames = ["a", "b"];
        this.outputNames = ["out", "other"];
    }

    disassemble() {
        for (let s of this.subscriptions) {
            s.unsubscribe();
        }
    }

}
