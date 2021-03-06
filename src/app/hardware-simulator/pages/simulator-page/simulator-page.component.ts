import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { File } from '../../../data/models/file';
import { parseNode } from '../../../compiler/models/parseNode';
import { Chip } from '../../models/chip';

import { FileAccessService } from '../../../data/file-access/file-access.service';
import { TokenizerHdlService } from '../../../compiler/tokenizer-hdl/tokenizer-hdl.service';
import { ParserHdlService } from '../../../compiler/parser-hdl/parser-hdl.service';
import { ChipBuilderService } from '../../services/chip-builder/chip-builder.service';

import { ModalNewFileComponent } from '../../../file-mgmt/components/modal-new-file/modal-new-file.component';
import { ModalProjectTemplatesComponent } from '../../../file-mgmt/components/modal-project-templates/modal-project-templates.component';

@Component({
  selector: 'app-simulator-page',
  templateUrl: './simulator-page.component.html',
  styleUrls: ['./simulator-page.component.css']
})
export class SimulatorPageComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  fileSub: Subscription;

  selectedFile: File;
  parseTree: parseNode;
  currentChip: Chip;

  errorText: string;

  constructor(private _chipBuilder: ChipBuilderService, public fileSvc: FileAccessService, private _tokenizer: TokenizerHdlService, private _parser: ParserHdlService, public dialog: MdDialog, public afAuth: AngularFireAuth) {
    this.userSub = afAuth.authState.subscribe((value) => {
      this.fileSvc.setApp('hdwe');
    });

    this.fileSub = fileSvc.selectedFile.subscribe((value) => this.selectedFile = value);
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if (this.currentChip) {
      this.currentChip.disassemble();
    }

  }

  newFile() {
    let dialogRef = this.dialog.open(ModalNewFileComponent, {
      width: '75%',
      disableClose: false,
      data: null
    });
  }

  copyProjTemplate() {
    let dialogRef = this.dialog.open(ModalProjectTemplatesComponent, {
      width: '75%',
      disableClose: false,
      data: null
    });
  }

  loadChip() {
    this.errorText = '';
    this.parseTree = null;

    try {
      this._parser.loadTokens(this._tokenizer.tokenize(this.selectedFile.contents));
      this.parseTree = this._parser.parseChip();
      if (this.currentChip) {
        this.currentChip.disassemble();
      }
      this.currentChip = this._chipBuilder.buildChip(this.parseTree);
    } catch (error) {
      this.errorText = error.message;
    }
  }

  changeInput(name: string, val: string) {
    let newVal = [];

    for (let s of val) {
      newVal.push(+s);
    }

    this.currentChip.inputs[name].next(new Uint8Array(newVal));
  }

}
