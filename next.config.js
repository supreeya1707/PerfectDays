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
    env: {
        pathUrl: `https://lineapi.hyggecode.com/hyggemain/perfectdays`,
        idcardliff: '2004162856-J7ZmzjQq',
        profileliff: '2004049555-OnWzgRB7',
        API_KEY:'AIzaSyA5S111okudFrxg46QUXgqnUM0kZoGJ2S4',
        

    }

}

module.exports = nextConfig
