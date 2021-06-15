import { SouqService } from './../souq.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
product : any
  constructor(private souqSer : SouqService , private route : ActivatedRoute) { }

  ngOnInit(): void {
   let id =  this.route.snapshot.params['id']
   this.souqSer.getdataId(id).subscribe(data=>{
     console.log(data)
   })
  }



}
