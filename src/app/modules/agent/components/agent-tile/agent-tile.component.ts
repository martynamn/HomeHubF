import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgentType } from 'src/app/shared/models/agent.model';
import { IconPath } from 'src/app/shared/models/paths-to-resources';
import { Base64ToFilePipe } from 'src/app/shared/pipes/object-base64-to-file.pipe';

@Component({
  standalone: true, 
  selector: 'app-agent-tile',
  templateUrl: './agent-tile.component.html',
  styleUrls: ['./agent-tile.component.scss'],
  imports: [CommonModule, TranslateModule, Base64ToFilePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentTileComponent {
  readonly IconPath = IconPath
  private readonly router = inject(Router)
  @Input() agents: AgentType[] = []

  navigateToAgentProfile(agent: AgentType){
    this.router.navigate(['/agent/profile',  agent._id])
  }
}
