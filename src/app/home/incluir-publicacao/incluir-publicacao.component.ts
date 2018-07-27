import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Db } from '../../controldados.service';
import { Progresso } from '../../progresso.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


import 'rxjs/Rx'
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter()

  public email:string

  private imagem:any

  public estadoProgresso:string = 'normal'

  public estadoUpload:number = 0

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required]),
    'imagem': new FormControl(null, [Validators.required])
  })

  constructor(
    private db:Db,
    private progresso:Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email
    })
  }

  public publicar():void{
    this.db.publicar({
      email:this.email,
      titulo:this.formulario.value.titulo,
      imagem:this.imagem[0]
    })
    
    let acompahamentoUpload = Observable.interval(1000)

    let continuar = new Subject()

    continuar.next(true)

    acompahamentoUpload
      .takeUntil(continuar)
      .subscribe(()=>{

        this.estadoProgresso = 'andamento'

       this.estadoUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100 )
        
        if(this.progresso.status == 'completo'){
          this.estadoProgresso = 'completo'
          continuar.next(false)
          this.atualizarTimeLine.emit()
        }
      })
  }

  public capturarImg( event: Event ):void{
      this.imagem = (<HTMLInputElement>event.target).files
  }

}
