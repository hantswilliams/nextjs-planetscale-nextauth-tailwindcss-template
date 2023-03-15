import client from '../../lib/prismadb'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { Card, Text, Title } from '@tremor/react'
import Image from 'next/image'

export default async function UserSocialAccounts () {

    const session = await getServerSession(authOptions);

    // if session, get user id
    const session_user_id = session?.user?.id
    console.log('session_user_id: ', session_user_id)
        
    const client_id = process.env.INSTAGRAM_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;

    // console.log('redirect_uri: ', redirect_uri)

    const ig_status_check = async () => {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/status/connection/instagram/${session_user_id}`, {cache: 'no-cache'})
      const data = await response.json()
      console.log('data: ', data)
      let ig_status;

      // if data is not an empty array then the user is connected
      if (data.length !== 1 || data[0].length !== 0) {
        ig_status = 'connected';
      } else {
        ig_status = 'notconnected';
      }
      return ig_status;
  }

  const igStatus = await ig_status_check();
  console.log('igStatus: ', igStatus)


    return(
              <div className="pt--10 pr-0 pb-10 pl-0" >
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/3621/3621435.png"
                        alt="Profile Image"
                        className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                        width={40}
                        height={40}
                      />
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">Instagram</p>
                        {/* if ig_status is not null, display a green connected, else to a red not connected   */}
                        {igStatus == 'connected' ?
                          <p className="text-green-600 text-md">Connected</p>
                          :
                          <p className="text-gray-600 text-md">Not Connected</p>
                        }
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-0 flex items-center flex-shrink-0 sm:space-x-6 sm:pl-0 sm:mt-0">
                      {igStatus == 'connected' ?
                      <a href={'/settings/manage/instagram'} 
                          className="bg-slate-900 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-slate-100 transition-all
                          duration-200 hover:bg-slate-600 rounded-lg">Manage Account</a> :
                      <a href={`https://api.instagram.com/oauth/authorize?client_id=${client_id}&scope=user_profile,user_media&redirect_uri=${redirect_uri}&response_type=code`} 
                        className="bg-slate-900 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-slate-600 transition-all
                          duration-200 hover:bg-slate-600 rounded-lg">Connect</a>
                      }
                    </div>
                  </div>
                </div>
                {/* <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png"
                          className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">Twitter</p>
                        <p className="text-gray-600 text-md">Connected</p>
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                        sm:mt-0">
                      <a href="" className="bg-blue-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Disconnect</a>
                    </div>
                  </div>
                </div>
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <img src="https://icons-for-free.com/download-icon-linkedin+logo+logo+website+icon-1320190502911715717_512.png" className="flex-shrink-0
                          object-cover rounded-full btn- w-10 h-10"/>
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">Linkedin</p>
                        <p className="text-gray-600 text-md">Not connected</p>
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                        sm:mt-0">
                      <a href="" className="bg-blue-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Connect</a>
                    </div>
                  </div>
                </div>
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <img src="https://www.pngkit.com/png/full/29-294128_facebook-darkblue-01-facebook-icon-small-png.png" className="flex-shrink-0
                          object-cover rounded-full btn- w-10 h-10"/>
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">Facebook</p>
                        <p className="text-gray-600 text-md">Connected</p>
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                        sm:mt-0">
                      <a href="" className="bg-blue-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Disconnect</a>
                    </div>
                  </div>
                </div>
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <img src="https://w7.pngwing.com/pngs/514/448/png-transparent-tiktok-logo-brand-logos-brands-in-colors-icon-thumbnail.png"
                          className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">TikTok</p>
                        <p className="text-gray-600 text-md">Not connected</p>
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:justify-end
                        sm:mt-0">
                      <a href="" className="bg-blue-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Connect</a>
                    </div>
                  </div>
                </div> */}
              </div>

    )
}
