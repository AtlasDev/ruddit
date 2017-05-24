import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

import { Database } from './database';

@Injectable()
export class Notify extends EventEmitter {
  constructor(
    private db: Database,
  ) {
    super();

    this.db.conn.table('posts').changes().run().then((cursor) => {
      cursor.on('data', (data) => this.emit('update', {
        table: 'posts',
        data,
      }));
    });
  }
}
