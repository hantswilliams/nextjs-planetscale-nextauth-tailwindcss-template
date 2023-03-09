
export default async function UserSocialAccounts () {

    const client_id = process.env.INSTAGRAM_CLIENT_ID;
    const redirect_uri = 'https://socialcomprehend.com/api/connect/instagram';

    return(
              <div className="pt--10 pr-0 pb-10 pl-0">
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex items-center flex-1 min-w-0">
                      <img
                          src="https://cdn-icons-png.flaticon.com/512/3621/3621435.png" className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                      <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">Instagram</p>
                        <p className="text-gray-600 text-md">Connected</p>
                      </div>
                    </div>
                    <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                      <a href={`https://api.instagram.com/oauth/authorize?client_id=${client_id}&scope=user_profile,user_media&redirect_uri=${redirect_uri}&response_type=code`} 
                          className="bg-purple-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Connect</a>
                    </div>
                  </div>
                </div>
                <div className="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
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
                      <a href="" className="bg-purple-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
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
                      <a href="" className="bg-purple-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
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
                      <a href="" className="bg-purple-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
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
                      <a href="" className="bg-purple-600 pt-2 pr-6 pb-2 pl-6 text-sm font-medium text-gray-100 transition-all
                          duration-200 hover:bg-gray-700 rounded-lg">Connect</a>
                    </div>
                  </div>
                </div>
              </div>

    )
}
