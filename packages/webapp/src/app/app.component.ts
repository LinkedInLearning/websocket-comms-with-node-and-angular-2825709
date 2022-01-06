import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@websocket/types';

@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'I am Angular';

  messages: ChatRelayMessage[] = []
  currentUser: User

  ngOnInit() {
    this.messages = [
      { event: 'chatRelay', author: { name: 'Jane', id: 1 }, contents: 'Hi this is Jane' },
      { event: 'chatRelay', author: { name: 'Henry', id: 2 }, contents: 'Hello I am Henry' }
    ]

    // this.currentUser = { name: 'Xavier', id: 3 }
  }

  connect(userNameInput: HTMLInputElement) {
    console.log(`Connecting as ${userNameInput.value}`)
  }
}
