import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NovelService, Novel } from '../../../core/services/novel.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private novelService = inject(NovelService);

  @Input() slug!: string; // Automatically bound from route parameter ':slug'

  novel!: Novel;
  loading: boolean = true;
  errorMsg: string = '';
  isBookmarked: boolean = false;
  lastReadChapter: number | null = null;
  lastReadChapterTitle: string = '';

  ngOnInit(): void {
    this.loadNovel();
  }

  loadNovel(): void {
    this.loading = true;
    this.novelService.getNovelBySlug(this.slug).subscribe({
      next: (data) => {
        this.novel = data;
        this.checkBookmarked();
        this.checkReadingHistory();
        this.novelService.incrementViewCount(this.slug).subscribe({
          next: () => {
            if (this.novel && this.novel.viewCount !== undefined) {
              this.novel.viewCount++;
            }
          }
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Roman yüklenemedi', err);
        this.errorMsg = 'Kitap bilgileri yüklenirken bir hata oluştu veya bu kitap mevcut değil.';
        this.loading = false;
      }
    });
  }

  checkBookmarked(): void {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      try {
        const list: string[] = JSON.parse(saved);
        this.isBookmarked = list.includes(this.slug);
      } catch (e) {
        this.isBookmarked = false;
      }
    }
  }

  toggleBookmark(): void {
    const saved = localStorage.getItem('bookmarks');
    let list: string[] = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {
        list = [];
      }
    }

    if (this.isBookmarked) {
      list = list.filter(slug => slug !== this.slug);
      this.isBookmarked = false;
    } else {
      list.push(this.slug);
      this.isBookmarked = true;
    }
    localStorage.setItem('bookmarks', JSON.stringify(list));
  }

  checkReadingHistory(): void {
    const saved = localStorage.getItem('reading_history');
    if (saved) {
      try {
        const list: any[] = JSON.parse(saved);
        const entry = list.find(item => item.novelSlug === this.slug);
        if (entry) {
          this.lastReadChapter = entry.chapterNumber;
          this.lastReadChapterTitle = entry.chapterTitle;
        }
      } catch (e) {
        this.lastReadChapter = null;
      }
    }
  }
}
