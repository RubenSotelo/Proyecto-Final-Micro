import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  constructor(private servicio: UserService, private router: Router, private form: FormBuilder){}

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

  ngOnInit(): void {
    if(window.localStorage.getItem("login")==null){
      this.router.navigate(['']);
    }
  }

  crearRegistro() : void{  
    this.user.nombre = String(this.registro.get('nombre')?.value);
    this.user.usuario = String(this.registro.get('usuario')?.value);
    this.user.clave = String(this.registro.get('clave')?.value);
    this.servicio.registro(this.user).subscribe({
      next: (res) => {
        if(!res.hasOwnProperty('Error')){
          this.router.navigate(['user/tabla']); 
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
}
