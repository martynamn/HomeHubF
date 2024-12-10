import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FilterComponent } from 'src/app/shared/components/filter/filter.component'
import { NzModule } from 'src/app/shared/modules/nz.module'
import { ProfileRoutingModule } from './routing/profile-routing.module'
import { ProfileContainerComponent } from './components/profile-container/profile-container.component'
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component'
import {
  DetailsPropertyContainerComponent
} from "../property/components/details-property-container/details-property-container.component";

@NgModule({
  declarations: [ProfileContainerComponent],
  imports: [CommonModule, ProfileRoutingModule, TranslateModule, FilterComponent, PropertyCardComponent, DetailsPropertyContainerComponent, NzModule],
  exports: [ProfileContainerComponent],
  providers: [],
})
export class ProfileModule { }

