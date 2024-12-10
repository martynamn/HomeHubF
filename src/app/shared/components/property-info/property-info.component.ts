import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from "@angular/common"
import { TranslateModule } from "@ngx-translate/core"
import { NzModule } from "../../modules/nz.module"
import { NzMessageService } from "ng-zorro-antd/message"
import { PropertyType } from "../../models/property.model"
import { IconPath } from "../../models/paths-to-resources"
import { PricePipe } from "../../pipes/price.pipe"
import { PhonePipe } from '../../pipes/phone.pipe'

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, NzModule, PricePipe, PhonePipe],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyInfoComponent {
  @Input() property!: PropertyType
  protected readonly IconPath = IconPath;
  isNumberVisible: boolean = false
}
