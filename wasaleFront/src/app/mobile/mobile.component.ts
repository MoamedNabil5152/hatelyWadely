import { SouqService } from './../souq.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  products : any
  product : any
  filteredProducts : any = []
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.FilterMethod(this.listFilter) : this.products;
  }
  constructor(private souqSer : SouqService , private route : ActivatedRoute  ) { }
  FilterMethod(listFilter) {
    listFilter = listFilter.toLocaleLowerCase();
    return this.products.filter((product: any) =>
      product.title.toLocaleLowerCase().indexOf(listFilter) !== -1);
  }

  ngOnInit(): void {
  this.route.data.subscribe(data=>{
    this.products = data['mobileData']
    this.filteredProducts = this.products;
  })

}

}
