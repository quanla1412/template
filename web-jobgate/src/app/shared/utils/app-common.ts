import {Injectable} from '@angular/core';
import {DATETIME_FORMAT} from '../../core/constant/date-time-format.constant';

declare var moment: any;

@Injectable({
  providedIn: 'root'
})
export class AppCommon {
  private timezone = null;

  constructor() {
  }

  public capitalizeString(val: string): string {
    if (!val || val.length < 1) {
      return val.toUpperCase();
    }

    return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
  }

  public nowDate(format?: string): string {
    const formatF = format ? format : DATETIME_FORMAT.DATE;
    return moment().format(formatF);
  }

  public nowDateTime(format?: string): string {
    const formatF = format ? format : DATETIME_FORMAT.DATE_TIME;
    return moment().format(formatF);
  }

  public convertTimeToDate(val: string, format?: string): string {
    const formatF = format ? format : DATETIME_FORMAT.DATE;
    return moment(val).format(formatF);
  }

  public convertTimeToDateTime(val: string, format?: string): string {
    const formatF = format ? format : DATETIME_FORMAT.DATE_TIME;
    return moment(val).format(formatF);
  }

  public convertDateFormat(val: string, fromFormat: string, toFormat: string): string {
    return moment(val, fromFormat).format(toFormat);
  }

  public swapDateWithTimestamp(convertTo: string, time: string): string {
    return moment(convertTo).format(DATETIME_FORMAT.DATE) + 'T' + moment(time).format(DATETIME_FORMAT.TIME);
  }

  public isSameMoment(dateOne: any, dateTwo: any, type = 'date'): boolean {
    return moment(dateOne).isSame(dateTwo, type);
  }

  public isBeforeMoment(dateOne: any, dateTwo: any, type = 'date'): boolean {
    return moment(dateOne).isBefore(dateTwo, type);
  }

  public isAfterMoment(dateOne: any, dateTwo: any, type = 'date'): boolean {
    return moment(dateOne).isAfter(dateTwo, type);
  }

  public isBeforeOrEqualMoment(dateOne: any, dateTwo: any, type = 'date'): boolean {
    return (moment(dateOne).isBefore(dateTwo, type) || moment(dateOne).isSame(dateTwo, type));
  }

  public isAfterOrEqualMoment(dateOne: any, dateTwo: any, type = 'date'): boolean {
    return (moment(dateOne).isAfter(dateTwo, type) || moment(dateOne).isSame(dateTwo, type));
  }

  public makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public generateIntervalTimeNumber(targetDate: string, offsetMinute: number): string[] {
    if ((60 % offsetMinute) !== 0) {
      return [];
    }
    const offsetTotal = 60 / offsetMinute;
    let startTime = moment(targetDate).startOf('d');
    const result = [startTime.format(DATETIME_FORMAT.DATE_TIME)];
    for (let hour = 1; hour <= 24; hour++) {
      for (let offset = 1; offset <= offsetTotal; offset++) {
        startTime = startTime.add(offsetMinute, 'minutes');
        result.push(startTime.format(DATETIME_FORMAT.DATE_TIME));
      }
    }

    result.pop();
    return result;
  }

  public getTransitionEndEventName(): string {
    const transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };
    const bodyStyle = document.body.style;
    for (const transition in transitions) {
      if (bodyStyle[transition] !== undefined) {
        return transitions[transition];
      }
    }
  }

  public getPhoneNumber(val: string): string {
    return !val || val === '' ? '' : val.replace(/\D/gi, '');
  }

  public formatUSNumber(entry = ''): string {
    const match = entry
      .replace(/\D+/g, '').replace(/^1/, '')
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : '';
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : '';
    return `${part1}${part2}${part3}`;
  }
}
