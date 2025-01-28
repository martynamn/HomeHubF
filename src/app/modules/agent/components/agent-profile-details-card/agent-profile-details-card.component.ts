import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AgentType } from 'src/app/shared/models/agent.model';
import { IconPath } from 'src/app/shared/models/paths-to-resources';
import { NzModule } from 'src/app/shared/modules/nz.module';

@Component({
  standalone: true, 
  selector: 'app-agent-profile-details-card',
  templateUrl: './agent-profile-details-card.component.html',
  styleUrls: ['./agent-profile-details-card.component.scss'],
  imports: [CommonModule, TranslateModule, NzModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentProfileDetailsCardComponent {
  readonly IconPath = IconPath
  @Input() agent!: AgentType
  @Output() handleUpgradePremium = new EventEmitter<AgentType>()
}
