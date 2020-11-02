import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable()
export class TransferService {
  url: string = 'server/table'

  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<any[]> {
    return this.httpService.get(this.url, options);
  }

  getCustomer(id: number): Observable<any> {
    return this.httpService.get(`server/exitingCustomers/${id}`);
  }

  transfer(data): Observable<any> {
    return this.httpService.post(this.url + `/transfer`, data);
  }
}
