import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  usuarios(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users/all');
  }

  login(usuario: any,clave: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/user/login/${usuario}/${clave}`);
  }

  registro(user:User): Observable<any>{
    return this.http.post('http://localhost:3000/user/registro',user);    
  }

  eliminar(id:any): Observable<void>{
    return this.http.delete<void>(`http://localhost:3000/user/elim/${id}`).pipe();
  }

  actualizar(id:any, user:User): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/user/edit/${id}`,user);
  }
}
