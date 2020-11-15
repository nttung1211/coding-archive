<?php

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

function storeImage($file ,$savePath, $thumbWidth = 100, $thumbHeight = 100) {
	// prepare image name
	$fileNameWithExt = $file->getClientOriginalName();
	$fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
	$extension = pathinfo($fileNameWithExt, PATHINFO_EXTENSION);
	$storeName = $fileName . '_' . uniqid() . '.' . $extension;
	// prepare thumbnail name
	$thumbName = 'thumb_' . $storeName;
	// create thumbnail
	$thumb = Image::make($file->getRealPath())->resize($thumbWidth, $thumbHeight)->stream();
	// save thumbnail and image
	Storage::disk(env('STORAGE_MODE'))->putFileAs($savePath, $file, $storeName);
	Storage::disk(env('STORAGE_MODE'))->put($savePath . $thumbName, $thumb->__toString());
//	if (env('STORAGE_MODE') === 's3') {
//		$file->storeAs($savePath, $storeName, 's3');
//		Storage::disk('s3')->put($savePath . $thumbName, $thumb->__toString());
//	} else {
//		$file->storeAs($savePath, $storeName);
//		Storage::put($savePath . $thumbName, $thumb->__toString()); // this method will save file into the storage/root (the root here is 'app' as it is specified in the filesystems.php in 'local' driver
//	}

	return $storeName;
}


function getImageUrl($imageName, $path) {
	return Storage::disk(env('STORAGE_MODE'))->url($path . $imageName);
// this method will add 'storage/' before the $path and remove 'public' if it's present in the $path. This method retrieve path form the public (production) folder
}

function deleteImage($imageName) {
	Storage::disk(env('STORAGE_MODE'))->delete('public/cover_images/' . $imageName);
	Storage::disk(env('STORAGE_MODE'))->delete('public/cover_images/thumb_' . $imageName);
}

// * since the symbolic link form "storage" point to "app/public" (specified at the end of file filesystems.php), we need to pass a path which include "public". Later time let us try remove it and modify the symbolic link
