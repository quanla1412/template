import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(
    private router: Router,
  ) {
    // $('body').removeClass('login-page adi-background-guest');
    // $('body').Layout('fixLayoutHeight');
    // const match = window.matchMedia('(min-width: 992px)');
    // match.addEventListener('change', (e) => {
    //   if (e.matches) {
    //     $('body').removeClass('sidebar-collapse sidebar-closed');
    //     $('body').addClass('sidebar-open');
    //   } else {
    //     $('body').removeClass('sidebar-open');
    //     $('body').addClass('sidebar-collapse sidebar-closed');
    //   }
    // });
    //
    // // Catch change route
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Handle resize layout
    //     setTimeout(() => {
    //       $('body').Layout('fixLayoutHeight');
    //     }, 0);
    //   }
    // });
  }
}
