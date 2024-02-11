import {POSITION_GROUP} from '../../../core/constant/position-group.constant';

export class JobPositionModel {
  public id: string;
  public code: string;
  public name: string;
  public positionGroup: string;

  public constructor(
    data?: JobPositionModel
  ) {
    const jobPosition = data == null ? this : data;

    this.id = jobPosition.id;
    this.code = jobPosition.code;
    this.name = jobPosition.name;
    this.positionGroup = jobPosition.positionGroup;
  }

  public displayPositionGroup() {
    switch (this.positionGroup) {
      case POSITION_GROUP.TECH:
        return 'Tech';
      case POSITION_GROUP.NON_TECH:
        return 'Non tech';
    }

    return '';
  }
}
