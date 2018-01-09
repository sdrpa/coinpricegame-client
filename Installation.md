### Installation

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

ln -s webpack.config.debug.js webpack.config.js
ln -s webpack.config.release.js webpack.config.js

npm start
webpack --progress
node_modules/.bin/webpack --progress