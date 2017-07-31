
import { NandChip } from './nand-chip';

let nand: NandChip;

describe('Nand Chip', () => {
    beforeEach(() => {
        nand = new NandChip();
    });

    it('should be created', () => {
        expect(nand).toBeTruthy();
    });

    it('should have 2 inputs named (a, b)', () => {
        expect(nand.inputNames[0]).toBe('a');
        expect(nand.inputNames[1]).toBe('b');
    });

    it('should have two subjects for the inputs', () => {
        try {
            nand.inputs["a"].next(new Uint8Array([0]));
            nand.inputs["b"].next(new Uint8Array([0]));
        } catch (err) {
            expect(false).toBeTruthy('unable to set a');
        }
    });

    it('should have a single output named (out)', () => {
        expect(nand.outputNames[0]).toBe('out');
    });

    it('should have an observable for the output', () => {
        try {
            nand.outputs["out"].subscribe((val) => {
                expect(val).toBeDefined();
            });
        } catch (err) {
            expect(false).toBeTruthy('unable to subscribe to out');
        }
    });

    it('should start off with an output of 1', () => {
        nand.outputs["out"].subscribe((val) => {
            expect(+val).toBe(1);
        });
    });

    // unsure if these below will work with the async nature of the subs....seems to work but i feel like this is wrong.
    it('should emit a 1 when a is 0 and b is 1', () => {
        nand.inputs["a"].next(new Uint8Array([0]));
        nand.inputs["b"].next(new Uint8Array([1]));

        nand.outputs["out"].subscribe((val) => {
            expect(+val).toBe(1);
        });
    });

    it('should emit a 1 when a is 1 and b is 0', () => {
        nand.inputs["a"].next(new Uint8Array([1]));
        nand.inputs["b"].next(new Uint8Array([0]));

        nand.outputs["out"].subscribe((val) => {
            expect(+val).toBe(1);
        });
    });

    it('should emit a 0 when a is 1 and b is 1', () => {
        nand.inputs["a"].next(new Uint8Array([1]));
        nand.inputs["b"].next(new Uint8Array([1]));

        nand.outputs["out"].subscribe((val) => {
            expect(+val).toBe(0);
        });
    });

});
