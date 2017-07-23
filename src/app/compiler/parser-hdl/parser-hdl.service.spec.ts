import { TestBed, inject } from '@angular/core/testing';

import { ParserHdlService } from './parser-hdl.service';
import { TokenizerHdlService } from '../tokenizer-hdl/tokenizer-hdl.service';
import { TokenizerGenericService } from '../tokenizer-generic/tokenizer-generic.service';

import { Token } from '../models/token';
import { parseNode } from '../models/parseNode';

describe('ParserHdlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParserHdlService]
    });
  });

  it('should be created', inject([ParserHdlService], (service: ParserHdlService) => {
    expect(service).toBeTruthy();
  }));

  it('should parse a builtin chip definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = `// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: tools/builtIn/And.hdl

/**
 * And gate: out = 1 if {a == 1 and b == 1}, 0 otherwise  
 */

CHIP And {

    IN  a, b;
    OUT out;

    BUILTIN And;
}
`;

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseChip();

    expect(result.type).toBe('chip');

    expect(result.children[0].token.token).toBe('CHIP');
    expect(result.children[1].type).toBe('word');
    expect(result.children[2].token.token).toBe('{');
    expect(result.children[3].type).toBe('inputs');
    expect(result.children[4].type).toBe('outputs');
    expect(result.children[5].type).toBe('builtin');
    expect(result.children[6].token.token).toBe('}');

    expect(service.testPos()).toBe(15);
  }));

  it('should parse a chip definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'CHIP Foo {\n   IN in[16];\n   OUT out[8];\n   PARTS:\n       Not16 (in=in, out[0..7]=low8, out[8..15]=high8);\n       Something8 (a=low8, b=high8, out=out);\n}';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseChip();

    expect(result.type).toBe('chip');

    expect(result.children[0].token.token).toBe('CHIP');
    expect(result.children[1].type).toBe('word');
    expect(result.children[2].token.token).toBe('{');
    expect(result.children[3].type).toBe('inputs');
    expect(result.children[4].type).toBe('outputs');
    expect(result.children[5].type).toBe('parts');
    expect(result.children[6].token.token).toBe('}');

    expect(service.testPos()).toBe(57);
  }));

  it('should parse an input definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'IN a[16], b[16];';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseInputs();

    expect(result.type).toBe('inputs');

    expect(result.children[0].token.token).toBe('IN');
    expect(result.children[1].type).toBe('iodefs');
    expect(result.children[2].token.token).toBe(';');

    expect(service.testPos()).toBe(11);
  }));

  it('should parse an output definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'OUT a[16], b[16];';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseOutputs();

    expect(result.type).toBe('outputs');

    expect(result.children[0].token.token).toBe('OUT');
    expect(result.children[1].type).toBe('iodefs');
    expect(result.children[2].token.token).toBe(';');

    expect(service.testPos()).toBe(11);
  }));

  it('should parse a multiple input output definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'a[16], b[16]';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseIODefs();

    expect(result.type).toBe('iodefs');

    expect(result.children[0].type).toBe('pindef');
    expect(result.children[1].token.token).toBe(',');
    expect(result.children[2].type).toBe('pindef');

    expect(service.testPos()).toBe(9);
  }));

  it('should parse a single input output definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'in[16]';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseIODefs();

    expect(result.type).toBe('iodefs');

    expect(result.children[0].type).toBe('pindef');

    expect(service.testPos()).toBe(4);
  }));

  it('should parse a builtin chip parts definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'BUILTIN And;';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseBuiltin();

    expect(result.type).toBe('builtin');

    expect(result.children[0].token.token).toBe('BUILTIN');
    expect(result.children[1].token.token).toBe('And');
    expect(result.children[2].token.token).toBe(';');

    expect(service.testPos()).toBe(3);
  }));

  it('should parse a single line parts definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'PARTS: And(a=a, b=b, out=out);}';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseParts();

    expect(result.type).toBe('parts');

    expect(result.children[0].token.token).toBe('PARTS:');
    expect(result.children[1].token.token).toBe('And');
    expect(result.children[2].token.token).toBe('(');

    expect(result.children[3].type).toBe('impdef');

    expect(result.children[4].token.token).toBe(')');
    expect(result.children[5].token.token).toBe(';');

    expect(service.testPos()).toBe(16);
  }));

  it('should parse a multi line parts definition', inject([ParserHdlService], (service: ParserHdlService) => {
    let str = 'PARTS: And(a=a, b=b, out=out); Or(d=d, c=c, out=out); }';

    let tokenizer = new TokenizerHdlService(new TokenizerGenericService());
    let tokens = tokenizer.tokenize(str);

    service.testSetup(0, tokens);

    let result: parseNode = service.parseParts();

    expect(result.type).toBe('parts');

    expect(result.children[0].token.token).toBe('PARTS:');
    expect(result.children[1].token.token).toBe('And');
    expect(result.children[2].token.token).toBe('(');

    expect(result.children[3].type).toBe('impdef');

    expect(result.children[4].token.token).toBe(')');
    expect(result.children[5].token.token).toBe(';');

    expect(result.children[6].token.token).toBe('Or');
    expect(result.children[7].token.token).toBe('(');

    expect(result.children[8].type).toBe('impdef');

    expect(result.children[9].token.token).toBe(')');
    expect(result.children[10].token.token).toBe(';');

    expect(service.testPos()).toBe(31);
  }));

  it('should parse a single implementation definition', inject([ParserHdlService], (service: ParserHdlService) => {
    // a[8]=a[8]
    let tokens: Token[] = [
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
      {
        token: '=',
        type: 'symbol'
      },
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parseImpDef();

    expect(result.type).toBe('impdef');
    checkPinDef(result.children[0]);
    expect(result.children[1].token.token).toBe('=');
    checkPinDef(result.children[2]);

    expect(service.testPos()).toBe(9);
  }));

  it('should parse a multiple implementation definition', inject([ParserHdlService], (service: ParserHdlService) => {
    // a[8]=a[8]
    let tokens: Token[] = [
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
      {
        token: '=',
        type: 'symbol'
      },
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
      {
        token: ',',
        type: 'symbol'
      },
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
      {
        token: '=',
        type: 'symbol'
      },
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      },
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parseImpDef();

    expect(result.type).toBe('impdef');
    checkPinDef(result.children[0]);
    expect(result.children[1].token.token).toBe('=');
    checkPinDef(result.children[2]);
    expect(result.children[3].token.token).toBe(',');
    checkPinDef(result.children[4]);
    expect(result.children[5].token.token).toBe('=');
    checkPinDef(result.children[6]);


    expect(service.testPos()).toBe(19);
  }));

  it('should parse a pinless io chip-pin designation', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: 'a',
        type: 'word'
      }
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parsePinDef();

    expect(result.token).toBeFalsy();
    expect(result.type).toBe('pindef');
    expect(result.token).toBeFalsy();

    expect(result.children[0].type).toBe('word');
    expect(result.children[0].token.token).toBe('a');
    expect(result.children[0].token.type).toBe('word');
    expect(result.children[0].children.length).toBe(0);

    expect(service.testPos()).toBe(1);
  }));

  it('should parse a pinned io chip-pin designation', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: 'a',
        type: 'word'
      },
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parsePinDef();
    checkPinDef(result);

    expect(service.testPos()).toBe(4);
  }));

  function checkPinDef(result: parseNode) {
    expect(result.token).toBeFalsy();
    expect(result.type).toBe('pindef');
    expect(result.token).toBeFalsy();

    expect(result.children[0].type).toBe('word');
    expect(result.children[0].token.token).toBe('a');
    expect(result.children[0].token.type).toBe('word');

    let pins = result.children[1];
    checkPins(pins);
  }

  it('should parse a single-pin designation', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parsePins();

    checkPins(result);

    expect(service.testPos()).toBe(3);
  }));

  // helper function that just tests for a pins node with [8]
  function checkPins(result: parseNode) {
    expect(result.token).toBeFalsy();
    expect(result.type).toBe('pins');
    expect(result.token).toBeFalsy();

    expect(result.children[0].type).toBe('symbol');
    expect(result.children[0].token.token).toBe('[');
    expect(result.children[0].token.type).toBe('symbol');
    expect(result.children[0].children.length).toBe(0);

    expect(result.children[1].type).toBe('pin');
    expect(result.children[1].token.token).toBe('8');
    expect(result.children[1].token.type).toBe('pin');
    expect(result.children[1].children.length).toBe(0);

    expect(result.children[2].type).toBe('symbol');
    expect(result.children[2].token.token).toBe(']');
    expect(result.children[2].token.type).toBe('symbol');
    expect(result.children[2].children.length).toBe(0);

  }

  it('should parse a multi-pin designation', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: '..',
        type: 'symbol'
      },
      {
        token: '10',
        type: 'pin'
      },
      {
        token: ']',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parsePins();

    expect(result.token).toBeFalsy();
    expect(result.type).toBe('pins');
    expect(result.token).toBeFalsy();

    expect(result.children[0].type).toBe('symbol');
    expect(result.children[0].token.token).toBe('[');
    expect(result.children[0].token.type).toBe('symbol');
    expect(result.children[0].children.length).toBe(0);

    expect(result.children[1].type).toBe('pin');
    expect(result.children[1].token.token).toBe('8');
    expect(result.children[1].token.type).toBe('pin');
    expect(result.children[1].children.length).toBe(0);

    expect(result.children[2].type).toBe('symbol');
    expect(result.children[2].token.token).toBe('..');
    expect(result.children[2].token.type).toBe('symbol');
    expect(result.children[2].children.length).toBe(0);

    expect(result.children[3].type).toBe('pin');
    expect(result.children[3].token.token).toBe('10');
    expect(result.children[3].token.type).toBe('pin');
    expect(result.children[3].children.length).toBe(0);

    expect(result.children[4].type).toBe('symbol');
    expect(result.children[4].token.token).toBe(']');
    expect(result.children[4].token.type).toBe('symbol');
    expect(result.children[4].children.length).toBe(0);

    expect(service.testPos()).toBe(5);
  }));

  it('should display error if pin designation wrong', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '[',
        type: 'symbol'
      },
      {
        token: '8',
        type: 'pin'
      },
      {
        token: '..',
        type: 'symbol'
      },
      {
        token: ']',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    try {
      let result: parseNode = service.parsePins();
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toBe('SyntaxError: Expected a pin number at position 3');
    }

  }));

  it('should parse a symbol', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '}',
        type: 'symbol'
      },
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parseSymbol('}');

    expect(result.type).toBe('symbol');
    expect(result.token.token).toBe('}');
    expect(result.token.type).toBe('symbol');
    expect(result.children.length).toBe(0);
    expect(service.testPos()).toBe(1);
  }));

  it('should throw an error when parsing a symbol fails', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '..',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    try {
      let result: parseNode = service.parseSymbol('}');
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toBe('SyntaxError: Expected a } at position 0');
    }
  }));

  it('should parse a keyword', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: 'PARTS:',
        type: 'keyword'
      },
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parseKeyword('PARTS:');

    expect(result.type).toBe('keyword');
    expect(result.token.token).toBe('PARTS:');
    expect(result.token.type).toBe('keyword');
    expect(result.children.length).toBe(0);
    expect(service.testPos()).toBe(1);
  }));

  it('should throw an error when parsing a symbol fails', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '..',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    try {
      let result: parseNode = service.parseKeyword('PARTS:');
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toBe('SyntaxError: Expected keyword PARTS: at position 0');
    }
  }));

  it('should parse a pin (number)', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '16',
        type: 'pin'
      },
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parsePin();

    expect(result.type).toBe('pin');
    expect(result.token.token).toBe('16');
    expect(result.token.type).toBe('pin');
    expect(result.children.length).toBe(0);
    expect(service.testPos()).toBe(1);
  }));

  it('should throw an error when parsing a pin fails', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '}',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    try {
      let result: parseNode = service.parsePin();
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toBe('SyntaxError: Expected a pin number at position 0');
    }
  }));

  it('should parse a word', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: 'aword',
        type: 'word'
      }
    ];

    service.testSetup(0, tokens);

    let result: parseNode = service.parseWord();

    expect(result.type).toBe('word');
    expect(result.token.token).toBe('aword');
    expect(result.token.type).toBe('word');
    expect(result.children.length).toBe(0);
    expect(service.testPos()).toBe(1);
  }));

  it('should throw an error when parsing a word fails', inject([ParserHdlService], (service: ParserHdlService) => {
    let tokens: Token[] = [
      {
        token: '}',
        type: 'symbol'
      }
    ];

    service.testSetup(0, tokens);

    try {
      let result: parseNode = service.parseWord();
      expect(false).toBeTruthy();
    } catch (error) {
      expect(error.message).toBe('SyntaxError: Expected an identifier at position 0');
    }
  }));

});
