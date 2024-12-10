import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/app/environments/environment'
import { filterData, filterType } from '../components/filter/filter.model'

@Injectable({ providedIn: 'root' })
export class FilterService {
  private readonly API_URI = environment.apiUrl

  constructor(private readonly httpClient: HttpClient) { }

  getFilterByParam(param?: filterData[], userId?: string): Observable<filterType> {
    let params = new HttpParams()
    if (userId) {
      params = params.append('user_id', userId);
    }
    if (param?.length) {
      param.forEach(param => params = params.append(param.key, param.value));
    }
    return this.httpClient.get<filterType>(`${this.API_URI}filter`, { params: params })
  }
}
