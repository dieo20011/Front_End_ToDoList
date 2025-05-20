import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-read-more',
  imports: [CommonModule],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.scss'
})
export class ReadMoreComponent implements OnChanges {
  @Input() value: string = '';
  @Input() length: number = 100;

  shortContent: string = '';
  isCollapsed = true;
  showReadMore = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.shortContent = this.value?.slice(0, this.length) ?? '';
      this.showReadMore = (this.value?.length ?? 0) > this.length;
      this.isCollapsed = true;
    }
  }
}
