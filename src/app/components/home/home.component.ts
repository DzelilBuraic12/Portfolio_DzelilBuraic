import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from "../projects/projects.component";
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-home',
  imports: [AboutComponent, SkillsComponent, ExperienceComponent, ProjectsComponent, ContactComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  scrollTo(section: string) {
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
}
}
