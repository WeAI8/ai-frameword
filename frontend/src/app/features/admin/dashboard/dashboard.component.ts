import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovelService, Novel, Category, WishlistRequest } from '../../../core/services/novel.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private novelService = inject(NovelService);

  novels: Novel[] = [];
  categories: Category[] = [];
  wishlist: WishlistRequest[] = [];

  // Form Fields
  novelTitle = '';
  novelSummary = '';
  novelCoverUrl = '';
  selectedCategoryIds: number[] = [];
  tagsString = ''; // Comma-separated tags e.g. "Macera, Aksiyon, Büyü"

  // Wishlist Form Fields
  wishlistTitle = '';
  wishlistSubmitting = false;

  private wishlistInterval: any;

  // State
  loading = true;
  submitting = false;
  successMsg = '';
  errorMsg = '';

  ngOnInit(): void {
    this.loadData();
    this.loadWishlist();
    
    // Auto-refresh the wishlist status every 10 seconds to show scraper updates
    this.wishlistInterval = setInterval(() => {
      this.loadWishlist();
      // If any novel completed scraping, refresh the main novel list too
      this.novelService.getNovels().subscribe({
        next: (data) => this.novels = data
      });
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.wishlistInterval) {
      clearInterval(this.wishlistInterval);
    }
  }

  loadWishlist(): void {
    this.novelService.getWishlist().subscribe({
      next: (data) => this.wishlist = data,
      error: (err) => console.error('İstek listesi yüklenemedi', err)
    });
  }

  loadData(): void {
    this.loading = true;
    this.novelService.getNovels().subscribe({
      next: (data) => {
        this.novels = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Veriler yüklenemedi', err);
        this.errorMsg = 'Kitap listesi yüklenemedi.';
        this.loading = false;
      }
    });

    this.novelService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Kategoriler yüklenemedi', err)
    });
  }

  toggleCategory(catId: number): void {
    const index = this.selectedCategoryIds.indexOf(catId);
    if (index > -1) {
      this.selectedCategoryIds.splice(index, 1);
    } else {
      this.selectedCategoryIds.push(catId);
    }
  }

  isCategorySelected(catId: number): boolean {
    return this.selectedCategoryIds.includes(catId);
  }

  onSubmit(): void {
    if (!this.novelTitle.trim()) {
      this.errorMsg = 'Lütfen kitap başlığını doldurun.';
      return;
    }

    this.submitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    // Split tags by comma and trim whitespace
    const tags = this.tagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      title: this.novelTitle.trim(),
      summary: this.novelSummary.trim(),
      coverImageUrl: this.novelCoverUrl.trim(),
      categoryIds: this.selectedCategoryIds,
      tags: tags
    };

    this.novelService.createNovel(payload).subscribe({
      next: (data) => {
        this.submitting = false;
        this.successMsg = `"${data.title}" başarıyla eklendi.`;
        this.resetForm();
        this.loadData();
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        this.errorMsg = 'Kitap eklenirken bir hata oluştu.';
      }
    });
  }

  deleteNovel(id: number, title: string): void {
    if (confirm(`"${title}" kitabını silmek istediğinize emin misiniz? Bu işlem kitaba ait tüm bölümleri de silecektir!`)) {
      this.novelService.deleteNovel(id).subscribe({
        next: () => {
          this.successMsg = 'Kitap başarıyla silindi.';
          this.loadData();
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Kitap silinirken hata oluştu.';
        }
      });
    }
  }

  resetForm(): void {
    this.novelTitle = '';
    this.novelSummary = '';
    this.novelCoverUrl = '';
    this.selectedCategoryIds = [];
    this.tagsString = '';
  }

  onSubmitWishlist(): void {
    if (!this.wishlistTitle.trim()) {
      this.errorMsg = 'Lütfen aranacak roman adını girin.';
      return;
    }

    this.wishlistSubmitting = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.novelService.createWishlistRequest(this.wishlistTitle.trim()).subscribe({
      next: (res) => {
        this.wishlistSubmitting = false;
        this.successMsg = `"${res.novelTitle}" otomatik tarama sırasına eklendi. Tarayıcı arka planda başlatılacaktır.`;
        this.wishlistTitle = '';
        this.loadWishlist();
      },
      error: (err) => {
        this.wishlistSubmitting = false;
        console.error(err);
        this.errorMsg = 'Tarama isteği oluşturulurken bir hata oluştu.';
      }
    });
  }
}
