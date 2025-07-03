import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ads-section',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ads-section.component.html',
  styleUrl: './ads-section.component.scss',
})
export class AdsSectionComponent {
  ads = [
    {
      company: 'Wellness Gym',
      deal: 'Get 20% off your annual membership with Emand Insurance.',
      image: 'https://localhost:7174/ad-images/gym.jpg',
    },
    {
      company: 'Healthy Bites',
      deal: 'Free nutrition consultation for Emand members.',
      image: 'https://localhost:7174/ad-images/health.jpg',
    },
    {
      company: 'OptiVision',
      deal: '50% off your first eye exam with OptiVision.',
      image: 'https://localhost:7174/ad-images/vision.jpg',
    },
  ];
}
