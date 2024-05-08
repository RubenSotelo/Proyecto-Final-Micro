import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  constructor(private servicio: UserService, private router: Router){}
  
  private readonly form = inject(FormBuilder);
  mensaje =""
  user: User = {
    nombre: '',
    usuario: '',
    clave: '',
  } 

  registro = this.form.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]*')]],
    usuario: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z][a-zA-Z0-9]*')]],
    clave: ['', [Validators.required, Validators.minLength(7)]]
  })
  
  login = this.form.nonNullable.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  })

  ngOnInit(): void {
    this.script();
  }

  crearRegistro1() : void{
    console.log(this.registro.get('nombre')?.errors);
    console.log(this.registro.get('usuario')?.errors);
    console.log(this.registro.get('clave')?.errors);
  }

  crearRegistro() : void{  
    this.user.nombre = String(this.registro.get('nombre')?.value);
    this.user.usuario = String(this.registro.get('usuario')?.value);
    this.user.clave = String(this.registro.get('clave')?.value);
    this.servicio.registro(this.user).subscribe({
      next: (res) => {
        if(!res.hasOwnProperty('Error')){
          this.router.navigate(['']); 
        }else{
          this.mensaje = res.Error
        }    
      },
      error: (e) => {
        this.mensaje = 'Error al Conectar con el servidor';
        console.error(e);
      }
    });
  }

  crearLogin():void{
    var signInButton = document.getElementById('signIn');
    var container = document.getElementById('container');
    this.servicio.login(this.login.get('usuario')?.value,this.login.get('clave')?.value).subscribe(res => {
      if(res.hasOwnProperty('Token')){
        localStorage.setItem("tokenUser","res")
        this.router.navigate(['pv/transaccion']); 
        signInButton?.addEventListener('click', () => {
        container?.classList.remove("right-panel-active");
      });
      }else{
        this.mensaje = res.Error
      }
    });
 
  }

  script(){
    var signUpButton = document.getElementById('signUp');
    var signInButton = document.getElementById('signIn');
    var container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
      });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });
  }
}
