// Angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
// App components
import { PropertyContainerComponent } from '../components/property-container/property-container.component'
import { NewPropertyContainerComponent } from '../components/new-property-container/new-property-container.component'
export const objectId = 'objectId'
import { DetailsPropertyContainerComponent } from "../components/details-property-container/details-property-container.component"

const routes: Routes = [
  { path: '', component: PropertyContainerComponent },
  { path: 'new', component: NewPropertyContainerComponent },
  { path: 'edit/:id', component: NewPropertyContainerComponent },
  { path: 'new', component: NewPropertyContainerComponent },
  { path: ':id', component: DetailsPropertyContainerComponent }
]
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule { }
