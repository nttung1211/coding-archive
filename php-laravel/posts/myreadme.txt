-To switch to local mode
+ change STORAGEMODE to "local" in .env
+ commnet out "$this->app['request']->server->set('HTTPS','on');" in AppServiceProvider.php
