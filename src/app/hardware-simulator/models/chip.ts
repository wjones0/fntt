import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { parseNode } from '../../compiler/models/parseNode';

export interface Chip {

    inputs: BehaviorSubject<Uint8Array>[];
    inputNames: string[];

    outputs: Observable<Uint8Array>[];
    outputNames: string[];

    disassemble();
}