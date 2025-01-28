import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NzModule } from 'src/app/shared/modules/nz.module'
import { AgentContainerComponent } from './components/profile-container/agent-container.component'
import { AgentRoutingModule } from './routing/agent-routing.module'
import { AgentTileComponent } from './components/agent-tile/agent-tile.component'

@NgModule({
  declarations: [AgentContainerComponent],
  imports: [CommonModule, AgentRoutingModule, TranslateModule, NzModule, AgentTileComponent],
  exports: [AgentContainerComponent],
  providers: [],
})
export class AgentModule { }

