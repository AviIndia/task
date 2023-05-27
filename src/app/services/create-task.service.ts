import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Taskmodel } from '../data-type';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {
  private apiUrl = 'http://localhost:3000/task';
  constructor(private http:HttpClient) { }


  postCreateTask(data:any)
  {
    return axios.post<any>(this.apiUrl, data);
    console.warn(data)
  }
  taskData()
  {
    return axios.get(this.apiUrl);
  }
  
  
  /*---------- Using Axios update task --------------------*/
  updatetaskData(data:any,id:number)
  {
    return axios.put(`${this.apiUrl}/${id}`, data)
  }
  /*---------- Using Axios delete task --------------------*/
  deletetaskData(id:number)
  {
    return axios.delete(`${this.apiUrl}/${id}`)
    
    console.warn(id);
  }
  /*---------- Using Axios update Ongoing task --------------------*/
  updateOngoing(data:any,id:number,ongoing:any)
  {
    return axios.put(`http://localhost:3000/task/`+id,data,ongoing)
  }



}
