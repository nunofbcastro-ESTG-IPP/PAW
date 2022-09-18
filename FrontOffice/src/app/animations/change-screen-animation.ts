import { transition, trigger, style, animate } from '@angular/animations';

export const changeScreenAnimation = trigger('routeAnimations', [
  transition(
    '* <=> *',
    [style({ opacity: 0 }), animate('{{timing}} ease-in', style('*'))],
    { params: { timing: '0.4s' } }
  ),
]);
