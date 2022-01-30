import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Food } from 'src/app/shared/models/food';
import { FoodService } from 'src/app/services/food/food.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  id:number;
  header: string;
  food:Food = {
    id:0,
    name:'',
    price:0,
    tags:[],
    stars:0,
    imageUrl:'',
    origins:[],
    cookTime:''
  };
  registerForm: FormGroup;
  submitted = false;

  constructor(private router:Router,
              private formbuilder:FormBuilder,
              private foodService: FoodService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      id :['',Validators.required],
      name : ['',Validators.required],
      price : ['',Validators.required],
      tags : ['',Validators.required],
      stars :['',Validators.required],
      imageUrl : ['',Validators.required],
      origins : ['',Validators.required],
      cookTime : ['',Validators.required]
    })

    // id:=this.id;
    
    // if(this.id !=0){
      // this.food = this.foodService.onGetFood(0);
    // }
    
    this.id= this.route.snapshot.params['id'];
    console.log(this.id);
    this.header = this.id==0 ?'Add Food Item':'Edit & Update';

    if(this.id!=0){
      this.food = this.foodService.onGetFood(this.id);
    }
    // this.foodService.find(this.id).subscribe((data: Food)=>{
    //   this.food = data;
    // });
    
  }
  get h(){
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    } 
    let food:Food={
      id: this.registerForm.value.id,
      name: this.registerForm.value.name,
      price: this.registerForm.value.price,
      tags: this.registerForm.value.tags,
      stars: this.registerForm.value.stars,
      imageUrl: this.registerForm.value.imageUrl,
      origins: this.registerForm.value.origins,
      cookTime: this.registerForm.value.cookTime,
    }   
    if(this.id==0){
      this.foodService.onAdd(food);
    }
    else{
      this.foodService.onUpdate(food);
    }
    this.router.navigateByUrl('/dashboard')
  }

  

  
}
