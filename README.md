# Deployment

## Install dependecies

    sudo apt-get install -y git pkg-config build-essential

## Install nginx

    sudo apt-get install -y nginx

## Install Nodejs

    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

    sudo apt-get install -y nodejs

## Install Mongodb

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

    sudo apt-get update

    sudo apt-get -y install mongodb-org

## Install Redis

    sudo apt-get install -y tcl8.5

    wget http://download.redis.io/releases/redis-stable.tar.gz

    tar xzf redis-stable.tar.gz

    cd redis-stable

    make

    make test

    cd src && sudo make install

    cd ..

    cd utils

    sudo ./install_server.sh

    sudo service redis_6379 start

## Install pm2

    npm i -g pm2

## Install sharp

    curl -s https://raw.githubusercontent.com/lovell/sharp/master/preinstall.sh | sudo bash -

## Install canvas

    wget https://raw.githubusercontent.com/LearnBoost/node-canvas/master/install -O - | sh

## Setup nginx vhost
    cd /etc/nginx/sites-available
    sudo nano default

    server {
      listen 80;

      server_name [];

      location / {
          proxy_pass IPSERVER:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
    }



