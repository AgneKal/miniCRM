import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewCompanyComponent } from './components/company/new-company/new-company.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewCompanyComponent, NavigationComponent, NewContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'miniCRM';
}
