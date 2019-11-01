import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  template: `
    <div
      class= "all-msg__wrapper"
      *ngIf="messageService.messages.length"
    >
      <div class="msg-title__wrapper">
        <h2 class="msg__title">
          Messages
        </h2>
        <button
          class="btn clear"
          (click)="messageService.clear()"
        >
          Clear
        </button>
      </div>
      <div
        class="msg__wrapper"
        *ngFor='let message of messageService.messages'
      >
        <p class="msg__text">
          {{message}}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
