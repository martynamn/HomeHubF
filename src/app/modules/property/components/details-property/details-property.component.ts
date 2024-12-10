import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { KeycloakService } from "../../../../shared/auth/keycloak.service"
import { PropertyType } from "../../../../shared/models/property.model"
import { CommonModule } from "@angular/common"
import { NzModule } from "../../../../shared/modules/nz.module"
import { PropertyGridComponent } from "../../../../shared/components/property-grid/property-grid.component"
import { PropertyInfoComponent } from "../../../../shared/components/property-info/property-info.component"
import { NzMessageService } from "ng-zorro-antd/message"

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styleUrls: ['./details-property.component.scss'],
  standalone: true,
  imports: [CommonModule, PropertyGridComponent, PropertyInfoComponent, NzModule],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPropertyComponent {

  @Input() property!: PropertyType

}
