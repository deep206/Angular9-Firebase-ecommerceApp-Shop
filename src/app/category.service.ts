import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges(); //.valueChanges();
    // to use snapshotChanges(); please keep in mind to bind with {{ c.payload.val().name }} to use with payload
    // to show correct data and read it successfully
  }
}
