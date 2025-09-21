import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from "../shared/global-sniper/global-sniper.component";
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private readonly _swUpdate: SwUpdate) { }
  ngOnInit() {
    this._swUpdate.versionUpdates.pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')).subscribe(evt => {
      if (confirm(`New version detected! Please reload to update.`)) {
        // Reload the page to update to the latest version.
        document.location.reload();
      }
    });
  }
}
