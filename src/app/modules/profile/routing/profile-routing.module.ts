// Angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ProfileContainerComponent } from '../components/profile-container/profile-container.component'
// App components

const routes: Routes = [
  { path: '', component: ProfileContainerComponent }]
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
