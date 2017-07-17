import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialogRef } from '@angular/material';

import { ProjectTemplatesService } from '../../../data/project-templates/project-templates.service';

import { ProjectFiles } from '../../../data/models/project-files';

@Component({
  selector: 'fntt-modal-project-templates',
  templateUrl: './modal-project-templates.component.html',
  styleUrls: ['./modal-project-templates.component.css']
})
export class ModalProjectTemplatesComponent implements OnInit, OnDestroy {

  projects: ProjectFiles[];
  projectSub: Subscription;
  selectedTemplate: ProjectFiles;

  constructor(private _templateSvc: ProjectTemplatesService, private dialog: MdDialogRef<ModalProjectTemplatesComponent>) { }

  ngOnInit() {
    this.projectSub = this._templateSvc.getProjects().subscribe((value) => {
      this.projects = value;
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  close() {
    this.dialog.close();
  }

  copy() {
    this._templateSvc.copyTemplate(this.selectedTemplate);
    this.close();
  }

}
