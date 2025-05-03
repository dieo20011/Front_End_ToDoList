import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NewsService } from './news.service';
import { Article, NewsApiResponse, queryList } from './new.interface';

@Component({
  selector: 'app-news',
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  queryList = queryList;
  selectedQuery = signal('');
  newLists: Article[] = [];
  constructor(private readonly newsService: NewsService) {}
 
  ngOnInit(): void {
    this.onChangeQuery();
  }

  public onChangeQuery() {
    this.newsService.getNews(this.selectedQuery()).subscribe((res) => {
      this.newLists = res.articles;
      console.log(this.newLists);
    });
  }
}
