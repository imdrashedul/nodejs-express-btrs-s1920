var fileInput = null,
    imagePreview = null,
    namePreview = null,
    clearInput = null,
    browseBtn = null;
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.file-input>input[type="file"]').forEach(function (inputField) {

        document.querySelector('img.upload-preview.'+inputField.id).addEventListener('click', function (e) {
            inputField.click();
        });

        inputField.addEventListener('click', function (e) {
            fileInput = this;
            imagePreview = document.querySelector('img.upload-preview.'+this.id);
            namePreview = document.querySelector('input.upload-name.'+this.id);
            clearInput = document.querySelector('button.file-clear.'+this.id);
            browseBtn = document.querySelector('label.file-input.'+this.id);
        });

        inputField.addEventListener('change', function (e) {
            fileHandler(this);
        });

    });
});