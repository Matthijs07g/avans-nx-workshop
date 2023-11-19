import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit{
  
  imagePath?: string;

  ngOnInit(): void {
      this.imagePath= '/assets/casus2.2-2023.png'
  }
}
