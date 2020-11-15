<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller {

	public function index() {
		$posts = Post::join('users', 'users.id', '=', 'posts.user_id')
									->select('posts.*', 'users.name as username')
									->paginate(3);

		foreach ($posts as $post) {
			if (strlen($post->body) > 300) {
				$post->body = substr($post->body, 0, 297) . '...';
				$post->image = getImageUrl($post->image, 'public/cover_images/thumb_');
			}
		}

		return view('home', [
			'posts' => $posts
		]);
	}
}
