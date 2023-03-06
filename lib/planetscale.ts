import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface UserTable {
  id: Generated<number>;
  name: string;
  username: string;
  email: string;
}

interface MediaTable {
  id: Generated<number>;
  userId: string;
  media_uid: string;
  media_type: string;
  origin: string;
  medial_url: string;
  s3bucket_key: string;
  permalink: string;
  title: string;
  content: string;
  timestampMedia: Date;
} 

interface CognitionTable {
  id: Generated<number>;
  model: string;
  modelsubtype: string;
  output: JSON;
  outputcleaned: JSON;
  mediaId: string;
}


interface Database {
  User: UserTable;
  Media: MediaTable;
  Cognition: CognitionTable;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
