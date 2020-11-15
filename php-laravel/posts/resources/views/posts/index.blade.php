@extends('layouts.app')

@section('content')
	@if(session('success'))
		<div class='alert alert-success'>{{ session('success') }}</div>
	@endif

	@if(session('error'))
		<div class='alert alert-danger'>{{ session('error') }}</div>
	@endif
	<a href='{{ route('posts.create') }}' class='btn btn-success mb-3'>Add post</a>
	<div class='row'>
		<div class='col-lg-12'>
			<ul class="list-group shadow-small">
				@empty($posts)
					<h2>You do not have any post</h2>
				@endempty

				@foreach($posts as $post)
				<li class="list-group-item position-relative text-muted">
					<div class="media align-items-lg-center flex-column flex-lg-row p-3">
						<div class="media-body order-2 order-lg-1">
							<h2 class="mt-0 font-weight-bold mb-2 text-uppercase">{{ $post->title }}</h2>
							<p class="mb-0">{{ $post->body }}</p>
							<hr>
							<small>Created at: {{ $post->created_at }}</small> |
							<small>Last modified: {{ $post->updated_at }}</small>
						</div>
						<img src="{{ $post->image }}"
								 alt="Generic placeholder image" class="ml-lg-5 order-1 order-lg-2 thumbnail">
					</div>
					<a href='{{ route('posts.show', $post->id) }}' class='stretched-link'></a>
				</li>
				@endforeach
			</ul>
		</div>
	</div>

	<div class='mt-3'>{{ $posts->links() }}</div>
@endsection

