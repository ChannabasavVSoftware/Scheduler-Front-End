import {Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private isServerConnectedSubject = new BehaviorSubject<boolean>(false);
  isServerConnected$ = this.isServerConnectedSubject.asObservable();



  private mainConnection: HubConnection;
  public signalRUrl: string = environment.signalRUrl;

  constructor() {
    if(environment.useSignalR){
      this.createMainConnection();
    }
  }

  private createMainConnection() {
    this.mainConnection = new HubConnectionBuilder()
      .withUrl(this.signalRUrl)
      .build();

    this.mainConnection.onclose(error => {
      console.error("Main connection closed due to error: ", error);
      this.updateConnectionStatus(false);
      this.retryMainConnection();
    });

    this.startMainConnection();
  }

  private startMainConnection(): void {
    this.mainConnection.serverTimeoutInMilliseconds = 100000;
    this.mainConnection
      .start()
      .then(() => {
        setInterval(() => {
          this.mainConnection.send('KeepAlive').catch(err => {
            console.error('KeepAlive error: ', err);
            this.updateConnectionStatus(false);
          });
          console.log("Main SignalR-KeepAlive");
        }, 60000);
        console.log('Main Hub connection started');
        this.updateConnectionStatus(true);
      })
      .catch(err => {
        console.error('Error while establishing main connection, retrying...', err);
        this.updateConnectionStatus(false);
        this.retryMainConnection();
      });
  }

  private updateConnectionStatus(isConnected: boolean): void {
    this.isServerConnectedSubject.next(isConnected);
    localStorage.setItem('isServerConnected', isConnected.toString());
  }

  private retryMainConnection(): void {
    setTimeout(() => {
      if (!this.isMainConnected()) {
        this.startMainConnection();
      }
    }, 1000);
  }

  private isMainConnected(): boolean {
    return this.mainConnection && this.mainConnection.state === HubConnectionState.Connected;
  }

}
