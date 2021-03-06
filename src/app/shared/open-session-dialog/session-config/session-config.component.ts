import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SessionConfig, SessionMode } from '../../things-session.service';

@Component({
  selector: 'memore-session-config',
  templateUrl: './session-config.component.html',
  styleUrls: ['./session-config.component.scss']
})
export class SessionConfigComponent implements OnInit {
  allTags = [];
  data;
  config: SessionConfig = {
  	sessionTime : 10,
    isSessionMode: SessionMode.TAGS,
    input: '',
    tags: []
  };
  constructor(public dialogRef: MdDialogRef<SessionConfigComponent>) { }

  ngOnInit() {
    this.data = this.dialogRef.componentInstance.data;
    this.allTags = this.data.tags;
  }

  setSessionMode(value) {
    this.config.isSessionMode = SessionMode[SessionMode[value]];
  }

  onTagAdded(aTag) {
      this.config.tags = this.config.tags.concat([aTag]);
  }

  onTagRemoved(aTag) {
     this.config.tags = this.config.tags.filter((tag) => tag.id !== aTag.id);
  }

  close() {
    this.dialogRef.close(this.config); 
  }

  cancel() {
   this.dialogRef.close(); 
  }

  canSubmit() {
    if (this.config.isSessionMode === SessionMode.TAGS) {
      return this.config.sessionTime && this.config.sessionTime > 0;
    }
    return this.config.input && this.config.input !== '';
  }

}
