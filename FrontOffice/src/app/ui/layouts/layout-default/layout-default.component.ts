import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

import { changeScreenAnimation } from '../../../animations/change-screen-animation';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
  animations: [changeScreenAnimation],
})
export class LayoutDefaultComponent implements OnInit {
  constructor(private contexts: ChildrenOutletContexts) {}
  ngOnInit(): void {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
