
import { ParserHdlService } from '../../compiler/parser-hdl/parser-hdl.service';
import { TokenizerHdlService } from '../../compiler/tokenizer-hdl/tokenizer-hdl.service';
import { TokenizerGenericService } from '../../compiler/tokenizer-generic/tokenizer-generic.service';

import { CustomChip } from './custom-chip';
import { parseNode } from '../../compiler/models/parseNode';

let chip: CustomChip;
let parser: ParserHdlService;
let tokenizer: TokenizerHdlService;

let parseTree: parseNode;

describe('Chip Style 1 (not)', () => {
    beforeEach(() => {
        let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
        let parser = new ParserHdlService();

        let textfile = `// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/01/Not.hdl\n\n/**\n * Not gate:\n * out = not in\n */\n\nCHIP Not {\n    IN in;\n    OUT out;\n\n    PARTS:\n    Nand(a=in, b=in, out=out);\n}`;

        parser.loadTokens(tokenizer.tokenize(textfile));
        let parseTree = parser.parseChip();

        chip = new CustomChip(parseTree);
    });

    it('should be created', () => {
        expect(chip).toBeTruthy();
    });

    it('should have 1 input named (in)', () => {
        expect(chip.inputNames[0]).toBe('in');
    });

    it('should have subjects for the inputs', () => {
        try {
            chip.inputs["in"].next(new Uint8Array([0]));
        } catch (err) {
            expect(false).toBeTruthy('unable to set in');
        }
    });

    it('should have a single output named (out)', () => {
        expect(chip.outputNames[0]).toBe('out');
    });

    it('should have an observable for the output', () => {
        try {
            chip.outputs["out"].subscribe((val) => {
                expect(val).toBeDefined();
            });
        } catch (err) {
            expect(false).toBeTruthy('unable to subscribe to out');
        }
    });

    it('should start off with an output of 1', () => {
        chip.outputs["out"].subscribe((val) => {
            expect(+val).toBe(1);
        });
    });

    // // unsure if these below will work with the async nature of the subs....seems to work but i feel like this is wrong.
    it('should emit a 0 when in is 1', () => {
        chip.inputs["in"].next(new Uint8Array([1]));

        chip.outputs["out"].subscribe((val) => {
            expect(+val).toBe(0);
        });
    });

    it('should emit a 1 when in is 0', () => {
        chip.inputs["in"].next(new Uint8Array([0]));

        chip.outputs["out"].subscribe((val) => {
            expect(+val).toBe(1);
        });
    });

});
