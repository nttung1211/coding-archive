@extends('layouts.app')

@section('content')
	<div class='row'>
		<div class='col-lg-12 text-muted'>
			<h1 class='display-4 mb-4 text-capitalize post-title'>{{ $post->title }}</h1>
			<img src="{{ $post->image }}"
					 alt="Generic placeholder image" class="cover-image">
			<p class='post-body my-4'>{{ $post->body }}</p>

			@if(auth()->id() == $post->user_id)
			<div class='d-flex justify-content-between'>
				<a href='{{ route('posts.edit', $post->id) }}' class='btn btn-primary'>Edit</a>
				<form action='{{ route('posts.delete', $post->id) }}' method='post'>
					@csrf
					@method('delete')
					<button class='btn btn-danger'>Delete</button>
				</form>
			</div>
			@endif
		</div>
	</div>
@endsection
