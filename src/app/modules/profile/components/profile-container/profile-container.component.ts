import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'src/app/shared/auth/keycloak.service';
import { filterData } from 'src/app/shared/components/filter/filter.model';
import { IconPath } from 'src/app/shared/models/paths-to-resources';
import { UserParam } from 'src/app/shared/models/profile.model';
import { PropertyType } from 'src/app/shared/models/property.model';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent {
  readonly IconPath = IconPath
  userId: string = this.keycloakService.getUserId()
  pageIndex: number = 1
  pageSize: number = 10
  readonly route = inject(ActivatedRoute)
  readonly user_id = this.route.snapshot.params['id']
  userParam: UserParam[] = [{ key: 'userId',value: this.user_id ?? this.keycloakService.getUserId() }]
  properties$: Observable<PropertyType[]> = this.propertyService.getProperties(this.pageIndex, this.pageSize, this.userParam)
  paginationLength$: Observable<number> = this.paginationService.getPropertyLength(this.user_id ?? this.keycloakService.getUserId())
  constructor(
    private readonly propertyService: PropertyService,
    private readonly paginationService: PaginationService,
    private readonly keycloakService: KeycloakService
  ) { }

  handleFilterChanged(filterParams: filterData[]) {
    const filteredArray = filterParams?.filter(param => param.value).concat(this.userParam)
    this.properties$ = this.propertyService.getProperties(this.pageIndex, this.pageSize, filteredArray)
  }

  handlePaginationChange() {
    this.properties$ = this.propertyService.getProperties(this.pageIndex, this.pageSize, this.userParam)
  }

}
