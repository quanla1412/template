import {BaseSearchModel} from './base-search.model';
import {LoginSearchModel} from '../login-search.model';

export class LoginSearchLazyModel extends BaseSearchModel<LoginSearchModel[]> {
  public username: string;
}
