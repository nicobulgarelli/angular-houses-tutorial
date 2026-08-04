import { Service } from '@angular/core';
import {HousingLocationInfo} from "./housinglocation";

@Service( )

export class Housing {

    url = 'http://localhost:3000/locations';

    async getAllHousingLocations(city: string | undefined): Promise<HousingLocationInfo[]> {
        const data = await fetch(`${this.url}?city=${city}`);
        return (await data.json()) ?? [];
    }

    async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
        const data = await fetch(`${this.url}/${id}`);
        const locationJson = await data.json();
        return locationJson ?? {};
    }

    async submitApplication(id: number, firstName: string, lastName: string, email: string) {
        const applicationObject = {
            locationId: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        try {
            const data = await fetch('http://localhost:3000/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationObject),
            });

            const risultato = await data.json();
            console.log('Risposta dal server:', risultato);
        } catch (errore) {
            console.error('Errore durante l\'invio:', errore);
        }
    }
}


