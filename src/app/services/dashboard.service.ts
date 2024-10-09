import { computed, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { SubscribersComponent } from '../pages/dashboard/widgets/subscribers/subscribers.component';
import { ViewsComponent } from '../pages/dashboard/widgets/views/views.component';

@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
    },
  ]);

  addedWidgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: SubscribersComponent,
      rows: 1,
      cols: 2,
    },
    {
      id: 2,
      label: 'Views',
      content: ViewsComponent,
      rows: 2,
      cols: 1,
    },
  ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  constructor() {}

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
  }
}
