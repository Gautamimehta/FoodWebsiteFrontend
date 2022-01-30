import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/food';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit  {
  
  displayedColumns: string[] = ['id', 'name', 'price', 
  'cookTime','origin','Stars','Image-Url','Tags','edit','delete'];

  foods:Food[];
  dataSource = new MatTableDataSource<Food>(this.foodService.getAll());


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private foodService:FoodService,
              private _liveAnnouncer: LiveAnnouncer) { }
  
  

  ngOnInit(): void {
    this.foods=this.foodService.getAll()
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
  
  
  
  onDelete(id:number){
    this.foodService.onDelete(id);
  }

  applyFilter(event: Event) {
    let filterValue=(<HTMLInputElement>event.target).value; 
    filterValue = filterValue.trim().toLowerCase()
    this.dataSource.filter = filterValue;
  }
  

}
