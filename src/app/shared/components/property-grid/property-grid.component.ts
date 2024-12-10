import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { PropertyType } from "../../models/property.model"
import { CommonModule } from "@angular/common"
import { TranslateModule } from "@ngx-translate/core"
import { NzModule } from "../../modules/nz.module"
import { NzMessageService } from "ng-zorro-antd/message"
import { DomSanitizer, SafeUrl } from "@angular/platform-browser"
import { NzCarouselModule } from "ng-zorro-antd/carousel"
import { ImagesGalleryComponent } from "../images-gallery/images-gallery.component"

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, NzModule, NzCarouselModule, ImagesGalleryComponent],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PropertyGridComponent {

  @Input() property!: PropertyType
  sanitizedImageData: SafeUrl[] = []
  isGalleryOpen: boolean = false


  constructor(private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.property.images.forEach(image => this.sanitizedImageData.push(this.sanitizer.bypassSecurityTrustUrl(image.imageData.replace(/,\\n$/, ''))))
  }
}
