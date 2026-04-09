import { Component, ViewEncapsulation } from '@angular/core';
import { HoverRowDirective } from "./home-directive";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HoverRowDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent {
  isHovered = false
}
