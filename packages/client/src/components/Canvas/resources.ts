class ResourcesHandler {
  private resourceCache: { [key: string]: HTMLImageElement | boolean } = {};

  //private loading: string[] = [];

  private readyCallbacks: (() => void)[] = [];

  public load(urlOrArr: string | string[]) {
    if (Array.isArray(urlOrArr)) {
      urlOrArr.forEach(url => {
        this._load(url);
      });
    } else {
      this._load(urlOrArr);
    }
  }

  private _load(url: string) {
    if (this.resourceCache[url]) {
      return this.resourceCache[url];
    } else {
      const img = new Image();
      img.onload = () => {
        this.resourceCache[url] = img;
        if (this.isReady()) {
          this.readyCallbacks.forEach(func => {
            func();
          });
        }
      };
      this.resourceCache[url] = false;
      img.src = url;
    }
  }

  public get(url: string) {
    return this.resourceCache[url] as HTMLImageElement;
  }

  public isReady() {
    let ready = true;
    for (const k in this.resourceCache) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.resourceCache.hasOwnProperty(k) && !this.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  public onReady(func: () => void) {
    this.readyCallbacks.push(func);
  }
}

export const resourcesHandler = new ResourcesHandler();
