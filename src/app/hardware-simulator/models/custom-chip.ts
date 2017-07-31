import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { parseNode } from '../../compiler/models/parseNode';
import { Chip } from './chip';
import { NandChip } from './nand-chip';

export class CustomChip implements Chip {

    public inputs: BehaviorSubject<Uint8Array>[] = [];
    private _inputs: Observable<Uint8Array>[] = [];
    public inputNames: string[] = [];

    private _outputs: BehaviorSubject<Uint8Array>[] = [];
    public outputs: Observable<Uint8Array>[] = [];
    public outputNames: string[] = [];

    private _subscriptions: Subscription[] = [];
    private _chips: Chip[] = [];

    constructor(node?: parseNode) {
        if (!node)
            return;

        //* Chip -> CHIP _word_ { _inputs_ _outputs_ (_parts_ | _builtin_)  }
        this.createInputs(node.children[3]);
        this.createOutputs(node.children[4]);
        this.wireUpSubChips(node.children[5]);
    }

    private createInputs(inputNode: parseNode) {
        // * inputs -> IN _iodefs_;
        // * iodefs -> _pindef_(, _pindef_) *
        // * pindef -> _word_(_pins_) ?
        // * pins -> [_pin_(.._pin_) ?]
        // * pin -> NUMBER
        // * word -> STRING_IDENTIFIER        
        let iodefs = inputNode.children[1];

        for (let input of iodefs.children) {
            if (input.type === 'pindef') {
                this.addInput(input);
            }
        }
    }

    private addInput(input: parseNode) {
        let inName = input.children[0].token.token;
        this.inputNames.push(inName);
        this.inputs[inName] = new BehaviorSubject<Uint8Array>(new Uint8Array([0]));
        this._inputs[inName] = this.inputs[inName].asObservable();
    }

    private createOutputs(outputNode: parseNode) {
        // * outputs -> OUT _iodefs_;
        // * iodefs -> _pindef_ (, _pindef_)*
        // * pindef -> _word_(_pins_)?
        // * pins -> [_pin_ (.._pin_)?]
        // * pin -> NUMBER
        // * word -> STRING_IDENTIFIER
        let iodefs = outputNode.children[1];

        for (let output of iodefs.children) {
            if (output.type === 'pindef') {
                this.addOutput(output);
            }
        }
    }

    private addOutput(output: parseNode) {
        let outName = output.children[0].token.token;
        this.outputNames.push(outName);
        this._outputs[outName] = new BehaviorSubject<Uint8Array>(new Uint8Array([]));
        this.outputs[outName] = this._outputs[outName].asObservable();
    }

    private wireUpSubChips(partsNode: parseNode) {
        // * parts -> PARTS: (_word_ \( _impdefs_ \))+;
        // * impdefs -> _pindef_=_pindef_ (, _pindef_=_pindef_)*

        //skipping PARTS keyword
        let currPartPosition = 1;

        while (currPartPosition < partsNode.children.length - 1) {
            // get chip by name
            let chip = this.fetchChip(partsNode.children[currPartPosition].token.token);
            this._chips.push(chip);
            currPartPosition++;

            // // skip (
            currPartPosition++;

            this.WireUpImpDefs(partsNode.children[currPartPosition], chip);

            // skip )
            currPartPosition++;
            // skip ;
            currPartPosition++;
        }
    }

    private WireUpImpDefs(impDefNode: parseNode, chip: Chip) {
        // * pindef -> _word_(_pins_)?
        // * pins -> [_pin_ (.._pin_)?]
        // * pin -> NUMBER
        // * word -> STRING_IDENTIFIER

        let currImpDefPos = 0;

        while (currImpDefPos < impDefNode.children.length - 1) {
            // // Need to update for subpins in the future!
            // // get the subchip in name
            let subPinName = impDefNode.children[currImpDefPos].children[0].token.token;
            currImpDefPos++;

            // skip =
            currImpDefPos++;

            // // get the outer chip input line
            let mainPinName = impDefNode.children[currImpDefPos].children[0].token.token;
            currImpDefPos++;

            // skip ,
            currImpDefPos++;

            // if an input - subscribe to out and set to inner input
            // like a=in in a Not chip
            if (this._inputs[mainPinName]) {
                this._subscriptions.push(
                    this._inputs[mainPinName].subscribe((value) => {
                        chip.inputs[subPinName].next(new Uint8Array([+value]));
                    })
                );
            } else
                // otherwise if it is an output - subscribe to the chips pin
                // like out=out in a Not chip
                if (this._outputs[mainPinName]) {
                    this._subscriptions.push(
                        chip.outputs[subPinName].subscribe((value) => {
                            this._outputs[mainPinName].next(new Uint8Array([+value]));
                        })
                    );
                }
        }
    }

    private fetchChip(chipName: string): Chip {
        return new NandChip();
    }

    disassemble() {
        for (let c of this._chips) {
            c.disassemble();
        }

        for (let s of this._subscriptions) {
            s.unsubscribe();
        }
    }

}
