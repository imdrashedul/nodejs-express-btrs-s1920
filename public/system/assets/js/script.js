function fileHandler(input) {
    if(input.files && input.files[0])
    {
        var reader = new FileReader(),
            file = input.files[0];

        reader.onload = function (e) {
            namePreview.value = file.name;
            imagePreview.src = e.target.result;
            clearInput.addEventListener('click', clearHandler);
            clearInput.style.display = 'inline-block';
            browseBtn.style.width = '59%';
        };

        reader.readAsDataURL(file);
    }
    else clearHandler(false);
}

function clearHandler(e) {

    fileInput = document.getElementById(this.getAttribute('filetarget'));
    imagePreview = document.querySelector('img.upload-preview.'+this.getAttribute('filetarget'));
    namePreview = document.querySelector('input.upload-name.'+this.getAttribute('filetarget'));
    clearInput = document.querySelector('button.file-clear.'+this.getAttribute('filetarget'));
    browseBtn = document.querySelector('label.file-input.'+this.getAttribute('filetarget'));

    fileInput.value = '';
    namePreview.value = '';
    imagePreview.src = imagePreview.getAttribute('defaultpreview');
    this.style.display = 'none';
    browseBtn.style.width = '100%';
    if(e)
    {
        clearInput.removeEventListener('click', clearHandler);
    }

}

function getCounters(select, data)
{
    data = data || {};
    data['context'] = 'getCounters';

    sendXhr(data, function(response){
        if(response.status==true) {
            if(response.message && response.message!=null) {
                select.innerHTML = response.message;
            } else {
                alert('Couldn\'t Fetch Response')
            }
        } else if(response.message && response.message!=null) {
            alert(response.message);
        } else {
            alert('Couldn\'t Fetch Response')
        }

        if(select.hasAttribute('loadingLocker')) {
            select.removeAttribute('loadingLocker');
        }

    }, function (data) {
        if(!data.elem.hasAttribute('loadingLocker')) {
            data.elem.innerHTML = '<option value="">Loading...</option>';
            data.elem.setAttribute('loadingLocker', '');
        }
    }, function (data) {
        if(data.elem.hasAttribute('loadingLocker')) {
            data.elem.removeAttribute('loadingLocker');
            data.elem.innerHTML = data.innerHTML;
        }
    }, {elem:select}, {elem: select, innerHTML: select.innerHTML});
}

function getBuses(select, data)
{
    data = data || {};
    data['context'] = 'getBuses';

    sendXhr(data, function(response){
        if(response.status==true) {
            if(response.message && response.message!=null) {
                select.innerHTML = response.message;
            } else {
                alert('Couldn\'t Fetch Response')
            }
        } else if(response.message && response.message!=null) {
            alert(response.message);
        } else {
            alert('Couldn\'t Fetch Response')
        }

        if(select.hasAttribute('loadingLocker')) {
            select.removeAttribute('loadingLocker');
        }

    }, function (data) {
        if(!data.elem.hasAttribute('loadingLocker')) {
            data.elem.innerHTML = '<option value="">Loading...</option>';
            data.elem.setAttribute('loadingLocker', '');
        }
    }, function (data) {
        if(data.elem.hasAttribute('loadingLocker')) {
            data.elem.removeAttribute('loadingLocker');
            data.elem.innerHTML = data.innerHTML;
        }
    }, {elem:select}, {elem: select, innerHTML: select.innerHTML});
}