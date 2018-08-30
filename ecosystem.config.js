module.exports = {
    apps: [
        {
            name: 'ALPHABOT',
            script: 'bin/run.js',
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],
    deploy: {
        production: {
            user: 'dev',
            host: '18.188.169.23',
            ref: 'new/master',
            repo: 'https://github.com/devoficial/alphabot.git',
            path: '/srv/production',
            'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }
};