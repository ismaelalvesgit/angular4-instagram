import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auth } from '../../Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error:string = undefined

  @Output() public troca: EventEmitter<string> = new EventEmitter

  public formulario:FormGroup = new FormGroup({

    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private auth:Auth
  ) { }

  ngOnInit() {
  }

  public trocaCadastro():void{

    this.troca.emit('cadastro')
  }

  public autenticar():void{
    
    let email = this.formulario.value.email

    let senha = this.formulario.value.senha
     
    this.auth.Autenticar(email, senha)

    .catch((erro:Error)=>{
      console.log(erro)
      this.error = erro.message.toString()
      console.log(this.error)
    })

  }

}
