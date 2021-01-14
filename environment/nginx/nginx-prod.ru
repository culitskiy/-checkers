server {
	listen 80;
	server_name _;

	return 301 https://_$request_uri;
}

server {
	listen 80;
	listen 443 ssl;

	include sslparams;

	server_name www._;

	return 301 https://_$request_uri;
}

server {
	listen 443 ssl;

	include sslparams;

    server_name _;
    root /opt/_-frontend/current/public;

	access_log /var/log/nginx/frontend-prod.access.log;
    error_log /var/log/nginx/frontend-prod.error.log;

    location / {
	    try_files $uri$args $uri @proxy;
    }
}
