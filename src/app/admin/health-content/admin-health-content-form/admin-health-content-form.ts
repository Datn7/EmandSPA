import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateHealthArticle,
  HealthArticle,
  HealthArticleService,
} from '../../services/health-article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-health-content-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './admin-health-content-form.html',
  styleUrl: './admin-health-content-form.scss',
})
export class AdminHealthContentForm implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  articleId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private healthArticleService: HealthArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      imageUrl: [''],
      readTimeMinutes: [5, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.articleId) {
      this.isEditMode = true;
      this.loadArticle(this.articleId);
    }
  }

  loadArticle(id: number) {
    this.loading = true;
    this.healthArticleService.getArticle(id).subscribe({
      next: (article: HealthArticle) => {
        this.articleForm.patchValue({
          title: article.title,
          description: article.description,
          content: article.content,
          category: article.category,
          tags: article.tags.join(', '),
          imageUrl: article.imageUrl,
          readTimeMinutes: article.readTimeMinutes,
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.articleForm.invalid) return;
    const formValue = this.articleForm.value;
    const tagsArray = formValue.tags
      ? formValue.tags.split(',').map((tag: string) => tag.trim())
      : [];

    const articleData: CreateHealthArticle = {
      title: formValue.title,
      description: formValue.description,
      content: formValue.content,
      category: formValue.category,
      tags: tagsArray,
      imageUrl: formValue.imageUrl,
      readTimeMinutes: formValue.readTimeMinutes,
    };

    this.loading = true;
    if (this.isEditMode && this.articleId) {
      this.healthArticleService
        .updateArticle(this.articleId, articleData)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/admin/health-content']);
          },
          error: (err) => {
            this.error = err.message;
            this.loading = false;
          },
        });
    } else {
      this.healthArticleService.createArticle(articleData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/health-content']);
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/health-content']);
  }
}
