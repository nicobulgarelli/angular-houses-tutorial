import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {Housing} from '../housing';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `       
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />     
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>   
      </form>
    </section>
    <section class="results">
    @for (housingLocation of housingLocationList; track $index) { 
      <app-housing-location [housingLocation]="housingLocation" />   
    }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  housingLocationList: HousingLocationInfo[] = [];
  housingService: Housing = inject(Housing);

  constructor() {
    this.housingService
        .getAllHousingLocations(undefined)
        .then((housingLocationList: HousingLocationInfo[]) => {
          this.housingLocationList = housingLocationList;
          this.changeDetectorRef.markForCheck();
        });
  }

  filterResults(text: string) {
    this.housingService
        .getAllHousingLocations(text)
        .then((housingLocationList: HousingLocationInfo[]) => {
          this.housingLocationList = housingLocationList;
          this.changeDetectorRef.markForCheck();
        });
  }
}
