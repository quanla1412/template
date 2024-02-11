export class OccupationModel {
  public id: string;
  public name: string;
  public description: string;
  public availableJobQuantity: number;


  public constructor(
    data?: OccupationModel
  ) {
    const occupation = data == null ? this : data;

    this.id = occupation.id;
    this.name = occupation.name;
    this.description = occupation.description;
    this.availableJobQuantity = occupation.availableJobQuantity;
  }
}
