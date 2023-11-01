import * as admin from 'firebase-admin';
import * as path from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseConfigService {
  private readonly firebaseAdmin: admin.app.App;

  constructor() {
    // Load the service account key file from the project's root directory
    const serviceAccount = require(
      path.resolve(process.cwd(), 'firebase.json'),
    );

    // Initialize Firebase Admin with the service account key
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  getFirestoreInstance(): admin.firestore.Firestore {
    return this.firebaseAdmin.firestore();
  }
}
