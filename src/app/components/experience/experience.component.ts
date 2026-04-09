import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  @ViewChild('stopHere', { static: true }) stopHere!: ElementRef<HTMLElement>;
}
