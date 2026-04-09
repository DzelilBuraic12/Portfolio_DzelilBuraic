import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  lang: 'en' | 'bs' = 'en';

  setLang(l: 'en' | 'bs') {
    this.lang = l;
    this.closeMenu();
    // kasnije: this.translate.use(l);
    // i localStorage.setItem('lang', l);
  }

}
