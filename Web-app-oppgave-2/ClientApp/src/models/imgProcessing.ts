export class ImageProcessing{
  constructor(private imgBytes:string,
              private imageURL:string) {}

  private set setImgBytes(bytes: string){
    this.imgBytes = bytes;
  }


  public set setImageURL(url:string){
    this.imageURL = url;
  }

  imageToByte(input:HTMLInputElement):string{
    if(input.files && input.files[0]){
      let reader = new FileReader();
      reader.onload = (e)=>{
        if(e!==null)
          { // @ts-ignore usikker!!
            this.setImgBytes(e.target.result);
          }
        }
        //reader.readAsDataURL(input.files[0]);
      }
    return this.imgBytes;
  }

}
