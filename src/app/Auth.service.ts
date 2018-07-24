import { Usuario } from './shared/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Auth {

    constructor(private router: Router){}

    public tokenID:string

    public cadastrarUsuario(usuario: Usuario): Promise<any>{

        console.log(usuario)

       return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)

            .then((Response:any) =>{
                console.log(Response)

                delete usuario.senha

                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)

                .set(usuario)
            })

            .catch((error:Error)=>{
                console.log(error)
            })
    }

    public Autenticar(email:string , senha:string):Promise<any>{
        
       return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((Response:any)=>{
                firebase.auth().currentUser.getIdToken()

                    .then((idToken:string)=>{
                        this.tokenID = idToken
                        localStorage.setItem('idToken', idToken)
                        this.router.navigate(['/home'])
                    })
            })
    }

    public Autenticado():boolean{

        if( this.tokenID ==  undefined && localStorage.getItem('idToken') ){
            this.tokenID = localStorage.getItem('idToken')
        }
        if( this.tokenID == undefined){
            this.router.navigate(['/'])
        }
        return this.tokenID !== undefined
    }

    public logout():void{
        firebase.auth().signOut()
        localStorage.removeItem('idToken')
        this.tokenID = undefined
        this.router.navigate(['/'])
    }
}