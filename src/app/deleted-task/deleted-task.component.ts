import { Component } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { Taskmodel } from '../data-type';

@Component({
  selector: 'app-deleted-task',
  templateUrl: './deleted-task.component.html',
  styleUrls: ['./deleted-task.component.css']
})
export class DeletedTaskComponent {
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
      this.filteredData = this.completedTaskdata.filter((item: { delete: string }) => item.delete === 'deleted')
      this.dtTrigger.next(null);
      console.warn(this.filteredData)
    })
    .catch(error => {
      console.error(error);
    });
  }
}
