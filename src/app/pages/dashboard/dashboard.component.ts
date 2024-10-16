import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { Widget } from '../../models/dashboard';
import { SubscribersComponent } from './widgets/subscribers/subscribers.component';
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { wrapGrid } from 'animate-css-grid';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { WidgetsPanelComponent } from './widgets-panel/widgets-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WidgetComponent,
    WidgetsPanelComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CdkDropList,
    CdkDropListGroup,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
})
export class DashboardComponent {
  store = inject(DashboardService);
  // widgets = computed(() => this.store.widgets());

  dashboard = viewChild.required<ElementRef>('dashboard');
  darkMode = signal(false);

  widgetsPanelOpen = signal(false);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.darkMode());
    });
  }

  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
      easing: 'linear',
      // stagger: 100,
    });
  }

  drop(event: CdkDragDrop<number, any>) {
    // console.log('event :>> ', event);
    const {
      container,
      previousContainer,
      item: { data },
    } = event;

    if (data) {
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }

  widgetPutBack(event: CdkDragDrop<number, any>) {
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
  }
}
