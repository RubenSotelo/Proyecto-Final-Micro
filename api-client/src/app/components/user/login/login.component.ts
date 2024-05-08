import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  constructor(private servicio: UserService, private router: Router, private form: FormBuilder){}
  
  mensaje =""
  
  login = this.form.nonNullable.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  })

  ngOnInit(): void {
    //window.localStorage.removeItem("login");
    console.log(window.localStorage.getItem("login"));
    if(window.localStorage.getItem("login")!=null){
      this.router.navigate(['user/tabla']);
    }
  }

  crearLogin():void{
    this.servicio.login(this.login.get('usuario')?.value,this.login.get('clave')?.value).subscribe(res => {
      if(!res.hasOwnProperty('Error')){
        localStorage.setItem("login",res.Token)
        this.router.navigate(['user/tabla']); 
      }else{
        this.mensaje = res.Error
      }
    });
 
  }
}
