@extends('layouts.app')

@section('content')
	<div class='row'>
		<div class='col-lg-12'>
			<ul class="list-group shadow-small">
				@foreach($posts as $post)
					<li class="list-group-item position-relative text-muted">
						<div class="media align-items-lg-center flex-column flex-lg-row p-3">
							<div class="media-body order-2 order-lg-1">
								<h2 class="mt-0 font-weight-bold mb-2 text-uppercase">{{ $post->title }}</h2>
								<p class="mb-0">{{ $post->body }}</p>
								<hr>
								<small>{{ $post->created_at->format('M j, Y') }}</small> |
								<small>By: {{ $post->username }}</small>
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

	<div class='mt-3'>
		{{ $posts->links() }}
	</div>
@endsection
