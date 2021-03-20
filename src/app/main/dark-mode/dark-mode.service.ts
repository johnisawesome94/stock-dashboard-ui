import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DarkMode } from "./dark-mode";

@Injectable()
export class DarkModeService {
  private readonly darkmodeUrl: string =
    "https://stock-dashboard-api.herokuapp.com/dark-mode";

  constructor(private httpClient: HttpClient) {}

  getDarkMode(): Observable<DarkMode> {
    return this.httpClient.get<DarkMode>(this.darkmodeUrl);
  }

  editDarkMode(darkMode: DarkMode): any {
    return this.httpClient.put(this.darkmodeUrl, darkMode);
  }

}
