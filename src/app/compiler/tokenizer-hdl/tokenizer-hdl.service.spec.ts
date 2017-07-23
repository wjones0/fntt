import { TestBed, inject } from '@angular/core/testing';

import { TokenizerGenericService } from '../tokenizer-generic/tokenizer-generic.service';
import { TokenizerHdlService } from './tokenizer-hdl.service';

describe('TokenizerHdlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenizerGenericService,
        TokenizerHdlService
      ]
    });
  });

  it('should be created', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    expect(service).toBeTruthy();
  }));

  it('should tokenize keywords', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "CHIP IN OUT PARTS: CLOCKED BUILTIN";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(6);

    expect(tokens[0].token).toBe("CHIP");
    expect(tokens[0].type).toBe("keyword");

    expect(tokens[1].token).toBe("IN");
    expect(tokens[1].type).toBe("keyword");

    expect(tokens[2].token).toBe("OUT");
    expect(tokens[2].type).toBe("keyword");

    expect(tokens[3].token).toBe("PARTS:");
    expect(tokens[3].type).toBe("keyword");

    expect(tokens[4].token).toBe("CLOCKED");
    expect(tokens[4].type).toBe("keyword");

    expect(tokens[5].token).toBe("BUILTIN");
    expect(tokens[5].type).toBe("keyword");
  }));

  it('should tokenize symbols', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "{}();,[]..";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(9);

    expect(tokens[0].token).toBe("{");
    expect(tokens[0].type).toBe("symbol");

    expect(tokens[1].token).toBe("}");
    expect(tokens[1].type).toBe("symbol");

    expect(tokens[2].token).toBe("(");
    expect(tokens[2].type).toBe("symbol");

    expect(tokens[3].token).toBe(")");
    expect(tokens[3].type).toBe("symbol");

    expect(tokens[4].token).toBe(";");
    expect(tokens[4].type).toBe("symbol");

    expect(tokens[5].token).toBe(",");
    expect(tokens[5].type).toBe("symbol");

    expect(tokens[6].token).toBe("[");
    expect(tokens[6].type).toBe("symbol");

    expect(tokens[7].token).toBe("]");
    expect(tokens[7].type).toBe("symbol");

    expect(tokens[8].token).toBe("..");
    expect(tokens[8].type).toBe("symbol");
  }));

  it('should tokenize words', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "These are some words";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(4);

    expect(tokens[0].token).toBe("These");
    expect(tokens[0].type).toBe("word");

    expect(tokens[1].token).toBe("are");
    expect(tokens[1].type).toBe("word");

    expect(tokens[2].token).toBe("some");
    expect(tokens[2].type).toBe("word");

    expect(tokens[3].token).toBe("words");
    expect(tokens[3].type).toBe("word");

  }));

  it('should tokenize everything', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/01/Not16.hdl\n\n/**\n * 16-bit Not:\n * for i=0..15: out[i] = not in[i]\n */\n\nCHIP Not16 {\n    IN in[16];\n    OUT out[16];\n\n    PARTS:\n    // Put your code here:\n}";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(17);

    expect(tokens[0].token).toBe("CHIP");
    expect(tokens[0].type).toBe("keyword");

    expect(tokens[1].token).toBe("Not16");
    expect(tokens[1].type).toBe("word");

    expect(tokens[2].token).toBe("{");
    expect(tokens[2].type).toBe("symbol");

    expect(tokens[3].token).toBe("IN");
    expect(tokens[3].type).toBe("keyword");

    expect(tokens[4].token).toBe("in");
    expect(tokens[4].type).toBe("word");

    expect(tokens[5].token).toBe("[");
    expect(tokens[5].type).toBe("symbol");

    expect(tokens[6].token).toBe("16");
    expect(tokens[6].type).toBe("pin");

    expect(tokens[7].token).toBe("]");
    expect(tokens[7].type).toBe("symbol");

    expect(tokens[8].token).toBe(";");
    expect(tokens[8].type).toBe("symbol");

    expect(tokens[9].token).toBe("OUT");
    expect(tokens[9].type).toBe("keyword");

    expect(tokens[10].token).toBe("out");
    expect(tokens[10].type).toBe("word");

    expect(tokens[11].token).toBe("[");
    expect(tokens[11].type).toBe("symbol");

    expect(tokens[12].token).toBe("16");
    expect(tokens[12].type).toBe("pin");

    expect(tokens[13].token).toBe("]");
    expect(tokens[13].type).toBe("symbol");

    expect(tokens[14].token).toBe(";");
    expect(tokens[14].type).toBe("symbol");

    expect(tokens[15].token).toBe("PARTS:");
    expect(tokens[15].type).toBe("keyword");

    expect(tokens[16].token).toBe("}");
    expect(tokens[16].type).toBe("symbol");


  }));

  it('should tokenize more things', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "CHIP Foo {\n\t   IN in[16];\n\t   OUT out[8];\n\t   PARTS:\n\t       Not16 (in=in, out[0..7]=low8, out[8..15]=high8);\n\t       Something8 (a=low8, b=high8, out=out);\n\t}";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(57);

    expect(tokens[0].token).toBe("CHIP");
    expect(tokens[0].type).toBe("keyword");

    expect(tokens[1].token).toBe("Foo");
    expect(tokens[1].type).toBe("word");

    expect(tokens[2].token).toBe("{");
    expect(tokens[2].type).toBe("symbol");

    expect(tokens[3].token).toBe("IN");
    expect(tokens[3].type).toBe("keyword");

    expect(tokens[4].token).toBe("in");
    expect(tokens[4].type).toBe("word");

    expect(tokens[5].token).toBe("[");
    expect(tokens[5].type).toBe("symbol");

    expect(tokens[6].token).toBe("16");
    expect(tokens[6].type).toBe("pin");

    expect(tokens[7].token).toBe("]");
    expect(tokens[7].type).toBe("symbol");

    expect(tokens[8].token).toBe(";");
    expect(tokens[8].type).toBe("symbol");

    expect(tokens[9].token).toBe("OUT");
    expect(tokens[9].type).toBe("keyword");

    expect(tokens[10].token).toBe("out");
    expect(tokens[10].type).toBe("word");

    expect(tokens[11].token).toBe("[");
    expect(tokens[11].type).toBe("symbol");

    expect(tokens[12].token).toBe("8");
    expect(tokens[12].type).toBe("pin");

    expect(tokens[13].token).toBe("]");
    expect(tokens[13].type).toBe("symbol");

    expect(tokens[14].token).toBe(";");
    expect(tokens[14].type).toBe("symbol");

    expect(tokens[15].token).toBe("PARTS:");
    expect(tokens[15].type).toBe("keyword");

    expect(tokens[16].token).toBe("Not16");
    expect(tokens[16].type).toBe("word");

    expect(tokens[17].token).toBe("(");
    expect(tokens[17].type).toBe("symbol");

    expect(tokens[18].token).toBe("in");
    expect(tokens[18].type).toBe("word");

    expect(tokens[19].token).toBe("=");
    expect(tokens[19].type).toBe("symbol");

    expect(tokens[20].token).toBe("in");
    expect(tokens[20].type).toBe("word");

    expect(tokens[21].token).toBe(",");
    expect(tokens[21].type).toBe("symbol");

    expect(tokens[22].token).toBe("out");
    expect(tokens[22].type).toBe("word");

    expect(tokens[23].token).toBe("[");
    expect(tokens[23].type).toBe("symbol");

    expect(tokens[24].token).toBe("0");
    expect(tokens[24].type).toBe("pin");

    expect(tokens[25].token).toBe("..");
    expect(tokens[25].type).toBe("symbol");

    expect(tokens[26].token).toBe("7");
    expect(tokens[26].type).toBe("pin");

    expect(tokens[27].token).toBe("]");
    expect(tokens[27].type).toBe("symbol");

    expect(tokens[28].token).toBe("=");
    expect(tokens[28].type).toBe("symbol");

    expect(tokens[29].token).toBe("low8");
    expect(tokens[29].type).toBe("word");

    expect(tokens[30].token).toBe(",");
    expect(tokens[30].type).toBe("symbol");

    expect(tokens[31].token).toBe("out");
    expect(tokens[31].type).toBe("word");

    expect(tokens[32].token).toBe("[");
    expect(tokens[32].type).toBe("symbol");

    expect(tokens[33].token).toBe("8");
    expect(tokens[33].type).toBe("pin");

    expect(tokens[34].token).toBe("..");
    expect(tokens[34].type).toBe("symbol");

    expect(tokens[35].token).toBe("15");
    expect(tokens[35].type).toBe("pin");

    expect(tokens[36].token).toBe("]");
    expect(tokens[36].type).toBe("symbol");

    expect(tokens[37].token).toBe("=");
    expect(tokens[37].type).toBe("symbol");

    expect(tokens[38].token).toBe("high8");
    expect(tokens[38].type).toBe("word");

    expect(tokens[39].token).toBe(")");
    expect(tokens[39].type).toBe("symbol");

    expect(tokens[40].token).toBe(";");
    expect(tokens[40].type).toBe("symbol");

    expect(tokens[41].token).toBe("Something8");
    expect(tokens[41].type).toBe("word");

    expect(tokens[42].token).toBe("(");
    expect(tokens[42].type).toBe("symbol");

    expect(tokens[43].token).toBe("a");
    expect(tokens[43].type).toBe("word");

    expect(tokens[44].token).toBe("=");
    expect(tokens[44].type).toBe("symbol");

    expect(tokens[45].token).toBe("low8");
    expect(tokens[45].type).toBe("word");

    expect(tokens[46].token).toBe(",");
    expect(tokens[46].type).toBe("symbol");

    expect(tokens[47].token).toBe("b");
    expect(tokens[47].type).toBe("word");

    expect(tokens[48].token).toBe("=");
    expect(tokens[48].type).toBe("symbol");

    expect(tokens[49].token).toBe("high8");
    expect(tokens[49].type).toBe("word");

    expect(tokens[50].token).toBe(",");
    expect(tokens[50].type).toBe("symbol");

    expect(tokens[51].token).toBe("out");
    expect(tokens[51].type).toBe("word");

    expect(tokens[52].token).toBe("=");
    expect(tokens[52].type).toBe("symbol");

    expect(tokens[53].token).toBe("out");
    expect(tokens[53].type).toBe("word");

    expect(tokens[54].token).toBe(")");
    expect(tokens[54].type).toBe("symbol");

    expect(tokens[55].token).toBe(";");
    expect(tokens[55].type).toBe("symbol");

    expect(tokens[56].token).toBe("}");
    expect(tokens[56].type).toBe("symbol");


  }));

});
