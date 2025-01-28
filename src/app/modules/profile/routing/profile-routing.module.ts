// Angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ProfileContainerComponent } from '../components/profile-container/profile-container.component'
import { UserProfileContainerComponent } from '../components/user-profile/user-profile.component'
// App components

const routes: Routes = [
  { path: '', component: UserProfileContainerComponent },
  { path: ':id', component: ProfileContainerComponent},
  { path: 'user:id', component: UserProfileContainerComponent},
]
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
