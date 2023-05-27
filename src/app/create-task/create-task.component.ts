import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateTaskService } from '../services/create-task.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Taskmodel } from '../data-type';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createTask!: FormGroup;
  taskdata: any;
  selectedFile!: File;
  modalOpen: boolean = false;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  popupVisible = false;
  selectedTaskData: any;
  showsave!: boolean;
  showupdate!: boolean;
  createTaskobj: Taskmodel = new Taskmodel();
  modalTitle: string = '';

  filteredData: Taskmodel[] = [];
  minEndDate!: string;
  constructor(private formBuilder: FormBuilder, private api: CreateTaskService, private route: Router) { }
  ngOnInit(): void {
    this.createTask = this.formBuilder.group({
      task_name: ['', Validators.required],
      task_type: ['', Validators.required],
      company: ['', Validators.required],
      directorate: ['', Validators.required],
      /* s_date: ['', Validators.required], */
      e_date: ['', Validators.required],
      category: ['', Validators.required],
      ref: ['', Validators.required],
      s_date: new Date().toISOString().split('T')[0],
    });


    /*------------Task Data Fetch from JSON----------------*/
    this.getTaskData();
    this.dtoptions = { pagingType: 'full_numbers' }

    this.createTask.get('s_date')?.valueChanges.subscribe((startDate) => {
      this.minEndDate = startDate
    });

  }

  /*------------------ One Form for Updte and Create using this button change ---------------------*/
  clickaddBtn(newTitle: string) {
    this.createTask.reset();
    this.showsave = true;
    this.showupdate = false;
    this.modalTitle = newTitle;
  }

  /*------------------------Create a new Task---------------------------*/
  postTask() {

    this.createTaskobj.task_name = this.createTask.value.task_name;
    this.createTaskobj.task_type = this.createTask.value.task_type;
    this.createTaskobj.company = this.createTask.value.company;
    this.createTaskobj.directorate = this.createTask.value.directorate;
    this.createTaskobj.s_date = this.createTask.value.s_date;
    this.createTaskobj.e_date = this.createTask.value.e_date;
    this.createTaskobj.category = this.createTask.value.category;
    this.createTaskobj.ref = this.createTask.value.ref;
    /* this.createTaskobj.ongoing = 'no' */

    this.api.postCreateTask(this.createTaskobj).then((result) => {
      console.warn(result);
      alert("Task Created Successfully");
      this.route.navigate(['/create-task']);
      let refe = document.getElementById('cancel');
      refe?.click();
      this.createTask.reset()

    })
    .catch(error => {
      console.error(error);
    });
    
    this.getTaskData();
  }

  /*----------------------Get data from JSON where Ongoing status  is No-----------------------*/
  /* getTaskData() {
    this.api.getAllTasks().then((result) => {
      this.taskdata = result
      this.filteredData = this.taskdata.filter((item: { ongoing: string; }) => item.ongoing === '')
      this.dtTrigger.next(null);
    })
  } */

  getTaskData() {
    this.api.taskData()
      .then(response => {
        console.warn(response);
        this.taskdata = response.data;
        this.filteredData = this.taskdata.filter((item: { ongoing: string; }) => item.ongoing === '')
        this.dtTrigger.next(null);
      })
      .catch(error => {
        console.error(error);
      });
  } 
  /* getTaskData() {
    axios.get('http://localhost:3000/task')
      .then(response => {
        this.taskdata = response.data;
        this.filteredData = this.taskdata.filter((item: { ongoing: string; }) => item.ongoing === '');
        this.dtTrigger.next(null);
      })
      .catch(error => {
        console.error(error);
      });
  } */
/*---------------------------Onclick edit button data load to form------------------------*/
  editRow(item: any) {
    this.clickaddBtn('Update Task Data');
    this.createTaskobj.id = item.id;
    this.createTask.controls['task_name'].setValue(item.task_name);
    this.createTask.controls['task_type'].setValue(item.task_type);
    this.createTask.controls['company'].setValue(item.company);
    this.createTask.controls['directorate'].setValue(item.directorate);
    this.createTask.controls['s_date'].setValue(item.s_date);
    this.createTask.controls['e_date'].setValue(item.e_date);
    this.createTask.controls['category'].setValue(item.category);
    this.createTask.controls['ref'].setValue(item.ref);
    // open the edit popup here
    this.showsave = false;
    this.showupdate = true;

  }

  /*------------------------------Update Task Data--------------------------*/
  updateTask() {

    this.createTaskobj.task_name = this.createTask.value.task_name;
    this.createTaskobj.task_type = this.createTask.value.task_type;
    this.createTaskobj.company = this.createTask.value.company;
    this.createTaskobj.directorate = this.createTask.value.directorate;
    this.createTaskobj.s_date = this.createTask.value.s_date;
    this.createTaskobj.e_date = this.createTask.value.e_date;
    this.createTaskobj.category = this.createTask.value.category;
    this.createTaskobj.ref = this.createTask.value.ref;
    this.api.updatetaskData(this.createTaskobj, this.createTaskobj.id).then((result) => {
      alert('Data Updated Successfully');
      this.route.navigate(['/create-task']);
      let refe = document.getElementById('cancel');
      refe?.click();
    })
    .catch(error => {
      console.error(error);
    });
    this.getTaskData();
  }


  /*-----------------------Delete Task Data------------------------*/
  delTask(id: number) {

    let text = "Are you want Permanently delete this Task Data"
    if (confirm(text) == true) {
      this.api.deletetaskData(id).then((result) => {
        console.warn(result)
      })

      alert("Task data Deleted Successfully")
      this.getTaskData();
    }
    else {
      this.getTaskData();
    }

    this.getTaskData();

  }
  /*----------------------Click on Save button of create task page Ongoing status change to YES--------------------------*/
  saveOngoing(task: any): void {
    task.ongoing = "yes";
    // Send HTTP request to update the JSON data on the server

    console.warn(task.id)

    let text = "Are you want to Ongoing this task?"
    if (confirm(text) == true) {
      this.api.updateOngoing(task, task.id, task.ongoing).then((result) => {
        alert("Task is on Ongoing Now")
      })
    }
    this.getTaskData();
  }

/*------------------start  Excel Report Generate ----------------------------*/
generateReport() {
 
  const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('d-table'));

  // Create a workbook and add the worksheet
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  // Convert the workbook to an Excel file
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the buffer
  const blob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

  // Generate the file name with the current date and time
  const fileName = `create_task_${this.getCurrentDateTime()}.xlsx`;

  // Save the file using FileSaver.js
  saveAs(blob, fileName);
}

// Get the current date and time formatted as "yyyy-mm-dd-hh-mm-ss"
 getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = this.padNumber(now.getMonth() + 1);
  const day = this.padNumber(now.getDate());
  const hours = this.padNumber(now.getHours());
  const minutes = this.padNumber(now.getMinutes());
  const seconds = this.padNumber(now.getSeconds());
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

// Pad single-digit numbers with leading zeros
padNumber(num: number) 
{
  return num.toString().padStart(2, '0');
}

/*----------------------- End Excel Generate Repport-----------------------*/
  


}

