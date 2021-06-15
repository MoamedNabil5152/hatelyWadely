import { SouqService } from './../souq.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {
products : any
product : any

  constructor(private souqSer : SouqService ) {}

  ngOnInit(): void {
    this.souqSer.getKitchenData().subscribe(data=>{
      this.products = data
    })
}

}
