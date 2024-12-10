import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { SafeUrl } from "@angular/platform-browser"
import { CommonModule } from "@angular/common"
import { TranslateModule } from "@ngx-translate/core"
import { NzModule } from "../../modules/nz.module"
import { NzMessageService } from "ng-zorro-antd/message"
import { ThumbnailPlugin } from "./images-gallery.adapter"

@Component({
  selector: 'app-images-gallery',
  templateUrl: './images-gallery.component.html',
  styleUrls: ['./images-gallery.component.scss',
    '../../../../../node_modules/keen-slider/keen-slider.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, NzModule],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesGalleryComponent {

  @Input() images!: SafeUrl[]
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>()
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>
  @ViewChild("thumbnailRef") thumbnailRef!: ElementRef<HTMLElement>
  isVisible = true

  slider: KeenSliderInstance | null = null
  thumbnailSlider: KeenSliderInstance | null = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement)
    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
      [ThumbnailPlugin(this.slider)]
    )
  }
  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }
}

