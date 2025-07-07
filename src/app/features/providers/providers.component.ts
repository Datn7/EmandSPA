import { Component } from '@angular/core';
import {
  Provider,
  ProvidersService,
} from '../../core/services/providers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-providers',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss',
})
export class ProvidersComponent {
  providers: Provider[] = [];

  constructor(private providersService: ProvidersService) {}

  ngOnInit(): void {
    this.providersService.getProviders().subscribe((data) => {
      this.providers = data;
    });
  }
}
