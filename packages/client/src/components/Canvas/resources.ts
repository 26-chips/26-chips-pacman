export function loadImage(url: string) {
  return new Promise(fulfill => {
    console.log(url);
    const imageObj = new Image();
    imageObj.onload = () => fulfill(imageObj);
    imageObj.src = url;
  });
}
