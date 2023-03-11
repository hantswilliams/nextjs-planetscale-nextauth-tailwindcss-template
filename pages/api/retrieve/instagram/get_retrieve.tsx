async function ig_me_media(ig_userToken: string, ig_userID: string) {

    const fields = 'id,caption,is_shared_to_feed,media_type,media_url,permalink,thumbnail_url,username,timestamp';
    const url = `https://graph.instagram.com/v15.0/${ig_userID}/media?fields=${fields}&access_token=${ig_userToken}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        var jsonData = await response.json();
        // console.log('jsonData: ', jsonData);
      
        let output = jsonData.data;
        let counter = 0;
        // console.log('counter: ', counter);
      
        while (jsonData.paging.next) {
          counter++;
          const nextResponse = await fetch(jsonData.paging.next);
          if (!nextResponse.ok) {
            throw new Error(`Failed to fetch data. Status: ${nextResponse.status}`);
          }
          jsonData = await nextResponse.json();
          output = output.concat(jsonData.data);
        //   console.log('counter: ', counter);
        }
        // console.log('length of output: ', output.length);
        console.log('output: ', output);
        return output;

      } catch (error) {
        console.error(error);
        // handle the error here, e.g. show an error message to the user
      }
}

export default ig_me_media; // export the function so it can be used in other files