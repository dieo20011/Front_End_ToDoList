import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-more',
  imports: [CommonModule],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.scss'
})
export class ReadMoreComponent {
  isCollapsed = true;

  @Input() value = '';
  @Input() length = 75;

  public shortContent = '';
  public showReadMore = false;

  ngOnInit(): void {
    this.showReadMore = this.value && this.value.length > this.length ? true : false;
    if (this.showReadMore) {
      this.shortContent = this.value.slice(0, this.length) + '...';
    } else {
      this.shortContent = this.value;
    }
  }
}
