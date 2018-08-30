module.exports = {
    apps: [
        {
            name: 'ALPHABOT',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                alphaUrl: 'http://172.31.30.91:3010'
            }
        }
    ],
    deploy: {
        production: {
            user: 'dev',
            host: '172.31.30.91',
            ref: 'new/master',
            repo: 'https://github.com/devoficial/alphabot.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};