import { Injectable } from "@angular/core";
import { Auth } from './Auth.service';
import { CanActivate } from '@angular/router'

@Injectable()

export class authGuard implements CanActivate{
    
    constructor( private auth:Auth ){}

    canActivate():boolean{
        return this.auth.Autenticado()
    }
}