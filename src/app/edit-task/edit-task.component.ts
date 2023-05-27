import { Component } from '@angular/core';
import { CreateTaskService } from '../services/create-task.service';
import { Router } from '@angular/router';
import { Taskmodel } from '../data-type';
import { Subject } from 'rxjs';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { EditTaskService } from '../services/edit-task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  taskdata: any;
  filteredData: Taskmodel[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  editTask!: FormGroup;
  editTaskobj: Taskmodel = new Taskmodel();
  updateTask!:FormGroup;
  minEndDate!: string;
  
  constructor( private api: CreateTaskService, private route: Router, private formBuilder:FormBuilder,private editApi:EditTaskService) { }

  ngOnInit():void{
    this.getTaskData();
    this.dtoptions = { pagingType: 'full_numbers' }
    this.editTask = this.formBuilder.group({
      task_status : [''],
      cmp_date:['']
    })

    /*--------------Update Form Initilize---------------------*/
    this.updateTask = this.formBuilder.group({
      task_name: ['', Validators.required],
      task_type: ['', Validators.required],
      company: ['', Validators.required],
      directorate: ['', Validators.required],
      s_date: new Date().toISOString().split('T')[0],
      e_date: ['', Validators.required],
      category: ['', Validators.required],
      ref: ['', Validators.required],
      
    });

  }
  getTaskData() {
    this.api.taskData().then((result) => {
      this.taskdata = result.data
      this.filteredData = this.taskdata.filter((item: { ongoing: string;delete :string }) => item.ongoing === 'yes' && item.delete==='')
      this.dtTrigger.next(null);
    })
  }

  edittaskRow(item:Taskmodel) {
    
    this.editTaskobj = { ...item };
   
    console.warn(this.editTaskobj.id)
  }

  updateCompletedTask()
  {
    this.editTaskobj.completed = this.editTask.value.task_status;
    this.editTaskobj.completed_date = this.editTask.value.cmp_date;
    this.editTaskobj.ongoing = 'completed'
    this.editApi.completedTask(this.editTaskobj.id,this.editTaskobj).then((result)=>{
      alert('Task Completed Successfully')
      console.warn(result);
      let cls = document.getElementById('cancel');
      cls?.click()
    })
    .catch(error => {
      console.error(error);
    });

    this.getTaskData();
  }

  /*--------------- Edit On Row-----------------------*/
  editRow(item: any) {
    
    this.editTaskobj.id = item.id;
    this.updateTask.controls['task_name'].setValue(item.task_name);
    this.updateTask.controls['task_type'].setValue(item.task_type);
    this.updateTask.controls['company'].setValue(item.company);
    this.updateTask.controls['directorate'].setValue(item.directorate);
    this.updateTask.controls['s_date'].setValue(item.s_date);
    this.updateTask.controls['e_date'].setValue(item.e_date);
    this.updateTask.controls['category'].setValue(item.category);
    this.updateTask.controls['ref'].setValue(item.ref);
    

  }

  /*------------------------------Update Task Data--------------------------*/
  updateEditTask() {

    this.editTaskobj.task_name = this.updateTask.value.task_name;
    this.editTaskobj.task_type = this.updateTask.value.task_type;
    this.editTaskobj.company = this.updateTask.value.company;
    this.editTaskobj.directorate = this.updateTask.value.directorate;
    this.editTaskobj.s_date = this.updateTask.value.s_date;
    this.editTaskobj.e_date = this.updateTask.value.e_date;
    this.editTaskobj.category = this.updateTask.value.category;
    this.editTaskobj.ref = this.updateTask.value.ref;
    this.editTaskobj.ongoing = 'yes';
    this.api.updatetaskData(this.editTaskobj, this.editTaskobj.id).then((result) => {
      alert('Data Updated Successfully');
      this.route.navigate(['/edit-task']);
      let refe = document.getElementById('taskCancel');
      refe?.click();
    })
    .catch(error => {
      console.error(error);
    });
    this.getTaskData();
  }

  /*------------------------Deleted Task (Status: Yes)----------------------*/
  /*----------------------Click on Save button of create task page Ongoing status change to YES--------------------------*/
  saveDelete(task: any): void {
    task.delete = "deleted";
    // Send HTTP request to update the JSON data on the server

    console.warn(task.id)

    let text = "Are you want to Delete this task?"
    if (confirm(text) == true) {
      this.editApi.deleteStatus(task, task.id, task.delete).then((result) => {
        alert("Task is Deleted Now")
      })
    }
    this.getTaskData();
  }

}
