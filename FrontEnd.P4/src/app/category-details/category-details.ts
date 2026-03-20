import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-details.html',
  styleUrl: './category-details.css',
})
export class CategoryDetails {
    categoryName = '';

  products = [
    { name: 'OG Kush', category: 'weed', description: 'Fictional weed product.' },
    { name: 'Blue Dream', category: 'weed', description: 'Fictional weed product.' },
    { name: 'Golden Caps', category: 'shrooms', description: 'Fictional shroom product.' },
    { name: 'Microdose Pack', category: 'shrooms', description: 'Fictional shroom product.' },
    { name: 'Xan Pack', category: 'pills', description: 'Fictional pill product.' },
    { name: 'Night Tabs', category: 'pills', description: 'Fictional pill product.' },
    { name: 'Lucy Drop', category: 'lsd', description: 'Fictional LSD product.' },
    { name: 'Paper Sun', category: 'lsd', description: 'Fictional LSD product.' }
  ];

  constructor(private route: ActivatedRoute){
    this.categoryName = this.route.snapshot.paramMap.get('name') || '';
  }

  get filteredProducts(){
    return this.products.filter(product => product.category === this.categoryName);
  }
}
