import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NovelService, Chapter, Novel, ChapterSummary } from '../../../core/services/novel.service';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit, OnChanges {
  private novelService = inject(NovelService);
  private router = inject(Router);

  @Input() slug!: string;         // Bound to ':slug'
  @Input() chapterNumber!: string; // Bound to ':chapterNumber' (string from router)

  chapter?: Chapter;
  novel!: Novel;
  
  loading: boolean = true;
  errorMsg: string = '';
  
  prevChapterNum: number | null = null;
  nextChapterNum: number | null = null;

  // Reader Settings State
  fontSize: number = 18;
  fontFamily: string = 'sans-serif';
  theme: string = 'light';
  settingsOpen: boolean = false;

  ngOnInit(): void {
    this.loadSettings();
    this.loadChapterAndNovel();
  }

  loadSettings(): void {
    const savedSize = localStorage.getItem('reader_font_size');
    if (savedSize) this.fontSize = parseInt(savedSize, 10);

    const savedFamily = localStorage.getItem('reader_font_family');
    if (savedFamily) this.fontFamily = savedFamily;

    const savedTheme = localStorage.getItem('reader_theme');
    if (savedTheme) this.theme = savedTheme;
  }

  saveSettings(): void {
    localStorage.setItem('reader_font_size', this.fontSize.toString());
    localStorage.setItem('reader_font_family', this.fontFamily);
    localStorage.setItem('reader_theme', this.theme);
  }

  changeFontSize(delta: number): void {
    this.fontSize = Math.max(14, Math.min(26, this.fontSize + delta));
    this.saveSettings();
  }

  changeFontFamily(family: string): void {
    this.fontFamily = family;
    this.saveSettings();
  }

  changeTheme(theme: string): void {
    this.theme = theme;
    this.saveSettings();
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reload if slug or chapterNumber changes (navigation)
    if (changes['chapterNumber'] && !changes['chapterNumber'].firstChange) {
      this.loadChapterAndNovel();
    }
  }

  loadChapterAndNovel(): void {
    this.loading = true;
    this.errorMsg = '';
    const currentNum = parseInt(this.chapterNumber, 10);

    if (isNaN(currentNum)) {
      this.errorMsg = 'Geçersiz bölüm numarası.';
      this.loading = false;
      return;
    }

    // 1. Fetch chapter contents
    this.novelService.getChapterDetails(this.slug, currentNum).subscribe({
      next: (chapData) => {
        this.chapter = chapData;
        
        // 2. Fetch parent novel to get chapters list for next/prev calculations
        this.novelService.getNovelBySlug(this.slug).subscribe({
          next: (novelData) => {
            this.novel = novelData;
            this.calculateNavigation(novelData.chapters || [], currentNum);
            this.saveToReadingHistory(novelData.title, chapData.title);
            this.loading = false;
          },
          error: (err) => {
            console.error('Roman listesi yüklenemedi', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Bölüm yüklenemedi', err);
        this.errorMsg = 'Bölüm yüklenirken hata oluştu. Lütfen bu bölümün mevcut olduğundan emin olun.';
        this.loading = false;
      }
    });
  }

  saveToReadingHistory(novelTitle: string, chapterTitle: string): void {
    const historyItem = {
      novelSlug: this.slug,
      novelTitle: novelTitle,
      coverImageUrl: this.novel?.coverImageUrl || '',
      chapterNumber: parseInt(this.chapterNumber, 10),
      chapterTitle: chapterTitle,
      readAt: new Date().toISOString()
    };

    const savedHistoryStr = localStorage.getItem('reading_history');
    let historyList: any[] = [];
    if (savedHistoryStr) {
      try {
        historyList = JSON.parse(savedHistoryStr);
      } catch (e) {
        historyList = [];
      }
    }

    // Avoid duplicates for the same novel
    historyList = historyList.filter(item => item.novelSlug !== this.slug);
    historyList.unshift(historyItem);

    // Limit history count
    if (historyList.length > 20) {
      historyList = historyList.slice(0, 20);
    }

    localStorage.setItem('reading_history', JSON.stringify(historyList));
  }

  calculateNavigation(chapters: ChapterSummary[], currentNum: number): void {
    // Sort chapters by chapterNumber
    const sorted = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
    const currentIndex = sorted.findIndex(c => c.chapterNumber === currentNum);

    this.prevChapterNum = currentIndex > 0 ? sorted[currentIndex - 1].chapterNumber : null;
    this.nextChapterNum = currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1].chapterNumber : null;
  }

  navigateTo(chapNum: number): void {
    this.router.navigate(['/novel', this.slug, 'oku', chapNum]);
  }
}
