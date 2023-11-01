import * as admin from 'firebase-admin';
import { FirebaseConfigService } from 'src/firebase/firebase-config.service';

import { Inject, Injectable } from '@nestjs/common';

import { Site } from './site.entity';

@Injectable()
export class SiteService {
  private readonly firestore: admin.firestore.Firestore;

  constructor(private readonly firebaseConfigService: FirebaseConfigService) {
    this.firestore = this.firebaseConfigService.getFirestoreInstance();
  }

  async findSiteByDomain(subdomain: string) {
    const query = this.firestore
      .collection('sites')
      .where('subdomain', '==', subdomain)
      .limit(1);

    let querySnapshot;

    try {
      querySnapshot = await query.get();
    } catch (error) {
      throw error;
    }

    if (querySnapshot.empty) {
      return null;
    }

    const siteData = querySnapshot.docs[0];

    return { ...siteData.data(), id: siteData.id } as Site;
  }

  async createSite(site: Site, host: string): Promise<string> {
    try {
      const url = `http://${site.subdomain}.${host}`;

      const siteRef = await this.firestore
        .collection('sites')
        .add({ ...site, url });

      return siteRef.id;
    } catch (error) {
      throw new Error('Failed to create site: ' + error.message);
    }
  }

  async getSites(): Promise<Site[] | null> {
    try {
      const snapshot = await this.firestore.collection('sites').get();

      const sites: Site[] = snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as Site,
      );

      return sites;
    } catch (error) {
      throw new Error('Failed to fetch site: ' + error.message);
    }
  }

  async getSite(id: string): Promise<Site | null> {
    try {
      const doc = await this.firestore.collection('sites').doc(id).get();

      if (doc.exists) {
        return { ...doc.data(), id: doc.id } as Site;
      }

      return null;
    } catch (error) {
      throw new Error('Failed to fetch site: ' + error.message);
    }
  }

  async updateSite(id: string, site: Site): Promise<Site | null> {
    try {
      await this.firestore
        .collection('sites')
        .doc(id)
        .set(site, { merge: true });

      return await this.getSite(id);
    } catch (error) {
      throw new Error('Failed to update site: ' + error.message);
    }
  }

  async deleteSite(id: string): Promise<Site | null> {
    try {
      const site = await this.getSite(id);

      if (!site) return site;

      await this.firestore.collection('sites').doc(id).delete();

      return site;
    } catch (error) {
      throw new Error('Failed to delete site: ' + error.message);
    }
  }
}
