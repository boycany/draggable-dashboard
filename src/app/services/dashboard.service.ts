import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views/views.component';
import { WatchTimeComponent } from '../pages/dashboard/widgets/watch-time/watch-time.component';
import { RevenueComponent } from '../pages/dashboard/widgets/revenue/revenue.component';
import { AnalyticsComponent } from '../pages/dashboard/widgets/analytics/analytics.component';

@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 2,
      cols: 1,
      backgroundColor: 'whitesmoke',
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 2,
      cols: 1,
      backgroundColor: 'green',
      color: 'whitesmoke',
    },
    {
      id: 3,
      label: 'Watch Time',
      content: WatchTimeComponent,
      rows: 1,
      cols: 1,
      backgroundColor: 'whitesmoke',
    },
    {
      id: 4,
      label: 'Revenue',
      content: RevenueComponent,
      rows: 1,
      cols: 1,
      backgroundColor: 'whitesmoke',
    },
    {
      id: 5,
      label: 'Channel Analytics',
      content: AnalyticsComponent,
      rows: 2,
      cols: 2,
    },
  ]);

  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  addWidget(w: Widget) {
    this.addedWidgets.update((widgets) => [...widgets, w]);
  }

  updateWidget(id: number, w: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      // const newWidget = [...this.addedWidgets()];
      // newWidget[index] = { ...newWidget[index], ...w };
      // this.addedWidgets.set(newWidget);
      this.addedWidgets.update((widgets) => {
        widgets[index] = { ...widgets[index], ...w };
        return widgets;
      });
    }
    this.saveChanges();
  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);

    /** If the widget is not at the end, move it to the right */
    if (index !== this.addedWidgets().length - 1) {
      console.log('move right index :>> ', index);
      this.addedWidgets.update((widgets) => {
        const target = widgets.splice(index, 1);
        widgets.splice(index + 1, 0, ...target);

        /** Another way to Swap the widgets */
        // [widgets[index], widgets[index + 1]] = [
        //   { ...widgets[index + 1] },
        //   { ...widgets[index] },
        // ];

        return widgets;
      });
    }
    this.saveChanges();
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== 0) {
      console.log('move left index :>> ', index);
      this.addedWidgets.update((widgets) => {
        const target = widgets.splice(index, 1);
        widgets.splice(index - 1, 0, ...target);
        return widgets;
      });
    }
    this.saveChanges();
  }

  removeWidget(id: number) {
    return this.addedWidgets.update((widgets) =>
      widgets.filter((w) => w.id !== id),
    );
  }

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    console.log('this.addedWidgets() :>> ', this.addedWidgets());
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(
      (w) => ({ ...w }),
    );
    widgetsWithoutContent.forEach((w) => delete w.content);
    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent),
    );
  });

  /** Save the changes to local storage, because effect function didn't work if the array length was not changed */
  saveChanges() {
    this.addedWidgets.set([...this.addedWidgets()]);
  }
}
