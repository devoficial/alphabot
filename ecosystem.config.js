module.exports = {
    apps: [
        {
            name: 'ALPHABOT',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production',
                alphaUrl: 'http://35.160.143.122:3010'
            }
        }
    ],
    deploy: {
        production: {
            user: 'dev',
            host: ['18.188.169.23'],
            ref: 'new/master',
            repo: 'https://github.com/devoficial/alphabot.git',
            path: '/srv/production',
            'ssh_options': 'StrictHostKeyChecking=no',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};