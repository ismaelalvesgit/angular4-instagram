import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable()
export class Db{

    constructor(
        private progresso:Progresso
    ){}

    public publicar( publicacao:any):void{
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo }) 
            .then((Response:any)=>{
            
            let nomeImg = Response.key

            firebase.storage().ref()
                .child(`imagem/${nomeImg}`)

                .put(publicacao.imagem)

                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot:any)=>{
                        this.progresso.status = 'andamento'
                        this.progresso.estado = snapshot
                    },
                    (error)=>{
                        this.progresso.status = 'erro'
                        this.progresso.estado = error
                    },
                    ()=>{
                        this.progresso.status = 'completo'
                    }
                    
                )
            })
    }

    public consultarPublicacoes(Email:string):Promise<any>{
    
        return new Promise((resolve, reject)=>{
            firebase.database().ref(`publicacoes/${btoa(Email)}`)
            
            .orderByKey()

            .once('value')

            .then((snapshot:any)=>{

            let publicacoes: any[] = []  

            snapshot.forEach((childSnapshot: any) => {
                
                let publicacao = childSnapshot.val()

                publicacao.key = childSnapshot.key

                publicacoes.push(publicacao)

            })
            return publicacoes.reverse()
            })
            .then((publicacoes)=>{
                publicacoes.forEach((publicacao)=>{
                    
                    firebase.storage().ref()
                    
                    .child(`imagem/${publicacao.key}`)

                    .getDownloadURL()

                    .then((url:string)=>{
                        publicacao.url_img = url

                        firebase.database().ref(`usuario_detalhe/${btoa(Email)}`)
                            .once('value')

                            .then((usuario:any)=>{

                                publicacao.Usuario = usuario.val().usuario

                            })
                    })
                })
                resolve(publicacoes)
            })       
        })
    }
}