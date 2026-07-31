import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {Housing} from '../housing';

@Component({              //componente quindi elemento mostrato sulla pagina
  selector: 'app-home',     //il componente è richiamato dal nome app-home
  imports: [HousingLocation],
  //template = come viene rappresentata la pagina in html
  template: `       
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />     <!--#filter = etichetta applicata a input, per chiamarlo al bisogno-->
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>   <!--(click) quando è cliccato avvia quella funzione-->
      </form>
    </section>
    <section class="results">
    @for (housingLocation of filteredLocationList; track $index) {  <!--repeatedly renders content of a block for each item in a collection. track $index(????)-->
      <app-housing-location [housingLocation]="housingLocation" />   <!--Index tiene traccia delle posizioni ed è il numero della posizione corrente, serve per capire quali case sono le stesse quando ridisegna la lista-->
    }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  housingLocationList: HousingLocationInfo[] = [];
  housingService: Housing = inject(Housing);
  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {
    this.housingService
        .getAllHousingLocations()
        .then((housingLocationList: HousingLocationInfo[]) => {
          this.housingLocationList = housingLocationList;
          this.filteredLocationList = housingLocationList;
          this.changeDetectorRef.markForCheck();
        });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
