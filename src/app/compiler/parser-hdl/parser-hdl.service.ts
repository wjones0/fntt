import { Injectable } from '@angular/core';

import { Token } from '../models/token';
import { parseNode } from '../models/parseNode';

@Injectable()
export class ParserHdlService {

  private _tokenPos = 0;
  private _tokens: Token[];

  constructor() { }

  currentToken(): Token {
    return this._tokens[this._tokenPos];
  }

  advance() {
    this._tokenPos++;
  }

  checkToken(token: string): boolean {
    try {
      if (this._tokens[this._tokenPos].token === token) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  loadTokens(tokens: Token[]) {
    this._tokens = tokens;
    this._tokenPos = 0;
  }

  // parses the top level chip definition
  parseChip(): parseNode {
    let ret: parseNode = {
      type: 'chip',
      children: [],
      token: null
    };

    ret.children.push(this.parseKeyword('CHIP'));
    ret.children.push(this.parseWord());
    ret.children.push(this.parseSymbol('{'));
    ret.children.push(this.parseInputs());
    ret.children.push(this.parseOutputs());

    if (this.checkToken('PARTS:')) {
      ret.children.push(this.parseParts());
    } else if (this.checkToken('BUILTIN')) {
      ret.children.push(this.parseBuiltin());
    }

    ret.children.push(this.parseSymbol('}'));

    return ret;
  }

  // parses the output list of pin defintions
  parseInputs(): parseNode {
    let ret: parseNode = {
      type: 'inputs',
      children: [],
      token: null
    };

    ret.children.push(this.parseKeyword('IN'));
    ret.children.push(this.parseIODefs());
    ret.children.push(this.parseSymbol(';'));

    return ret;
  }

  // parses the output list of pin defintions
  parseOutputs(): parseNode {
    let ret: parseNode = {
      type: 'outputs',
      children: [],
      token: null
    };

    ret.children.push(this.parseKeyword('OUT'));
    ret.children.push(this.parseIODefs());
    ret.children.push(this.parseSymbol(';'));

    return ret;
  }

  // parses the in and out list of pin defintions
  parseIODefs(): parseNode {
    let ret: parseNode = {
      type: 'iodefs',
      children: [],
      token: null
    };

    do {
      ret.children.push(this.parsePinDef());
    } while (this.checkToken(',') && ret.children.push(this.parseSymbol(',')));

    return ret;
  }

  // parses a builtin parts definition  like  BUILTIN: And;
  parseBuiltin(): parseNode {
    let ret: parseNode = {
      type: 'builtin',
      children: [],
      token: null
    };

    ret.children.push(this.parseKeyword('BUILTIN'));
    ret.children.push(this.parseWord());
    ret.children.push(this.parseSymbol(';'));

    return ret;
  }


  // parses a parts definition  like  PARTS: And(a=a, b=b, out=out);
  parseParts(): parseNode {
    let ret: parseNode = {
      type: 'parts',
      children: [],
      token: null
    };

    ret.children.push(this.parseKeyword('PARTS:'));

    do {
      ret.children.push(this.parseWord());
      ret.children.push(this.parseSymbol('('));
      ret.children.push(this.parseImpDef());
      ret.children.push(this.parseSymbol(')'));
      ret.children.push(this.parseSymbol(';'));
    } while (!this.checkToken('}'));

    return ret;
  }

  // parses an implementation definition  like  a=d   or   c[3]=b[3]
  parseImpDef(): parseNode {
    let ret: parseNode = {
      type: 'impdef',
      children: [],
      token: null
    };

    do {
      ret.children.push(this.parsePinDef());
      ret.children.push(this.parseSymbol('='));
      ret.children.push(this.parsePinDef());
      // if the next token is a , repeat.  also eat that token
    } while (this.checkToken(',') && ret.children.push(this.parseSymbol(',')));

    return ret;
  }

  // parses a pin definition  like  a   or    b[3]
  parsePinDef(): parseNode {
    let ret: parseNode = {
      type: 'pindef',
      children: [],
      token: null
    };

    ret.children.push(this.parseWord());
    if (this.checkToken('[')) {
      ret.children.push(this.parsePins());
    }

    return ret;
  }

  // parses a pin setup   [8]  or [1..10]
  parsePins(): parseNode {
    let ret: parseNode = {
      type: 'pins',
      children: [],
      token: null
    };

    ret.children.push(this.parseSymbol('['));
    ret.children.push(this.parsePin());

    if (this.checkToken('..')) {
      ret.children.push(this.parseSymbol('..'));
      ret.children.push(this.parsePin());
    }

    ret.children.push(this.parseSymbol(']'));

    return ret;
  }

  /// parses for a specific symbol and returns the parseNode
  parseSymbol(symbol: string): parseNode {
    let ret: parseNode = {
      type: null,
      children: [],
      token: null
    };

    let token = this.currentToken();
    if (token.type === 'symbol' && token.token === symbol) {
      ret.type = 'symbol';
      ret.token = token;
    } else {
      throw new SyntaxError(`SyntaxError: Expected a ${symbol} at position ${this._tokenPos}`);
    }

    this.advance();

    return ret;
  }

  /// parses for a specific symbol and returns the parseNode
  parseKeyword(keyword: string): parseNode {
    let ret: parseNode = {
      type: null,
      children: [],
      token: null
    };

    let token = this.currentToken();
    if (token.type === 'keyword' && token.token === keyword) {
      ret.type = 'keyword';
      ret.token = token;
    } else {
      throw new SyntaxError(`SyntaxError: Expected keyword ${keyword} at position ${this._tokenPos}`);
    }

    this.advance();

    return ret;
  }

  /// parses for a pin (number) and returns a parseNode
  parsePin(): parseNode {
    let ret: parseNode = {
      type: null,
      children: [],
      token: null
    };

    let token = this.currentToken();
    if (token.type === 'pin') {
      ret.type = 'pin';
      ret.token = token;
    } else {
      throw new SyntaxError(`SyntaxError: Expected a pin number at position ${this._tokenPos}`);
    }

    this.advance();

    return ret;
  }

  /// parses for a word and returns a parseNode
  parseWord(): parseNode {
    let ret: parseNode = {
      type: null,
      children: [],
      token: null
    };

    let token = this.currentToken();
    if (token.type === 'word') {
      ret.type = 'word';
      ret.token = token;
    } else {
      throw new SyntaxError(`SyntaxError: Expected an identifier at position ${this._tokenPos}`);
    }

    this.advance();
    return ret;
  }


  testSetup(tokenPos: number, tokens: Token[]) {
    this._tokenPos = tokenPos;
    this._tokens = tokens;
  }

  testPos(): number {
    return this._tokenPos;
  }
}
