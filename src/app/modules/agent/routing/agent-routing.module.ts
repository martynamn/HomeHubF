// Angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { AgentContainerComponent } from '../components/profile-container/agent-container.component'
import { AgentProfileContainerComponent } from '../components/agent-profile-container/agent-profile-container.component'
// App components

const routes: Routes = [
  { path: '', component: AgentContainerComponent },
  { path: 'profile/:id', component: AgentProfileContainerComponent},
]
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule { }
