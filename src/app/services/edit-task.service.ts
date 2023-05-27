import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class EditTaskService {
  private apiUrl = 'http://localhost:3000/task';
  constructor(private http:HttpClient) { }
 
  completedTask(id:number,data:any)
  {
    return axios.put(`${this.apiUrl}/${id}`, data)
  }

  /*---------- Using Axios update Ongoing task --------------------*/
  deleteStatus(data:any,id:number,ongoing:any)
  {
    return axios.put(`${this.apiUrl}/${id}`,data,ongoing)
  }
}
