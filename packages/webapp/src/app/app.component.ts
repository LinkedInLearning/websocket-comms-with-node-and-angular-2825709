import { Component, OnInit } from '@angular/core';
import { User, ServerChatMessage } from '@websocket/types';

@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webapp';
  user: User;
  messages: ServerChatMessage[] = [];

  ngOnInit(): void {
    this.user = { name: 'John', id: 1}
    this.messages = [
      {
        event: 'chat',
        payload: {
          author: {
            name: 'Jane',
            id: 2
          },
          contents: 'Hi I am Jane'
        }
      },
      {
        event: 'chat',
        payload: {
          author: {
            name: 'Jane',
            id: 2
          },
          contents: 'Anybody here?'
        }
      },
      {
        event: 'chat',
        payload: {
          author: {...this.user},
          contents: 'Yes I am here!'
        }
      },
    ]
  }
}
