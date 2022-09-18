import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/http/auth.service';
import { UserService } from 'src/app/services/http/user.service';
import { environment } from 'src/environments/environment';
import { User } from '../../../models/user.model';
import { CartService } from '../../../services/data/cart.service';

@Component({
  selector: 'app-partial-header',
  templateUrl: './partial-header.component.html',
  styleUrls: ['./partial-header.component.scss'],
})
export class PartialHeaderComponent implements OnInit {
  imageSrc: string = environment.imageUser;
  imageNotFoundUser: string = environment.imageNotFoundUser;

  user!: User;
  numberItens!: Number;
  @ViewChild('menu') menu!: ElementRef;

  private subscritionCart$!: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.subscritionCart$ = this.cartService
      .getNumberItems()
      .subscribe((res: number) => {
        this.numberItens = res;
      });
  }

  ngOnDestroy(): void {
    this.subscritionCart$.unsubscribe();
  }

  menuMobile() {
    const menuIshidden = this.menu.nativeElement.classList.contains('hidden');

    if (menuIshidden) {
      this.renderer.removeClass(this.menu.nativeElement, 'hidden');
    } else {
      this.renderer.addClass(this.menu.nativeElement, 'hidden');
    }
  }

  getUser() {
    let subscribe = this.userService.getUser().subscribe((data: any) => {
      this.user = data.user;
      subscribe.unsubscribe();
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
