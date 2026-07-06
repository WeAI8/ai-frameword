import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovelService, Novel, ChapterSummary } from '../../../core/services/novel.service';

@Component({
  selector: 'app-chapter-manage',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './chapter-manage.component.html',
  styleUrls: ['./chapter-manage.component.css']
})
export class ChapterManageComponent implements OnInit {
  private novelService = inject(NovelService);

  @Input() slug!: string; // Automatically bound from route parameter ':slug'

  novel!: Novel;
  chapters: ChapterSummary[] = [];

  // Form Fields
  chapterTitle = '';
  chapterNumberInput?: number;
  chapterContent = '';

  // State
  loading = true;
  submitting = false;
  successMsg = '';
  errorMsg = '';

  ngOnInit(): void {
    this.loadNovelDetails();
  }

  loadNovelDetails(): void {
    this.loading = true;
    this.novelService.getNovelBySlug(this.slug).subscribe({
      next: (data) => {
        this.novel = data;
        // Sort chapters numerically
        this.chapters = (data.chapters || []).sort((a, b) => a.chapterNumber - b.chapterNumber);
        
        // Auto-increment chapter number for next chapter
        this.chapterNumberInput = this.calculateNextChapterNumber(this.chapters);
        
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Kitap bilgileri yüklenemedi.';
        this.loading = false;
      }
    });
  }

  calculateNextChapterNumber(chaps: ChapterSummary[]): number {
    if (chaps.length === 0) return 1;
    const maxNumber = Math.max(...chaps.map(c => c.chapterNumber));
    return maxNumber + 1;
  }

  onSubmit(): void {
    if (!this.chapterTitle.trim() || this.chapterNumberInput === undefined || !this.chapterContent.trim()) {
      this.errorMsg = 'Lütfen tüm alanları doldurun.';
      return;
    }

    this.submitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    const payload = {
      title: this.chapterTitle.trim(),
      chapterNumber: this.chapterNumberInput,
      content: this.chapterContent
    };

    this.novelService.createChapter(this.slug, payload).subscribe({
      next: (data) => {
        this.submitting = false;
        this.successMsg = `Bölüm ${data.chapterNumber} ("${data.title}") başarıyla eklendi.`;
        this.resetForm();
        this.loadNovelDetails();
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        if (err.error && err.error.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Bölüm eklenirken bir hata oluştu.';
        }
      }
    });
  }

  deleteChapter(id: number, chapNum: number, title: string): void {
    if (confirm(`Bölüm ${chapNum} ("${title}") silinecektir. Emin misiniz?`)) {
      this.novelService.deleteChapter(id).subscribe({
        next: () => {
          this.successMsg = 'Bölüm başarıyla silindi.';
          this.loadNovelDetails();
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Bölüm silinirken hata oluştu.';
        }
      });
    }
  }

  resetForm(): void {
    this.chapterTitle = '';
    this.chapterContent = '';
  }
}
