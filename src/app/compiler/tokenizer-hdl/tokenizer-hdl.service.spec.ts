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
    let hdl = "{}();,";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(6);

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
  }));

  it('should tokenize words', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "These are: s[o]me w[o]rds..";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(4);

    expect(tokens[0].token).toBe("These");
    expect(tokens[0].type).toBe("word");

    expect(tokens[1].token).toBe("are:");
    expect(tokens[1].type).toBe("word");

    expect(tokens[2].token).toBe("s[o]me");
    expect(tokens[2].type).toBe("word");

    expect(tokens[3].token).toBe("w[o]rds..");
    expect(tokens[3].type).toBe("word");

  }));

  it('should tokenize everything', inject([TokenizerHdlService], (service: TokenizerHdlService) => {
    let hdl = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/01/Not16.hdl\n\n/**\n * 16-bit Not:\n * for i=0..15: out[i] = not in[i]\n */\n\nCHIP Not16 {\n    IN in[16];\n    OUT out[16];\n\n    PARTS:\n    // Put your code here:\n}";

    let tokens = service.tokenize(hdl);

    expect(tokens.length).toBe(11);

    expect(tokens[0].token).toBe("CHIP");
    expect(tokens[0].type).toBe("keyword");

    expect(tokens[1].token).toBe("Not16");
    expect(tokens[1].type).toBe("word");

    expect(tokens[2].token).toBe("{");
    expect(tokens[2].type).toBe("symbol");

    expect(tokens[3].token).toBe("IN");
    expect(tokens[3].type).toBe("keyword");

    expect(tokens[4].token).toBe("in[16]");
    expect(tokens[4].type).toBe("word");

    expect(tokens[5].token).toBe(";");
    expect(tokens[5].type).toBe("symbol");

    expect(tokens[6].token).toBe("OUT");
    expect(tokens[6].type).toBe("keyword");

    expect(tokens[7].token).toBe("out[16]");
    expect(tokens[7].type).toBe("word");

    expect(tokens[8].token).toBe(";");
    expect(tokens[8].type).toBe("symbol");

    expect(tokens[9].token).toBe("PARTS:");
    expect(tokens[9].type).toBe("keyword");

    expect(tokens[10].token).toBe("}");
    expect(tokens[10].type).toBe("symbol");


  }));

});
