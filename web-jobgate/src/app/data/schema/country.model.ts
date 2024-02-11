export class CountryModel {
    public id: string;
    public code: string;
    public name: string;

    public constructor(
        data?: CountryModel
    ) {
        const country = data == null ? this : data;

        this.id = country.id;
        this.code = country.code;
        this.name = country.name;
    }
}
