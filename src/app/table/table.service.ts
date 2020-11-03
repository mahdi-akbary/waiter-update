import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable()
export class TableService {
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

  categories(): Observable<any> {
    return this.httpService.get(`server/category`);
  }

  items(): Observable<any> {
    return this.httpService.get(`server/item`);
  }
  submit(data): Observable<any> {
    return this.httpService.post(`server/submit`, data);
  }
}
