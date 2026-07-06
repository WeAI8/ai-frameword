import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface ChapterSummary {
  id: number;
  title: string;
  chapterNumber: number;
  createdAt: string;
}

export interface Novel {
  id?: number;
  title: string;
  slug?: string;
  summary: string;
  coverImageUrl: string;
  createdAt?: string;
  viewCount?: number;
  categories: Category[];
  tags: Tag[];
  chapters?: ChapterSummary[];
}

export interface Chapter {
  id?: number;
  title: string;
  chapterNumber: number;
  content: string;
  createdAt?: string;
  novelId?: number;
  novelTitle?: string;
  novelSlug?: string;
}

export interface WishlistRequest {
  id?: number;
  novelTitle: string;
  status?: string;
  logMessage?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NovelService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  // Novels
  getNovels(search?: string, category?: string, tag?: string, sortBy?: string): Observable<Novel[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);
    if (tag) params = params.set('tag', tag);
    if (sortBy) params = params.set('sortBy', sortBy);
    
    return this.http.get<Novel[]>(`${this.baseUrl}/novels`, { params });
  }

  getNovelBySlug(slug: string): Observable<Novel> {
    return this.http.get<Novel>(`${this.baseUrl}/novels/${slug}`);
  }

  incrementViewCount(slug: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/novels/${slug}/view`, {});
  }

  createNovel(novelPayload: { title: string; summary: string; coverImageUrl: string; categoryIds: number[]; tags: string[] }): Observable<Novel> {
    return this.http.post<Novel>(`${this.baseUrl}/novels`, novelPayload);
  }

  deleteNovel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/novels/${id}`);
  }

  // Categories & Tags
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/novels/categories`);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/novels/tags`);
  }

  // Chapters
  getChapter(novelSlug: string, chapterNumber: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.baseUrl}/api/chapters/${novelSlug}/${chapterNumber}`);
  }

  // Fix endpoint syntax matching backend path exactly
  getChapterDetails(novelSlug: string, chapterNumber: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.baseUrl}/chapters/${novelSlug}/${chapterNumber}`);
  }

  createChapter(novelSlug: string, chapterPayload: { title: string; chapterNumber: number; content: string }): Observable<Chapter> {
    return this.http.post<Chapter>(`${this.baseUrl}/chapters/${novelSlug}`, chapterPayload);
  }

  deleteChapter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/chapters/${id}`);
  }

  getRecentlyAddedChapters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chapters/recently-added`);
  }

  // Wishlist
  getWishlist(): Observable<WishlistRequest[]> {
    return this.http.get<WishlistRequest[]>(`${this.baseUrl}/novels/wishlist`);
  }

  createWishlistRequest(novelTitle: string): Observable<WishlistRequest> {
    return this.http.post<WishlistRequest>(`${this.baseUrl}/novels/wishlist`, { novelTitle });
  }
}
