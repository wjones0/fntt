import { TestBed, inject } from '@angular/core/testing';

import { TokenizerGenericService } from './tokenizer-generic.service';

describe('TokenizerGenericService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenizerGenericService]
    });
  });

  it('should be created', inject([TokenizerGenericService], (service: TokenizerGenericService) => {
    expect(service).toBeTruthy();
  }));

  it('should remove comments', inject([TokenizerGenericService], (service: TokenizerGenericService) => {
    let hdl = "// This file is part of www.nand2tetris.org\n// and the book \"The Elements of Computing Systems\"\n// by Nisan and Schocken, MIT Press.\n// File name: projects/01/Not.hdl\n\n/**\n * Not gate:\n * out = not in\n */\n\nCHIP Not {\n    IN in;\n    OUT out;\n\n    PARTS:\n    // Put your code here:\n}";

    expect(service.removeComments(hdl)).toBe("\n\n\n\n\n\n\nCHIP Not {\n    IN in;\n    OUT out;\n\n    PARTS:\n    \n}");
  }));

  it('should remove new lines', inject([TokenizerGenericService], (service: TokenizerGenericService) => {
    let hdl = "\n\n\n\n\n\n\nCHIP Not {\n    IN in;\n    OUT out;\n\n    PARTS:\n    \n}";

    expect(service.removeNewLines(hdl)).toBe("CHIP Not {    IN in;    OUT out;    PARTS:    }");
  }));


});
