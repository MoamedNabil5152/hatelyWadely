import { ToastrService } from 'ngx-toastr';
import { SouqService } from './../souq.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss']
})
export class TvDetailsComponent implements OnInit {
  product : any
showForm = false


  constructor(private souqSer : SouqService , private route : ActivatedRoute , private fb : FormBuilder , private toastr : ToastrService) { }
  loginForm : FormGroup
  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.souqSer.getdataId(id).subscribe(data=>{
      this.product = data
    })
    this.loginForm = this.fb.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      phone :  ['',Validators.required]
    })
  }

  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
}

saveForm() {
  console.log(this.loginForm.value)
}
showMyForm() {
this.showForm = true
}

hideForm() {
  this.toastr.success('your request has approved' + ` ${this.loginForm.controls.name.value}` )
  this.showForm = false
}

}
