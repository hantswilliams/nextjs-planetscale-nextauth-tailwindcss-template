// import { queryBuilder } from '../../../lib/planetscale';
import ImageDetailsTable from './imageDetails';

export default async function({params}: {params: { slug: string }}) {

    // console.log(params);
    // console.log('Slug: ', params.slug);

    // const userImages2 = await queryBuilder
    //     .selectFrom('Media')
    //     .select(['media_uid', 'medial_url', 'viewable'])
    //     .where('media_uid', 'like', `%${params.slug}%`)
    //     .execute();

    // const userCognitions2 = await queryBuilder
    //     .selectFrom('Cognition')
    //     .select(['model', 'modelsubtype', 'output', 'outputcleaned', 'mediaId'])
    //     .where('mediaId', 'like', `%${params.slug}%`)
    //     .execute();

    const userImages2 = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/images/image/${params.slug}`, { cache: 'no-store' })
        .then((res) => res.json())
    
    const userCognitions2 = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/api/cognitions/image/${params.slug}`, { cache: 'no-store' })
        .then((res) => res.json())
        
    // console.log('imageDetails2: ', userImages2);
    // console.log('userCognitions2: ', userCognitions2);

    return (
        <div>
            <ImageDetailsTable users={userImages2} cognitions={userCognitions2} />
        </div>
    )
  }

  