import { SouqService } from './../souq.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  products : any
  product : any
  constructor(private souqSer : SouqService , ) { }

  ngOnInit(): void {
    this.souqSer.getTvsData().subscribe(data=>{
      this.products = data
    })

  }

}
