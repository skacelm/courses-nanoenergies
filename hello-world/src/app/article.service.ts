import { Injectable } from '@angular/core';
import { Article } from './models/article';
import { ArticleFormData } from './article-form/article-form.component';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private changes$ = new ReplaySubject<Article[]>(1);
  private articlesArray: Article[] = [
    {
      id: 1,
      title: 'jedna',
      text: 'dva',
      timestamp: new Date(),
      author: {
        email: 'martin@nuc.cz',
        name: 'Martin'
      }
    },
    {
      id: 2,
      title: 'dalsi title',
      text: 'bla bla',
      timestamp: new Date(),
      author: {
        email: 'martin@nuc.cz',
        name: 'Martin'
      }
    },
  ];

  constructor() {
    this.notifySubscribers();
  }

  deleteArticle(articleToDelete: Article): void {
    this.articlesArray = this.articlesArray.filter(
      (article) => article !== articleToDelete
    );
    this.notifySubscribers();
  }

  createArticle(articleFormData: ArticleFormData): void {
    this.articlesArray.push({
      ...articleFormData,
      id: this.getUniqueId(),
      timestamp: new Date(),
    });
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    this.changes$.next(this.articlesArray);
  }

  get articles$(): Observable<Article[]> {
    return this.changes$.asObservable();
  }

  private getUniqueId(): number {
    if (!this.articlesArray.length) {
      return 1;
    }
    return this.articlesArray[this.articlesArray.length - 1].id + 1;
  }
}
