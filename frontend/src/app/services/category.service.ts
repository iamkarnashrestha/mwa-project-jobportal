import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}
  getCategories(){
    return this.http.get<{success:boolean,results:any}>(environment.SERVER+'/api/category');
  }
getCataegoryById(id:string){
return this.http.get<{success:boolean,results:any}>(environment.SERVER+'/api/category/'+id)
}

  addCategory(catergory: {title:string, description:string}) {
    return this.http.post<{success:boolean,results:any}>(environment.SERVER+'/api/category', catergory);
  }
 removeCategory(id: string) {

    return this.http.delete<{success:boolean,results:any}>(environment.SERVER+'/api/category/'+id);
  }

  updateCategory(category: {title:string,description:string },id: string) {
    return this.http.put<{success:boolean,results:any}>(environment.SERVER+'/api/category/'+id,category);
  }
}
