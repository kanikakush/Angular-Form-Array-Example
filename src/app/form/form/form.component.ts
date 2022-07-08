import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  name = 'Angular';
  count=2;
  addressForm: FormGroup;
  submission=false;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService
    ) {
    this.addressForm = this.fb.group({
      city: ['',Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
      pincode:['',Validators.required],
      address: this.fb.array([]) ,
    });
  }
    ngOnInit(){
    }
  address() : FormArray {

    return this.addressForm.get("address") as FormArray
  }

  newAddress(): FormGroup {
    return this.fb.group({
      city1: ['',Validators.required],
      state1: ['',Validators.required],
      country1:['',Validators.required],
      pincode1: ['',Validators.required],
    })
  }

  addAddress() {
    this.address().push(this.newAddress());
    this.count=0
    console.log(this.count)
  }

  removeAddress(i:number) {
    this.address().removeAt(i);
  }
  get f() { return this.addressForm.controls; }
  onSubmit() {
    this.submission=true;
    if(this.addressForm.invalid)
    {
        //alert("invalid form")
      return;}
    else{
      console.log(this.addressForm.value);
      const myJSON = JSON.stringify(this.addressForm.value);
      localStorage.setItem('addressData',myJSON);
      this.auth.postAddress(this.addressForm.value).subscribe((res:any)=>{
        console.log(this.addressForm.value)
        console.log('added');
      })
    }

  }
}
