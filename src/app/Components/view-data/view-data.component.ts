import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmpServicesService } from 'src/app/Services/emp-services.service';
import { UpdateDataComponent } from '../update-data/update-data.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})


export class ViewDataComponent {


  constructor(private service:EmpServicesService,private dialog:MatDialog){}

  ngOnInit(){
      this.getData();
  }

  displayedColumns: string[] = ['Id', 'Name', 'Last Name', 'Email','Phone Number','City','Gender','DOB','Department','Salary','Skills','Actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getData(){
    this.service.getData().subscribe((res:any)=>{
      console.log(res);
       this.dataSource = new MatTableDataSource(res); 
       this.dataSource.sort=this.sort;
       this.dataSource.paginator=this.paginator;
    })
  }

 
EditData(id: any) {
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.height = '70vh'; 
  dialogConfig.width = '70vw';
  dialogConfig.data = id; // 
  
  const dialogRef = this.dialog.open(UpdateDataComponent, dialogConfig); 
}

  deleteData(id:any){
    this.service.deleteById(id).subscribe((res)=>{
      alert(`User with ${id} deleted succesfully`);
      this.getData();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
