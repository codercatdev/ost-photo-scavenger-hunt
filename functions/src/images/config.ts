export default {
  bucket: 'ost-photo-scavenger-hunt.appspot.com',
  cacheControlHeader: process.env.CACHE_CONTROL_HEADER,
  imageSizes: '800x800'.split(","),
  resizedImagesPath: process.env.RESIZED_IMAGES_PATH,
  deleteOriginalFile: process.env.DELETE_ORIGINAL_FILE === "true",
};
