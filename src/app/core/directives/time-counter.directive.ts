import {Directive, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Subject, SubscriptionLike, timer} from 'rxjs';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {tap} from 'rxjs/internal/operators/tap';

@Directive({
  selector: '[appTimeCounter]'
})
export class TimeCounterDirective implements OnChanges, OnDestroy {

  private counter$ = new Subject<any>();
  private countSub$: SubscriptionLike;

  @Input() appTimeCounter: Date;
  @Output() value = new EventEmitter<Date>();

  constructor() {
    this.countSub$ = this.counter$.pipe(
      switchMap((time: Date) =>
        timer(0, 500).pipe(
          tap(() => {
            let timeDiff = time.getTime() - (new Date()).getTime() - 3600000;
            if (timeDiff < -3600000) {
              timeDiff = -3600000;
            }
            this.value.emit(new Date(timeDiff));
          })
        )
      )
    ).subscribe();
  }



  ngOnChanges() {
    this.counter$.next(this.appTimeCounter);
  }

  ngOnDestroy() {
    this.countSub$.unsubscribe();
  }

}
