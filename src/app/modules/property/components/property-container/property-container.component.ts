import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filterData } from 'src/app/shared/components/filter/filter.model';
import { UserParam } from 'src/app/shared/models/profile.model';
import { PropertyType } from 'src/app/shared/models/property.model';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  selector: 'app-property-container',
  templateUrl: './property-container.component.html',
  styleUrls: ['./property-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyContainerComponent {
  pageIndex: number = 1
  pageSize: number = 10
  readonly route = inject(ActivatedRoute)
  readonly user_id = this.route.snapshot.queryParams['userId']
  properties$: Observable<PropertyType[]> = this.propertyService.getProperties(this.pageIndex, this.pageSize, undefined, this.user_id )
  paginationLength$: Observable<number> = this.paginationService.getPropertyLength(this.user_id)

  constructor(
    private readonly propertyService: PropertyService, 
    private readonly paginationService: PaginationService
  ) {
  }
  
  handleFilterChanged(filterParams: filterData[]) {
    const filteredArray = filterParams?.filter(param => param.value)
    this.properties$ = this.propertyService.getProperties(this.pageIndex, this.pageSize, filteredArray)
  }

  handlePaginationChange() {
    this.properties$ = this.propertyService.getProperties(this.pageIndex, this.pageSize)
  }

}
