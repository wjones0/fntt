import { Injectable } from '@angular/core';

import { TokenizerGenericService } from '../tokenizer-generic/tokenizer-generic.service';

import { Token } from '../models/token';

@Injectable()
export class TokenizerHdlService {

  constructor(private _tokenSvc: TokenizerGenericService) { }

  tokenize_noComments(text: string): Token[] {
    let tokenRules = {
      keyword: /BUILTIN|CHIP|IN|OUT|PARTS:|CLOCKED/,
      symbol: /{|}|\(|\)|;|,/,
      whitespace: /\s+/,
      word: /[\w:\[\]\.]+/
    };

    return this._tokenSvc.tokenize(text, tokenRules, 'unknown');
  }

  tokenize(text: string): Token[] {
    return this._tokenSvc.removeWhiteSpaceTokens(this.tokenize_noComments(this._tokenSvc.removeNewLines(this._tokenSvc.removeComments(text))));
  }

}
