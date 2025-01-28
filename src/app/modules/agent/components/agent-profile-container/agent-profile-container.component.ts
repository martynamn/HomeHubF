import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';
import { AgentType } from 'src/app/shared/models/agent.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AgentProfileCardComponent } from '../agent-profile-card/agent-profile-card.component';
import { AgentProfileDetailsCardComponent } from '../agent-profile-details-card/agent-profile-details-card.component';
import { LatestPropertiesComponent } from 'src/app/shared/components/latest-properties/latest-properties.component';
import { PropertyType } from 'src/app/shared/models/property.model';
import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  standalone: true, 
  selector: 'app-agent-profile-container',
  templateUrl: './agent-profile-container.component.html',
  styleUrls: ['./agent-profile-container.component.scss'],
  imports: [
    CommonModule, 
    TranslateModule, 
    AgentProfileCardComponent, 
    AgentProfileDetailsCardComponent,
    LatestPropertiesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentProfileContainerComponent {
  readonly route = inject(ActivatedRoute)
  readonly agentId = this.route.snapshot.params['id']
  private readonly agentService = inject(AgentService)
  private readonly propertyService = inject(PropertyService)
  private readonly cdr = inject(ChangeDetectorRef)
  agent$: Observable<AgentType> = this.agentService.getAgent(this.agentId)
  lastProperties$: Observable<PropertyType[]> = this.propertyService.getLastProperties({key :'userId', value: this.agentId}, 3)

  handleUpgradePremium(agent: AgentType) {
    this.agentService.setSubscription(this.agentId).pipe(
      switchMap(() => this.agent$ = this.agentService.getAgent(this.agentId))
    )
    .subscribe(() => this.cdr.detectChanges())
  }
}
