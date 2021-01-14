# project_name frontend

## Requirements

* node 8.11.1
* yarn 1.21.1
* [promo-cli ^0.1.7](https://www.npmjs.com/package/promo-cli)
---

### Installation

Install dependencies:
```sh
yarn install
```
If not installed:
```sh
yarn global add promo-cli
[or] npm install --global promo-cli
```

Build application:
```sh
yarn build
```
---
### Development

Create new React Component boilerplate:
```sh
promo-cli --generate --component --name ComponentName
[or] promo-cli --generate --component --name path/to/ComponentName
```
---
### Deploy (target host)

Place in /opt/environment.sh:
```sh
export TD_ENV=dev|qa|prod
```

Create symlink to nginx config `./environment/nginx/happy-heart.{current env}.conf` in `/etc/nginx/sites-enabled` 

Restart nginx:
```sh
sudo service nginx configtest
sudo service nginx restart
```
