export default File = {
  file: "",
  html: "",
  previewDiv: {},
  finput: "",
  vid: document.getElementById("vid"),
  imgPreview: function(url) {
    return `<button class="exitfile">&#10008;</button><img src="${url}" style="height: 210px; width:202px; margin-top: 5px;
   margin-left: -10px;">`;
  },

  vidPreview: function(url) {
    return `<button class="exitfile">&#10008;</button><video id="vid" style="height: 210px; width:202px; margin-top: 5px;
   margin-left: -10px;" controls>
   <source src="${url}" id="video_here">
   Your browser does not support HTML5 video.
   </video>`;
  },

  preview: function() {
    console.log("==============preview=============", this.previewDiv);
    var reader;
    var html;
    if (this.file.files && this.file.files.length) {
      for (let f of this.file.files) {
        var context = f.type;
        var str = context.split("/");
        if (str[0] === "image") {
          reader = new FileReader();
          reader.onload = function(e) {
            document.getElementById(this.previewDiv).style.display = "block";
            html = this.imgPreview(e.target.result);

            document.getElementById(this.previewDiv).innerHTML = html;
          };

          reader.readAsDataURL(f);
        } else if (str[0] === "video") {
          document.getElementById(this.previewDiv).style.display = "block";
          html = this.vidPreview(URL.createObjectURL(f));
          document.getElementById(this.previewDiv).innerHTML = html;
          return;
        } else {
          return;
        }
      }
    }
  },

  close() {
    this.finput.value = null;
    this.vid.autoplay = false;
    this.vid.load();
    this.previewDiv.style.display = "none";
  }
};
