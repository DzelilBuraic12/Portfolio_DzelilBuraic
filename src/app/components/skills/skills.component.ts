import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [],
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, OnDestroy {
  private animatedElements: Array<{
    element: HTMLElement,
    globalIndex: number,
    isTitle: boolean,
    sectionIndex: number
  }> = [];
  private ticking = false;
  private totalSections = 0;

  private readonly CONFIG = {
    titleTriggerPosition: 0,
    iconsStartOffset: 50,
    offsetPerIcon: 45,
    sectionGap: 400,
    triggerOffset: 150,
    animationRange: 200,
    maxTranslateY: 70,
    titleAnimationRange: 150
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setupScrollAnimations(), 100);
    }
  }

  setupScrollAnimations() {
    let sectionIndex = 0;
    let iconIndexInSection = 0;
    const skillGrids = document.querySelectorAll('.skills-grid');

    this.totalSections = skillGrids.length;

    skillGrids.forEach((grid) => {
      const titleBefore = grid.previousElementSibling;
      if (titleBefore && titleBefore.classList.contains('fade-up')) {
        this.animatedElements.push({
          element: titleBefore as HTMLElement,
          globalIndex: -1,
          isTitle: true,
          sectionIndex: sectionIndex
        });
      }

      const icons = grid.querySelectorAll('.skill-icon');
      iconIndexInSection = 0;

      icons.forEach((icon) => {
        this.animatedElements.push({
          element: icon as HTMLElement,
          globalIndex: iconIndexInSection,
          isTitle: false,
          sectionIndex: sectionIndex
        });
        iconIndexInSection++;
      });

      sectionIndex++;
    });

    this.updateElements();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateElements();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateElements() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const firstGrid = document.querySelector('.skills-grid');
    const baseTop = firstGrid
      ? firstGrid.getBoundingClientRect().top + scrollY
      : 1000;

    this.animatedElements.forEach(({ element, globalIndex, isTitle, sectionIndex }) => {
      let virtualTop;

      const progress = sectionIndex / this.totalSections;
      const reduction = progress * 0.35;
      const adjustedGap = this.CONFIG.sectionGap * (1 - reduction);

      if (isTitle) {
        virtualTop = baseTop + this.CONFIG.titleTriggerPosition + (sectionIndex * adjustedGap);
      } else {
        virtualTop = baseTop
          + this.CONFIG.iconsStartOffset
          + (sectionIndex * adjustedGap)
          + (globalIndex * this.CONFIG.offsetPerIcon);
      }

      const triggerPoint = scrollY + windowHeight - this.CONFIG.triggerOffset;

      if (triggerPoint > virtualTop) {
        const range = isTitle
          ? this.CONFIG.titleAnimationRange
          : this.CONFIG.animationRange;

        const rawProgress = (triggerPoint - virtualTop) / range;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        const easedProgress = 1 - Math.pow(1 - clampedProgress, 3);

        const translateY = (1 - easedProgress) * this.CONFIG.maxTranslateY;
        const opacity = easedProgress;

        // ← JEDINA IZMJENA: dodaj will-change i ukloni transition:none
        element.style.willChange = 'transform, opacity';
        element.style.opacity = opacity.toString();
        element.style.transform = `translateY(${translateY}px) translateZ(0)`;
        element.style.transition = 'none'; // ostaje none jer je scroll-driven
      } else {
        element.style.opacity = '0';
        element.style.transform = `translateY(${this.CONFIG.maxTranslateY}px) translateZ(0)`;
      }
    });
  }

  ngOnDestroy() {
    this.animatedElements = [];
  }
}