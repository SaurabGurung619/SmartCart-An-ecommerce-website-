import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  private searchTerm = new BehaviorSubject<string>('');
  currentSearchTerm$ = this.searchTerm.asObservable();

  constructor() {}

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
