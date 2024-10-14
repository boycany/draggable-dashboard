import { Component, ElementRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Views',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: 'start',
            borderColor: 'rgb(75, 192, 192)',
            // backgroundColor: 'rgb(255, 99, 132, 0.5)',
            tension: 0.1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  }
}
