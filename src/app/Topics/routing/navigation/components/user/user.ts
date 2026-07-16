import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  protected user = history.state;

  private queryParams = toSignal(
  this.route.queryParamMap
);

protected page = computed(() =>
  this.queryParams()?.get('page')
);

protected sort = computed(() =>
  this.queryParams()?.get('sort')
);

  ngOnInit(): void {

  // this.route.queryParamMap.subscribe(params => {

  //   console.log(params.get('page'));

  //   console.log(params.get('sort'));

  // });

  this.route.queryParamMap.pipe(
    map(params => {
       console.log(params.get('page'));

      console.log(params.get('sort'));
    })
  )

}

  protected goHome(): void {

    this.router.navigate([
      '/routing-demo/navigation/home'
    ]);

  }
}
