export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server has changed, new status: ', status);
  }
}