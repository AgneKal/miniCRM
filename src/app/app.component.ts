import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewCompanyComponent } from './components/new-company/new-company.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewCompanyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'miniCRM';
}
