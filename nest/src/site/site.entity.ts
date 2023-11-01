import { FieldValue } from '@google-cloud/firestore';

export class Site {
  id?: string;
  url: string;
  subdomain: string;
  title: string;
  description: string;
  created_at: FieldValue;
}
