/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    output: 'export',
    basePath: '/perfectdays2',
    
    images: {
        domains: ['profile.line-scdn.net'],
        unoptimized: true,
    },
    headers: 
[
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate',
        },
      ],

    
    env: {
        pathUrl: `https://lineapi.hyggecode.com/hyggemain/perfectdays`,
        idcardliff: '2004162856-J7ZmzjQq',
// token test
        // idcardliff: '2004162856-WoQ6qjgb',
        profileliff: '2004162856-EDrqgaL0',
        lifftest: '2004162856-WoQ6qjgb',
        API_KEY:'AIzaSyA5S111okudFrxg46QUXgqnUM0kZoGJ2S4',
        

    },
   
}

module.exports = nextConfig
