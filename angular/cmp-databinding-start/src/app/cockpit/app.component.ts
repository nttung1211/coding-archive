import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class CockpitComponent {

  @Output('thisServerCreated') serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('thisBlueprintCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @ViewChild('contentInput') contentInput: ElementRef;

  emitAddServerEvent(serverInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverInput.value,
      serverContent: this.contentInput.nativeElement.value
    });
  }

  emitAddBlueprintEvent(serverInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverInput.value,
      serverContent: this.contentInput.nativeElement.value
    });
  }
}