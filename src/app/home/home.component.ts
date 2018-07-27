import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../Auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes:any

  constructor( 
    private auth:Auth
  ) { }

  ngOnInit() {
  }

  public atualizarTimeLine():void{
    this.publicacoes.atualizarPublicacoes()
   
  }

  public logout():void{
    this.auth.logout()
  }
}
