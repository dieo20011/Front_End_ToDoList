import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LoveTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-love-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './love-timeline.component.html',
  styleUrl: './love-timeline.component.scss'
})
export class LoveTimelineComponent implements OnInit, OnDestroy {
  private intervalId: number | null = null;
  public loveTime: LoveTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private readonly startDate: Date = new Date('2024-05-01T00:00:00');

  ngOnInit(): void {
    this.updateLoveTime();
    this.intervalId = window.setInterval(() => {
      this.updateLoveTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateLoveTime(): void {
    const now = new Date();
    const timeDifference = now.getTime() - this.startDate.getTime();

    if (timeDifference > 0) {
      this.loveTime = {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
      };
    }
  }
}
