

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private router : Router,
    private formbuilder:FormBuilder) { }

    ngOnInit(): void {
      this.loginForm = this.formbuilder.group({
        name : ['',[Validators.required]],
        msg :['',[Validators.required]]
      });
    }
    
    get h(){
      return this.loginForm.controls;}
    

    onSubmit(){
      this.submitted = true;
      if(this.loginForm.invalid){
        return;
      }
      console.table (this.loginForm.value);
      
      alert("Thankyou !!")
      this.loginForm.reset();
      this.router.navigate(['/home']);
    }
  
    // onClick(){
    //   alert("hello");
    //   console.log("hello");
    //   this.router.navigate(['/signup']);
    // }

}

