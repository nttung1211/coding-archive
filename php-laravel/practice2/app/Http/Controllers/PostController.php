<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Redirect;
use Storage;
use Validator;

class PostController extends Controller {
  public function index() {
    $posts = Post::all();
    return view('posts.index', [
      'posts' => $posts
    ]);
  }

  public function create() {
    return view('posts.create');
  }

  public function store(Request $request) {
    //  VALIDATE
		Validator::make(
			$request->all(),
			[
				'title' => ['required', 'regex:/^[\w \']{4,100}$/'],
				'image' => ['image', 'nullable']
			],
			[
				'title.regex' => ':attribute need to be more than 4 alphanumeric characters'
			]
    )->validate();
    
    // STORE IMAGE
    if ($request->hasFile('image')) {
      $img_url = storeImage($request->file('image'), 'public/images');
      if (!$img_url) {
        throw new Exception('Failed to store image');
      }
    } else {
      $img_url = 'public/images/noImage.png';
    }


    // PUSH DATA TO DATABASE
    $post = new Post();
    $post->title = $request->input('title');
    $post->img_url = $img_url;
    $post->user_id = auth()->id();
    $post->save();

    return redirect()->route('posts.index')->with('success', 'Added post');
  }

  public function delete(string $id) {
    try {
      $post = Post::findOrFail($id);
      
      if ($post->img_url !== 'public/images/noImage.png') {
        Storage::disk(env('STORAGE'))->delete($post->img_url);
      }

      $post->delete();
      return redirect()->route('posts.index')->with('success', 'Post deleted');
    } catch (Exception $e) {
      return redirect()->route('posts.index')->with('error', $e->getMessage());
    }
  }
}
