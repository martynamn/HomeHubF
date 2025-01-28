import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AgentType } from 'src/app/shared/models/agent.model';
import { IconPath } from 'src/app/shared/models/paths-to-resources';
import { Base64ToFilePipe } from 'src/app/shared/pipes/object-base64-to-file.pipe';

@Component({
  standalone: true, 
  selector: 'app-agent-profile-card',
  templateUrl: './agent-profile-card.component.html',
  styleUrls: ['./agent-profile-card.component.scss'],
  imports: [CommonModule, TranslateModule, Base64ToFilePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentProfileCardComponent {
  readonly IconPath = IconPath
  @Input() agent!: AgentType


}
