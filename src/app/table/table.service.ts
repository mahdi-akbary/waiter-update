import {Injectable} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Observable} from "rxjs";

@Injectable()
export class TableService {
  url: string = 'server/table'
  selectedTable: number = null;
  constructor(private httpService: HttpService) {
  }

  index(options?: {}): Observable<any[]> {
    return this.httpService.get(this.url, options);
  }
}
