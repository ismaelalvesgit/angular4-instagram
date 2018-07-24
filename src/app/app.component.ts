import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  ngOnInit(){

    var config = {
      apiKey: "AIzaSyBOMdGUpwuYOzQGAs9L6rmpaRzm6UZLRXY",
      authDomain: "jta-instagram-94a1e.firebaseapp.com",
      databaseURL: "https://jta-instagram-94a1e.firebaseio.com",
      projectId: "jta-instagram-94a1e",
      storageBucket: "jta-instagram-94a1e.appspot.com",
      messagingSenderId: "76883845774"
    };
    firebase.initializeApp(config);
  }
}
