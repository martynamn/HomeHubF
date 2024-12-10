import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { PropertyContainerComponent } from './components/property-container/property-container.component'
import { PropertyRoutingModule } from './routing/property-routing.module'
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component'
import { FilterComponent } from 'src/app/shared/components/filter/filter.component'
import { NzModule } from 'src/app/shared/modules/nz.module'
import {
  DetailsPropertyContainerComponent
} from "./components/details-property-container/details-property-container.component"

@NgModule({
  declarations: [PropertyContainerComponent],
  imports: [CommonModule, PropertyRoutingModule, TranslateModule, FilterComponent, PropertyCardComponent, NzModule, DetailsPropertyContainerComponent],
  exports: [PropertyContainerComponent],
  providers: [],
})
export class PropertyModule { }
