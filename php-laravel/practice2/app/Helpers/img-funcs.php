<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

function storeImage(UploadedFile $file, String $path) {
	$newName = getNameAttachedId($file);
	$fullPathName = Storage::disk(env('STORAGE'))->putFileAs($path, $file, $newName);
	Storage::disk(env('STORAGE'))->setVisibility($fullPathName, 'public');
	return $fullPathName;
}

function storeImageWithThumb(UploadedFile $file, String $path, int $thumbWidth, int $thumbHeight) {
	$newName = getNameAttachedId($file);
	$fullPathName = Storage::disk(env('STORAGE'))->putFileAs($path, $file, $newName);
	Storage::disk(env('STORAGE'))->setVisibility($fullPathName, 'public');

	$thumbName = 'thumb_' . $newName;
	$thumb = Image::make($file->getRealPath())->resize($thumbWidth, $thumbHeight)->stream();
  $fullPathThumbName = $path . '/' . $thumbName;
  Storage::disk(env('STORAGE'))->put($fullPathThumbName, $thumb->__toString());
	Storage::disk(env('STORAGE'))->setVisibility($fullPathThumbName, 'public');

	return $fullPathName;
}

function getNameAttachedId($file) {
	$originalName = $file->getClientOriginalName();
	$nameWithoutExt = pathinfo($originalName, PATHINFO_FILENAME);
	$extension = pathinfo($originalName, PATHINFO_EXTENSION);
	return $nameWithoutExt . "_" . uniqid() . "." . $extension;
}


