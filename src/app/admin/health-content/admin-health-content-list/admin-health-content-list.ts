import { Component, OnInit } from '@angular/core';
import {
  HealthArticle,
  HealthArticleService,
} from '../../services/health-article.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-health-content-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin-health-content-list.html',
  styleUrl: './admin-health-content-list.scss',
})
export class AdminHealthContentList implements OnInit {
  articles: HealthArticle[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private healthArticleService: HealthArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.loading = true;
    this.healthArticleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  editArticle(id: number) {
    this.router.navigate(['/admin/health-content/edit', id]);
  }

  addArticle() {
    this.router.navigate(['/admin/health-content/new']);
  }

  deleteArticle(id: number) {
    if (confirm('Are you sure you want to delete this article?')) {
      this.healthArticleService.deleteArticle(id).subscribe({
        next: () => {
          this.articles = this.articles.filter((a) => a.id !== id);
        },
        error: (err) => {
          this.error = err.message;
        },
      });
    }
  }
}
