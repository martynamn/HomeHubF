import { Pipe, PipeTransform, inject } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Buffer } from 'buffer'
import { AcceptedBase64FileFormat } from '../models/files.model'
@Pipe({
  name: 'base64ToFile',
  standalone: true,
})
export class Base64ToFilePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer)

  transform(base64String: string): SafeResourceUrl {
    const fileTypeKey = Object.keys(AcceptedBase64FileFormat).find(key => base64String.startsWith(key))
    const fileType = AcceptedBase64FileFormat[fileTypeKey as keyof typeof AcceptedBase64FileFormat]
    const binaryString = Buffer.from(base64String, 'base64')
    const blob = new Blob([binaryString], { type: fileType })
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob))
  }
}
