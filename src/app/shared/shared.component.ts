import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: `<!-- Este componente no necesita tener template -->`,
})
export class SharedComponent {

}
