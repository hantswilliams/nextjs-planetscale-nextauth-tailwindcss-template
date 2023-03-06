import { queryBuilder } from '../../../lib/planetscale';
import ImageDetailsTable from './imageDetails';

export default async function({params}: {params: { slug: string }}) {

    console.log(params);
    console.log('Slug: ', params.slug);

    const userImages = await queryBuilder
        .selectFrom('Media')
        .select(['media_uid', 'medial_url'])
        .where('media_uid', 'like', `%${params.slug}%`)
        .execute();

    console.log('imageDetails: ', userImages);

    return (
        <div>
            <h1>Image Details</h1>
            <p>Image Details for: {params.slug}</p>
              {userImages.map((item: any) => (
                  <div key={item.media_uid}>
                      <p> {item.media_uid} </p>
                      <p> {item.medial_url} </p>
                  </div>
              ))}
            {/* @ts-expect-error Server Component */}
            <ImageDetailsTable users={userImages} />
        </div>
    )
  }

  