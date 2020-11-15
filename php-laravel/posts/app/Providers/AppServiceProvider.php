<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register() {
		//
	}

	/**
	 * Bootstrap any application services.
	 *
	 * @param UrlGenerator $url
	 * @return void
	 */
	public function boot(UrlGenerator $url) {
		// to load css and js with https
//		if(env('APP_ENV') !== 'local')
//		{
//			$url->forceScheme('https');
//		}

		$this->app['request']->server->set('HTTPS','on');

		// to use pagination of boostrap
		Paginator::useBootstrap();
	}
}
