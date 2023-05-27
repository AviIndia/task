import { Component } from '@angular/core';
import axios from 'axios';
import { Taskmodel } from '../data-type';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent {
  private apiUrl = 'http://localhost:3000/task';
  completedTaskdata: any;
  filteredData: Taskmodel[] = [];
  taskdata: any;
  dtTrigger: Subject<any> = new Subject<any>();
  dtoptions: DataTables.Settings = {};
ngOnInit():void
{
  this.getTaskData();
  this.dtoptions = { pagingType: 'full_numbers' }
}


  getTaskData() {
    axios.get(this.apiUrl).then((result) => {
      this.completedTaskdata = result.data;
      console.warn(this.completedTaskdata)
      this.filteredData = this.completedTaskdata.filter((item: { completed: string }) => item.completed === 'Yes')
      this.dtTrigger.next(null);
      console.warn(this.filteredData)
    })
    .catch(error => {
      console.error(error);
    });
  }
}
  
