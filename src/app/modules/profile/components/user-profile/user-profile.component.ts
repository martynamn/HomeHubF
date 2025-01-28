import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, switchMap } from 'rxjs';
import { AgentProfileCardComponent } from 'src/app/modules/agent/components/agent-profile-card/agent-profile-card.component';
import { AgentProfileDetailsCardComponent } from 'src/app/modules/agent/components/agent-profile-details-card/agent-profile-details-card.component';
import { KeycloakService } from 'src/app/shared/auth/keycloak.service';
import { LatestPropertiesComponent } from 'src/app/shared/components/latest-properties/latest-properties.component';
import { AgentType } from 'src/app/shared/models/agent.model';
import { PropertyType } from 'src/app/shared/models/property.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [
    CommonModule, 
    TranslateModule, 
    AgentProfileCardComponent, 
    AgentProfileDetailsCardComponent,
    LatestPropertiesComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainerComponent {
  readonly route = inject(ActivatedRoute)
  readonly keycloakService = inject(KeycloakService)
  readonly agentId = this.route.snapshot.params['id'] ?? this.keycloakService.getUserId()
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
