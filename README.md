# Deployment

## Install Nodejs

    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

    sudo apt-get install -y nodejs

## Install Mongodb

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update

    sudo apt-get install -y mongodb-org

    sudo service mongod start

## Install Redis
    sudo apt-get install build-essential
    sudo apt-get install tcl8.5
    wget http://download.redis.io/releases/redis-stable.tar.gz
    tar xzf redis-stable.tar.gz
    cd redis-stable
    make
    make test
    sudo make install
    cd utils
    sudo ./install_server.sh
    sudo service redis_6379 start

