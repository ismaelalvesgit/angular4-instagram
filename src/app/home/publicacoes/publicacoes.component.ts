import { Component, OnInit } from '@angular/core';
import { Db } from '../../controldados.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email:string

  public publicacoes:any

  constructor(
    private db:Db
  ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user)=>{

      this.email = user.email

      this.atualizarPublicacoes()
    })
  }

  public atualizarPublicacoes():void{
    this.db.consultarPublicacoes(this.email)
    .then((Response:any)=>{
      this.publicacoes = Response
    })
  }

}
