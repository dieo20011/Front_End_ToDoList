import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CalendarViewComponent } from "../calendar-view/calendar-view.component";

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, CalendarViewComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
