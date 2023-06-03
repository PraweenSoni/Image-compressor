const img_box = document.querySelector('.img_box'),
previewimg = img_box.querySelector("img"),
fileInput = img_box.querySelector("input"),
widthinput = document.querySelector(".size #width"),
heightinput = document.querySelector(".size #height"),
radioinput = document.querySelector(".option  #resize"),
quality = document.querySelector(".option #reduce"),
downloadbtn = document.querySelector("#downloadbtn");
let ogimgratio;
const loadfile = (e) => {
 const file = e.target.files[0];
 if (!file) return;
 previewimg.src = URL.createObjectURL(file);
 previewimg.addEventListener("load",()=>{
  widthinput.value = previewimg.naturalWidth;
  heightinput.value = previewimg.naturalHeight;
  ogimgratio = previewimg.naturalWidth / previewimg.naturalHeight;
 });
}

widthinput.addEventListener("keyup",()=>{
 const height = radioinput.checked ? widthinput.value / ogimgratio : heightinput.value;
  heightinput.value = Math.floor(height);
})
heightinput.addEventListener("keyup",()=>{
 const width = radioinput.checked ? heightinput.value * ogimgratio : widthinput.value;
  widthinput.value = Math.floor(width);
})

const resizeAnddownload = ()=>{

 const canvas = document.createElement("canvas");
 const a = document.createElement("a");

 const ctx = canvas.getContext("2d");
 
 //also pass 0.1 : 1.0  for more reduce quality
 const imgQuality = quality.checked ? 0.7 : 1.0;
 
 canvas.width = widthinput.value;
 canvas.height = heightinput.value;
 
 ctx.drawImage(previewimg, 0, 0,canvas.width, canvas.height);
 //document.body.appendChild(canvas);
 a.href = canvas.toDataURL("image/jpeg", imgQuality);
 a.download = new Date().getTime();
 a.click();
}

downloadbtn.addEventListener("click", resizeAnddownload);

fileInput.addEventListener("click", loadfile);
img_box.addEventListener("click",()=>{
 fileInput.click();
})