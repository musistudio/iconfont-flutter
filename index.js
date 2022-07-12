document.addEventListener('drop', e => e.preventDefault())
document.addEventListener('dragleave', e => e.preventDefault())
document.addEventListener('dragenter', e => e.preventDefault())
document.addEventListener('dragover', e => e.preventDefault())

document.getElementById('add-file_container').addEventListener('click', () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.addEventListener('change', e => {
        fileHandler(e.target.files[0])
    })
    input.click();
})
document.getElementById('add-file_container').addEventListener('drop', e => {
    fileHandler(e.dataTransfer.files[0])
})

const fileHandler = file => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        try {
            const data = JSON.parse(fileReader.result);
            generateDartCode(data.glyphs);
        } catch (e) {
            alert('请选择iconfont.json文件!')
        }
    };
    fileReader.readAsText(file);
}

function generateDartCode(iconList) {
    const code = `import 'package:flutter/widgets.dart';

class Iconfont {
    Iconfont._();

    static const _kFontFam = 'Iconfont';
    static const String? _kFontPkg = null;

    ${iconList.map(icon => `static const IconData icon_${icon.font_class} = IconData(0x${icon.unicode}, fontFamily: _kFontFam, fontPackage: _kFontPkg);`).join('\r\n    ')}
}`
    document.getElementById('code').innerHTML = code;
}