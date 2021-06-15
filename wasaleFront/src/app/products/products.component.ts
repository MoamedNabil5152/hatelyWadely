import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  videoURL : string = "https://www.youtube.com/embed/QYUqHLAN47o";
  safeURL
  displyDiv : boolean = false;
  displyKitchen : boolean = false;
  displyTv : boolean = false;

  constructor( private _sanitizer: DomSanitizer){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL)  }

  ngOnInit(): void {
  }

}

