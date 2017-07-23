import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { File } from '../../../data/models/file';
import { parseNode } from '../../../compiler/models/parseNode';

import { FileAccessService } from '../../../data/file-access/file-access.service';
import { TokenizerHdlService } from '../../../compiler/tokenizer-hdl/tokenizer-hdl.service';
import { ParserHdlService } from '../../../compiler/parser-hdl/parser-hdl.service';

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

  errorText: string;

  constructor(public fileSvc: FileAccessService, private _tokenizer: TokenizerHdlService, private _parser: ParserHdlService, public dialog: MdDialog, public afAuth: AngularFireAuth) {
    this.userSub = afAuth.authState.subscribe((value) => {
      this.fileSvc.setApp('hdwe');
    });

    this.fileSub = fileSvc.selectedFile.subscribe((value) => this.selectedFile = value);
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
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
    } catch (error) {
      this.errorText = error.message;
    }
  }

}
