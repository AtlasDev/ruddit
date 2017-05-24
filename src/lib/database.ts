import { Inject, Injectable } from '@angular/core';
import * as Rethink from 'rethinkdbdash';

@Injectable()
export class Database {
  public conn = Rethink({
    db: 'ruddit',
  });
}
