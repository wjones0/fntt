import { Injectable } from '@angular/core';

import { Token } from '../models/token';

@Injectable()
export class TokenizerGenericService {

  constructor() { }


  ////  https://gist.github.com/borgar/451393#file-tiny-javascript-tokenizer-js
  /*
 * Tiny tokenizer
 *
 * - Accepts a subject string and an object of regular expressions for parsing
 * - Returns an array of token objects
 *
 * tokenize('this is text.', { word:/\w+/, whitespace:/\s+/, punctuation:/[^\w\s]/ }, 'invalid');
 * result => [{ token="this", type="word" },{ token=" ", type="whitespace" }, Object { token="is", type="word" }, ... ]
 *
 */
  public tokenize(s, parsers, deftok): Token[] {
    var m, r, l, t, tokens = [];
    while (s) {
      t = null;
      m = s.length;
      for (var key in parsers) {
        r = parsers[key].exec(s);
        // try to choose the best match if there are several
        // where "best" is the closest to the current starting point
        if (r && (r.index < m)) {
          t = {
            token: r[0],
            type: key,
            matches: r.slice(1)
          }
          m = r.index;
        }
      }
      if (m) {
        // there is text between last token and currently 
        // matched token - push that out as default or "unknown"
        tokens.push({
          token: s.substr(0, m),
          type: deftok || 'unknown'
        });
      }
      if (t) {
        // push current token onto sequence
        tokens.push(t);
      }
      s = s.substr(m + (t ? t.token.length : 0));
    }
    return tokens;
  }

  removeComments(text: string): string {
    return text.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
  }

  removeNewLines(text: string): string {
    return text.replace(/\n/g, '');
  }

  removeWhiteSpaceTokens(tokens: Token[]): Token[] {
    let ret = [];

    for (let t of tokens) {
      if (t.type != 'whitespace')
        ret.push(t);
    }

    return ret;
  }




}
