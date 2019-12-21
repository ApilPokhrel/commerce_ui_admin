function imgPreview(url) {
  return `<button class="exitfile" id="exitfile" >&#10008;</button><img src="${url}" style="height: 210px; width:202px; margin-top: 5px;
 margin-left: -10px;">`;
}

function vidPreview(url) {
  return `<button class="exitfile" id="exitfile">&#10008;</button><video id="vid" style="height: 210px; width:202px; margin-top: 5px;
 margin-left: -10px;" controls>
 <source src="${url}" id="video_here">
 Your browser does not support HTML5 video.
 </video>`;
}

let FileHandler = {
  file: "",
  html: "",
  previewDiv: {},
  finput: "",
  vid: "vid",

  preview: function() {
    var prev = document.getElementById(this.previewDiv);
    prev.innerHTML = "";
    var reader;
    var html;
    if (this.file.files && this.file.files.length) {
      for (let f of this.file.files) {
        var context = f.type;
        var str = context.split("/");
        if (str[0] === "image") {
          reader = new FileReader();
          reader.onload = function(e) {
            prev.style.display = "block";
            html = imgPreview(e.target.result);
            prev.innerHTML += html;
            document.getElementById("exitfile").addEventListener("click", () => {
              FileHandler.close();
            });
          };
          reader.readAsDataURL(f);
        } else if (str[0] === "video") {
          prev.style.display = "block";
          html = vidPreview(URL.createObjectURL(f));
          prev.innerHTML += html;
          document.getElementById("exitfile").addEventListener("click", () => {
            FileHandler.close();
          });
          this.vid = document.getElementById("vid");
          return;
        } else {
          return;
        }
      }
    }
  },

  close: function() {
    let vidd = document.getElementById(this.vid);
    var prev = document.getElementById(this.previewDiv);
    this.finput.value = null;
    if (vidd != null) {
      vidd.autoplay = false;
      vidd.load();
    }
    prev.style.display = "none";
  }
};

export default FileHandler;
