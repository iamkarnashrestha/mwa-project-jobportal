import { Injectable } from '@angular/core';
import IUserState from '../IUserState.interface';
import {BehaviorSubject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _userState:BehaviorSubject<IUserState>=new BehaviorSubject({
    jwt:'',
    _id:'',
    email:'',
    fullname: '',
    role:''
  })

  getUserState$= this._userState.asObservable();
  setUserState(newState:IUserState){
    this._userState.next(newState)
  }
  constructor(private http:HttpClient) {}
  login(user:{email:String, password:String}){
    return this.http.post<{success:boolean,results:string}>(environment.SERVER+'/api/users/login',user)

  }

  getUserById(user_id:string)
  {
    return this.http.get<{success:boolean,results:any}>(environment.SERVER+'/api/users/'+user_id)
  }
  
  signup(user:{fullname:String,email:String, password:String,role:String}){
    return this.http.post<{success:boolean,results:string}>(environment.SERVER+'/api/users/signup',user)

  }

  updateProfileByID(id: string,user: { fullname:string,email:string,role:string },){
    return this.http.put<{success:boolean,results:string}>(environment.SERVER+'/api/users/update/'+id,user)
  }
}
