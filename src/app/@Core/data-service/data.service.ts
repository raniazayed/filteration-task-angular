import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() {}

  get Departments(): IDepartment[] {
    return [
      {
        value: 1,
        viewValue: {
          english: 'First Department',
          arabic: 'القسم الاول'
        }
      },
      {
        value: 2,
        viewValue: {
          english: 'Second Department',
          arabic: 'القسم الثاني'
        }
      },
      {
        value: 3,
        viewValue: {
          english: 'Third Department',
          arabic: 'القسم الثالث'
        }
      },
      {
        value: 4,
        viewValue: {
          english: 'Fourth Department',
          arabic: 'القسم الرابع'
        }
      },
      {
        value: 5,
        viewValue: {
          english: 'Fifth Department',
          arabic: 'القسم الخامس'
        }
      }
    ];
  }
}

export interface IDepartment {
  value: number;
  viewValue: {
    arabic: string;
    english: string;
  };
}
