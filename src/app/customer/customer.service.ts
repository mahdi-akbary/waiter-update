import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable()
export class CustomerService {
  url: string = 'server/exitingCustomers'
  selectedCustomer: any = null;
  isUpdatingOrder: boolean = false;
  constructor(private httpService: HttpService) {
  }


  getCustomer(id: number): Observable<any> {
    return this.httpService.get(`${this.url}/${id}`);
  }
}
