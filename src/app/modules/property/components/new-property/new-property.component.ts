import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccepterFileTypes, PropertyFormControls } from 'src/app/modules/property/components/new-property/new-property';
import { NzModule } from 'src/app/shared/modules/nz.module';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IconPath } from 'src/app/shared/models/paths-to-resources';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
  imports: [CommonModule, TranslateModule, NzModule, FormsModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPropertyComponent {
  @Output() handlePropertySave = new EventEmitter<NzUploadFile[]>()
  @Input() propertyForm!: FormGroup
  readonly PropertyFormControls = PropertyFormControls
  readonly AccepterFileTypes = AccepterFileTypes
  readonly IconPath = IconPath
  fileList: NzUploadFile[] = []
  preview: any
  constructor(private readonly location: Location) {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }

  navigationBack() {
    this.location.back()
  }
}
