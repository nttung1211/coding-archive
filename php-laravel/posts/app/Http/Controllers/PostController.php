<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller {

	public function index() {
		$posts = Post::where('user_id', auth()->id())->paginate(3);
//		$user = User::find(auth()->id());
//		$posts =  $user->posts;

		foreach ($posts as $post) {
			if (strlen($post->body) > 300) {
				$post->body = substr($post->body, 0, 297) . '...';
				$post->image = getImageUrl($post->image, 'public/cover_images/thumb_');
			}
		}

		return view('posts.index', [
			'posts' => $posts
		]);
	}

	public function show($id) {
		try {
			$post = Post::findOrFail($id);
			$post->image = getImageUrl($post->image, 'public/cover_images/');
			return view('posts.show', [
				'post' => $post
			]);
		} catch (ModelNotFoundException $exception) {
			return redirect()->route('posts.index')->with('error', 'You do not have such a post');
		}
	}

	public function create() {
		return view('posts.create');
	}

	public function store(Request $request) {
		Validator::make(
			$request->all(),
			[
				'title' => ['required', 'regex:/^[\w \']{1,255}$/'],
				'body' => ['required', 'string'],
				'image' => ['image', 'nullable']
			],
			[
				'regex' => 'The title must be alphanumeric'
			],
			[
				'body' => 'content of the body'
			]
		)->validate();

		if ($request->hasFile('image')) {
			$storeName = storeImage($request->file('image'), 'public/cover_images/');
		} else {
			$storeName = 'noimage.png';
		}

		$post = new Post();
		$post->title = $request->input('title');
		$post->body = $request->input('body');
		$post->user_id = auth()->id();
		$post->image = $storeName;
		$post->save();

		return redirect()->route('posts.index')->with('success', 'Post created successfully.');
	}

	public function edit($id) {
		try {
			$post = Post::findOrFail($id);
			return view('posts.edit', [
				'post' => $post
			]);
		} catch (ModelNotFoundException $exception) {
			return redirect()->route('posts.index')->with('error', 'There is no post have id ' . $id);
		}
	}

	public function update(Request $request, $id) {
		try {
			$post = Post::findOrFail($id);

			Validator::make(
				$request->all(),
				[
					'title' => ['required', 'regex:/^[\w \']{1,255}$/'],
					'body' => ['required', 'string'],
					'image' => ['image', 'nullable']
				]
			)->validate();

			if ($request->hasFile('image')) {
				$storeName = storeImage($request->file('image'), 'public/cover_images/');
				deleteImage($post->image);
				$post->image = $storeName;
			}

			$post->title = $request->input('title');
			$post->body = $request->input('body');
			$post->save();
			return redirect()->route('posts.index')->with('success', 'Updated post successfully');
		} catch (ModelNotFoundException $exception) {
			return redirect()->route('posts.index')->with('error', 'Post id ' . $id . ' not found');
		}
	}

	public function delete($id) {
		try {
			$post = Post::findOrFail($id);

			if ($post->image != 'noimage.png') {
				deleteImage($post->image);
			}

			$post->delete();
			return redirect()->route('posts.index')->with('success', 'Deleted post successfully');
		} catch (ModelNotFoundException $exception) {
			return back()->with('error', 'You do not have such a post');
		} catch (Exception $e) {
			return back()->with('error', 'Failed to delete (unknown error)');
		}
	}
}
