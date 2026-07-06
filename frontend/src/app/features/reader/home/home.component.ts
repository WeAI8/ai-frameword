import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovelService, Novel, Category, Tag } from '../../../core/services/novel.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private novelService = inject(NovelService);

  novels: Novel[] = [];
  categories: Category[] = [];
  tags: Tag[] = [];
  recentlyAddedChapters: any[] = [];

  searchText: string = '';
  selectedCategorySlug: string = '';
  selectedTagSlug: string = '';
  selectedSort: string = 'recent'; // recent, views, title
  activeTab: string = 'all'; // all, library

  libraryNovels: Novel[] = [];
  readingHistory: any[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.loadMetadata();
    this.loadNovels();
    this.loadRecentlyAddedChapters();
    this.loadReadingHistory();
  }

  loadRecentlyAddedChapters(): void {
    this.novelService.getRecentlyAddedChapters().subscribe({
      next: (data) => this.recentlyAddedChapters = data,
      error: (err) => console.error('Son eklenen bölümler yüklenemedi', err)
    });
  }

  loadMetadata(): void {
    this.novelService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Kategoriler yüklenemedi', err)
    });

    this.novelService.getTags().subscribe({
      next: (data) => this.tags = data,
      error: (err) => console.error('Etiketler yüklenemedi', err)
    });
  }

  loadReadingHistory(): void {
    const saved = localStorage.getItem('reading_history');
    if (saved) {
      try {
        this.readingHistory = JSON.parse(saved);
      } catch (e) {
        this.readingHistory = [];
      }
    }
  }

  loadNovels(): void {
    this.loading = true;
    this.novelService.getNovels(
      this.searchText,
      this.selectedCategorySlug,
      this.selectedTagSlug,
      this.selectedSort
    ).subscribe({
      next: (data) => {
        this.novels = data;
        this.updateLibraryNovels();
        this.loading = false;
      },
      error: (err) => {
        console.error('Romanlar yüklenemedi', err);
        this.loading = false;
      }
    });
  }

  updateLibraryNovels(): void {
    const saved = localStorage.getItem('bookmarks');
    let bookmarkedSlugs: string[] = [];
    if (saved) {
      try {
        bookmarkedSlugs = JSON.parse(saved);
      } catch (e) {
        bookmarkedSlugs = [];
      }
    }
    this.libraryNovels = this.novels.filter(n => n.slug && bookmarkedSlugs.includes(n.slug));
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    // Reload bookmarks in case they were updated in another tab/page
    if (tab === 'library') {
      this.updateLibraryNovels();
    }
  }

  changeSort(sort: string): void {
    this.selectedSort = sort;
    this.loadNovels();
  }

  search(): void {
    this.selectedCategorySlug = '';
    this.selectedTagSlug = '';
    this.loadNovels();
  }

  filterByCategory(slug: string): void {
    this.selectedTagSlug = '';
    this.searchText = '';
    this.selectedCategorySlug = this.selectedCategorySlug === slug ? '' : slug;
    this.loadNovels();
  }

  filterByTag(slug: string): void {
    this.selectedCategorySlug = '';
    this.searchText = '';
    this.selectedTagSlug = this.selectedTagSlug === slug ? '' : slug;
    this.loadNovels();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategorySlug = '';
    this.selectedTagSlug = '';
    this.loadNovels();
  }
}
