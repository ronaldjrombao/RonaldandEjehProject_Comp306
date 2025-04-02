import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { FooterComponent } from './component/footer/footer.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppHeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
