import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/app/environments/environment'
import { AgentType } from '../models/agent.model'

@Injectable({ providedIn: 'root' })
export class AgentService {
  private readonly API_URI = environment.apiUrl

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getAgents(): Observable<AgentType[]> {
    return this.httpClient.get<AgentType[]>(`${this.API_URI}user`)
  }

  getAgent(userId: string): Observable<AgentType> {
    return this.httpClient.get<AgentType>(`${this.API_URI}user/${userId}`)
  }

  setSubscription(userId: string): Observable<AgentType> {
    return this.httpClient.put<AgentType>(`${this.API_URI}users/subscription/${userId}`, null)
  }


}
