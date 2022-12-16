const uploadbox = document.querySelector('.uploadbox'),
    previewImg = uploadbox.querySelector('img'),
    widthInput = document.querySelector('.width input'),
    heightInput = document.querySelector('.height input'),
    ratioInput = document.querySelector('.ratio input'),
    qualityInput = document.querySelector('.quality input'),
    downloadBtn = document.querySelector('button'),
    fileInput = uploadbox.querySelector('input');

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
        document.querySelector('.wrapper').classList.add('active');
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    })
}

widthInput.addEventListener('keyup', () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', () => {
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDownload = () => {
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    const imgQuality = qualityInput.checked ? 0.7 : 1.0;
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)
    a.href = canvas.toDataURL('image/png', imgQuality)
    a.download = new Date().getTime();
    a.click()
}

downloadBtn.addEventListener('click', resizeAndDownload)
fileInput.addEventListener('change', loadFile)
uploadbox.addEventListener('click', () => fileInput.click())