@extends('layouts.app')

@section('content')
	<form action='{{ route('posts.store') }}' method='post' enctype='multipart/form-data'>
		@csrf
		<div class="form-group">
			<label for="title">Title</label>
			<input type="text" class="form-control" id="title" name='title' value='{{ old('title') }}'>
		</div>
		@error('title')
		<div class="alert alert-danger">
			{{ $message }}
		</div>
		@enderror

		<div class="form-group">
			<label for="body">Body</label>
			<textarea class="form-control" id="body" rows="3" name='body'>{{ old('body') }}</textarea>
		</div>
		@error('body')
		<div class="alert alert-danger">
			{{ $message }}
		</div>
		@enderror

		<div class="form-group">
			<label for="exampleFormControlFile1">Cover image</label>
			<input type="file" class="form-control-file" id="exampleFormControlFile1" name='image'>
		</div>
		@error('image')
		<div class="alert alert-danger">
			{{ $message }}
		</div>
		@enderror

		<button class='btn btn-success px-5 my-4'>Post</button>
	</form>
@endsection
