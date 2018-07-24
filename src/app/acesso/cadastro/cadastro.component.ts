import { Component, OnInit, EventEmitter, Output, TRANSLATIONS_FORMAT } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../shared/usuario.model';
import { Auth } from '../../Auth.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public error:string

  @Output() public troca:EventEmitter <string> = new EventEmitter()

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'nomeCompleto': new FormControl(null, [Validators.required]),
    'usuario': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private auth:Auth
  ) { }

  ngOnInit() {
  }
  public trocaLogin():void{  
    this.troca.emit('login')
  }
  public cadastrar():void{
    let usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.usuario,
      this.formulario.value.senha
    )

    this.auth.cadastrarUsuario(usuario)

    .then(()=>{
      this.trocaLogin()
    })

    .catch((error:Error)=>{
      this.error = error.message.toString()
    })
  }
}
