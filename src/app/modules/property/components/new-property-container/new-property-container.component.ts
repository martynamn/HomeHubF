import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzModule } from 'src/app/shared/modules/nz.module';
import { NewPropertyComponent } from '../new-property/new-property.component';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { PropertyService } from 'src/app/shared/services/property.service';
import { KeycloakService } from 'src/app/shared/auth/keycloak.service';
import { NzMessageService } from 'ng-zorro-antd/message'
import { ActivatedRoute } from '@angular/router';
import { Subject, concatMap, of, takeUntil, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-new-property-container',
  templateUrl: './new-property-container.component.html',
  styleUrls: ['./new-property-container.component.scss'],
  imports: [CommonModule, TranslateModule, NzModule, FormsModule, ReactiveFormsModule, NewPropertyComponent],
  providers: [NzMessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPropertyContainerComponent implements OnDestroy {
  readonly title = new FormControl<string | null>(null, [Validators.required])
  readonly country = new FormControl<string | null>(null, Validators.required)
  readonly city = new FormControl<string | null>(null, [Validators.required])
  readonly postcode = new FormControl<string | null>(null, [Validators.required])
  readonly floor = new FormControl<number | null>(null, [Validators.required])
  readonly area = new FormControl<number | null>(null, [Validators.required])
  readonly rooms = new FormControl<number | null>(null, [Validators.required])
  readonly type = new FormControl<string | null>(null, [Validators.required])
  readonly adType = new FormControl<string | null>(null, [Validators.required])
  readonly price = new FormControl<number | null>(null, [Validators.required])
  readonly telephoneNumber = new FormControl<string | null>(null, [Validators.required])
  readonly description = new FormControl<string | null>(null, [Validators.required])
  propertyId?: string
  private readonly destroy$ = new Subject<void>()

  readonly propertyForm = this.fb.nonNullable.group({
    title: this.title,
    country: this.country,
    city: this.city,
    postcode: this.postcode,
    floor: this.floor,
    area: this.area,
    rooms: this.rooms,
    type: this.type,
    adType: this.adType,
    price: this.price,
    telephoneNumber: this.telephoneNumber,
    description: this.description,
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly propertyService: PropertyService,
    private readonly keycloakService: KeycloakService,
    private readonly location: Location,
    private readonly messageService: NzMessageService,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService
  ) {
    this.route.params.pipe(
      concatMap(param => {
        this.propertyId = param.id
        return param.id ? this.propertyService.getPropertyInfo(param.id) : of()
      }),
      tap(property => this.propertyForm.patchValue(property)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  handleFormSave(fileList: NzUploadFile[]) {
    const metadata: any = {
      title: this.title.value,
      address:{
        country: this.country.value,
        city: this.city.value,
        postcode: this.postcode.value,
        floor: this.floor.value,
        area: this.area.value,
      },
      rooms: this.rooms.value,
      type: this.type.value,
      adType: this.adType.value,
      price: this.price.value,
      telephoneNumber: this.telephoneNumber.value,
      description: this.description.value,
      userId: this.keycloakService.getUserId(),
    }
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append('files', file);
    });
    formData.append('metadata', JSON.stringify(metadata));
    this.propertyId ? this.handleUpdateProperty(formData) : this.handleSaveProperty(formData)
  }

  handleSaveProperty(formData: FormData) {
    this.propertyService.saveProperty(formData)
      .subscribe({
        next: () => {
          this.messageService.success(
            this.translate.instant('Successfully added new advertisement')
          )
          this.location.back()
        },
        error: () => this.messageService.error(
          this.translate.instant('An error has occurred. Please try again')
        )
      })
  }

  handleUpdateProperty(formData: FormData) {
    if (!this.propertyId) {
      return
    }

    this.propertyService.updateProperty(this.propertyId, formData)
      .subscribe({
        next: () => {
          this.messageService.success(
            this.translate.instant('Successfully updated advertisement')
          )
          this.location.back()
        },
        error: () => this.messageService.error(
          this.translate.instant('An error has occurred. Please try again')
        )
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
