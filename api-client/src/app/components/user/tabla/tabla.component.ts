import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  constructor(private services: UserService, private router: Router){}

  usuarios:any[] = []
  login: any = ""
  ngOnInit(): void {
    
    if(window.localStorage.getItem("login")==null){
      this.router.navigate(['']);
    }else{
      this.login = window.localStorage.getItem("login")
      console.log(this.login);
      
      this.services.usuarios().subscribe((res) => {
        this.usuarios = res
      });
    }  
  }

  eliminar(id:any){
    this.services.eliminar(id).subscribe((res1)=>{
      this.usuarios = [];
      this.services.usuarios().subscribe((res2) => {
        this.usuarios = res2
      });
    })
  }

  actualizar(id:any){
    
  }
  registro(){
    this.router.navigate(['user/registro']);
  }

  sign_out(){
    window.localStorage.removeItem("login")
    this.router.navigate(['']);
  }
}
