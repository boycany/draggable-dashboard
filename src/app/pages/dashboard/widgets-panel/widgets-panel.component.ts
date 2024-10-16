import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-widgets-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatIcon,
    CdkDrag,
    CdkDragPlaceholder,
    // CdkDropList,
  ],
  templateUrl: './widgets-panel.component.html',
  styleUrl: './widgets-panel.component.scss',
  host: {
    class: 'mat-elevation-z2',
  },
})
export class WidgetsPanelComponent {
  store = inject(DashboardService);
}
