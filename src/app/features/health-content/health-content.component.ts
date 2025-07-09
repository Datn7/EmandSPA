import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-health-content',
  imports: [CommonModule, RouterModule],
  templateUrl: './health-content.component.html',
  styleUrl: './health-content.component.scss',
})
export class HealthContentComponent {
  articles = [
    {
      id: 1,
      title: '5 Tips for Better Heart Health',
      description:
        'Practical steps to maintain a healthy heart in your daily life.',
    },
    {
      id: 2,
      title: 'Eating Well on a Budget',
      description:
        'Learn how to eat healthy while keeping your grocery bills low.',
    },
    {
      id: 3,
      title: 'Managing Stress Effectively',
      description:
        'Explore practical methods to handle stress and improve mental well-being.',
    },
    // Add more articles as needed
  ];
}
