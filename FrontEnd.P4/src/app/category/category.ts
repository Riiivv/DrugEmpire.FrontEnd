import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  categories = [
    {
      name: 'Weed',
      slug: 'weed',
      description: 'Cannabis products for display only.'
    },
    {
      name: 'Shrooms',
      slug: 'shrooms',
      description: 'Mushroom category for display only.'
    },
    {
      name: 'Pills',
      slug: 'pills',
      description: 'Pill products for display only.'
    },
    {
      name: 'LSD',
      slug: 'lsd',
      description: 'Psychedelic products for display only.'
    }
  ];
}