import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-item-card',
  templateUrl: './add-item-card.component.html',
  styleUrls: ['./add-item-card.component.css']
})
export class AddItemCardComponent implements OnInit {
  @Input() formType:string|undefined;
  constructor() {
  }
  ngOnInit(): void {
  }
}
