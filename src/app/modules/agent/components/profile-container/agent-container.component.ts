import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentType } from 'src/app/shared/models/agent.model';
import { AgentService } from 'src/app/shared/services/agent.service';

@Component({
  selector: 'app-agent-container',
  templateUrl: './agent-container.component.html',
  styleUrls: ['./agent-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentContainerComponent {
  private readonly agentService = inject(AgentService)
  agents$: Observable<AgentType[]> = this.agentService.getAgents()

}
