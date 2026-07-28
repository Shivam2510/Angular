import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
  standalone: true
})
export class UserDetails {
   private route = inject(ActivatedRoute);

  //  Old approach
  protected user = this.route.snapshot.data['user'];

  // New Approch
   protected userData = toSignal(
      this.route.data.pipe(
        map(data => data['user'])
      )
   )
}
