import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/app/environments/environment'

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private readonly API_URI = environment.apiUrl

  constructor(private readonly httpClient: HttpClient) { }

  getPropertyLength(userId?: string): Observable<number> {
    let params = new HttpParams()
    if (userId) {
      params = params.append('userId', userId);
    }
    return this.httpClient.get<number>(`${this.API_URI}property`, { params: params })
  }
}
