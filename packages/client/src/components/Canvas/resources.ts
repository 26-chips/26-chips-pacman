export function loadImage(url: string) {
  return new Promise(fulfill => {
    const imageObj = new Image();
    imageObj.onload = () => fulfill(imageObj);
    imageObj.src = url;
  });
}
