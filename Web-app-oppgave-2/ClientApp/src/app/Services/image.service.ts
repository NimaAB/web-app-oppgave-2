import {Byte} from "@angular/compiler/src/util";

export class ImageService {
  result: string | null = null;

  getUrl(input: HTMLInputElement){
    if(input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (event) {
        if(event.target != null) {
          console.log('result', event.target.result);
        } else {
          console.log('no result');
        }
      }
    }
  }
}
