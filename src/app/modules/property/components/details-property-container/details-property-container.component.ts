import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from "@angular/common"
import { TranslateModule, TranslateService } from "@ngx-translate/core"
import { NzModule } from "../../../../shared/modules/nz.module"
import { NzMessageService } from "ng-zorro-antd/message"
import { PropertyType } from "../../../../shared/models/property.model"
import { PropertyService } from "../../../../shared/services/property.service"
import { Observable, of, Subject, takeUntil } from "rxjs"
import { ActivatedRoute, Router, RouterLink } from "@angular/router"
import { KeycloakService } from "../../../../shared/auth/keycloak.service"
import { NzPopoverModule } from "ng-zorro-antd/popover"
import { DetailsPropertyComponent } from "../details-property/details-property.component"

@Component({
  selector: 'app-details-property-container',
  templateUrl: './details-property-container.component.html',
  styleUrls: ['./details-property-container.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, NzModule, RouterLink, NzPopoverModule, DetailsPropertyComponent],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPropertyContainerComponent implements OnDestroy {

  private propertyId: string | null | undefined = ""
  private readonly destroy$ = new Subject<void>()
  property$!: Observable<PropertyType>
  userId: string = this.keycloackService.getUserId()
  isAdmin: boolean = this.keycloackService.isAdmin()
  constructor(
    private readonly propertyService: PropertyService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly keycloackService: KeycloakService,
    private readonly messageService: NzMessageService,
    private readonly translate: TranslateService,
  )
  {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get("id")
      this.property$ = this.propertyId ? this.propertyService.getPropertyInfo(this.propertyId) : of()
    })
  }


  soldProperty(property: PropertyType) {
    this.propertyService.soldProperty(property).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.messageService.success(
          this.translate.instant('Successfully sold advertisement')
        )
        this.router.navigate([`/property`])
      },
      error: () => this.messageService.error(
        this.translate.instant('An error has occurred. Please try again'))
    })

  }

  deleteProperty(property: PropertyType) {
    this.propertyService.deleteProperty(property).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.messageService.success(
          this.translate.instant('Successfully delete advertisement')
        )
        this.router.navigate([`/property`])
      },
      error: () => this.messageService.error(
        this.translate.instant('An error has occurred. Please try again')
      )
    })
  }

  editProperty() {
    this.router.navigate([`/property/edit/${this.propertyId}`])
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
