import { LoggingService } from "./logging.service";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  add(newAccount: {name: string, status: string}) {
    this.accounts.push(newAccount);
    this.loggingService.logStatusChange(status);
  }

  changeStatus(updateInfo: {id: number, newStatus: string}) {
    this.accounts[updateInfo.id].status = updateInfo.newStatus;
    this.loggingService.logStatusChange(updateInfo.newStatus);
  }
}