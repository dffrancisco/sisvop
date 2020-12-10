
const show = function (arg) {

    let argDefault = {
        msg: '',
        title: 'Mensagem do Sistema',
        theme: 'xModal-bublue',
        onClose: false
    }

    if (typeof arg == 'string')
        argDefault.msg = arg;

    arg = Object.assign(argDefault, arg);

    let id = 'pnMsg' + Math.floor(Math.random() * 9999);
    let body = document.querySelector('body')
    let div = document.createElement('div')
    div.setAttribute('id', id)
    div.innerHTML = `<div style="text-align: center; font-weight: bold;">${arg.msg}</div>`

    body.append(div)

    let modal = new xModal.create({
        el: "#" + id,
        theme: arg.theme,
        title: arg.title,
        width: 600,
        height: 190,
        onClose: function () {
            arg.onClose && arg.onClose()
            modal.destroy()
            document.querySelector('#' + id).remove()
        },
        onOpen: function () {
            modal.btnFocus('OK')
        },
        buttons: {
            OK: {
                html: 'OK',
                click: () => {
                    modal.close();
                }
            }
        }
    })

    modal.open()

}

const confirmaCodigo = function (arg) {

    let argDefault = {
        msg: '',
        title: 'Mensagem do Sistema',
        theme: 'xModal-bublue',
        onClose: false,
        call: false,
        cancel: false
    }

    arg = Object.assign(argDefault, arg);
    let numero = Math.floor(Math.random() * 999999);

    let id = 'pnConKey' + Math.floor(Math.random() * 9999);
    let body = document.querySelector('body')
    let div = document.createElement('div')
    div.setAttribute('id', id)
    div.innerHTML = `<div style="text-align: center; font-weight: bold;">${arg.msg}</div>
    <div id="pnCodigoNumero" style="margin: auto;
                                    border-radius: 6px;
                                    text-align: center;
                                    font-weight: bold;
                                    border: 1px solid #00000036;
                                    background: #00000024;
                                    padding: 6px 6px;
                                    width: 176px;">${numero}</div>
    <div style="text-align: center; margin-top:5px;">
        <input type="text" style="border-left: 2px solid red; text-align: center;" id="edtCodigoConf"/>
    </div>`

    body.append(div)

    let codigo = document.querySelector('#edtCodigoConf')
    let eventKeydown = (e) => {
        if (e.keyCode == 13)
            modal.btnFocus('OK')
    }
    codigo.addEventListener('keydown', eventKeydown)

    let modal = new xModal.create({
        el: "#" + id,
        theme: arg.theme,
        title: arg.title,
        width: 500,
        height: 230,
        onClose: function () {
            arg.onClose && arg.onClose()
            modal.destroy()
            document.querySelector('#' + id).remove()

            codigo.removeEventListener('keydown', eventKeydown)
        },
        onOpen: function () {
            codigo.focus()
        },
        buttons: {
            OK: {
                html: 'OK',
                click: () => {
                    if (parseInt(codigo.value) !== parseInt(numero)) {
                        show({
                            msg: 'Código Inválido',
                            onClose: () => { codigo.select() }
                        })
                    } else {
                        arg.call && arg.call()
                        modal.close();
                    }
                }
            },
            cancelar: {
                html: 'Cancelar',
                click: () => {
                    arg.cancel && arg.cancel()
                    modal.close();
                }
            }
        }
    })

    modal.open()

};

const confirma = function (arg) {

    let argDefault = {
        msg: '',
        title: 'Mensagem do Sistema',
        theme: 'xModal-bublue',
        onClose: false,
        call: false,
        cancel: false
    }

    arg = Object.assign(argDefault, arg);

    let id = 'pnCon' + Math.floor(Math.random() * 9999);
    let body = document.querySelector('body')
    let div = document.createElement('div')
    div.setAttribute('id', id)
    div.innerHTML = `<div style="text-align: center; font-weight: bold;">${arg.msg}</div>`

    body.append(div)


    let modal = new xModal.create({
        el: "#" + id,
        theme: arg.theme,
        title: arg.title,
        width: 500,
        height: 200,
        onClose: function () {
            arg.onClose && arg.onClose()
            modal.destroy()
            document.querySelector('#' + id).remove()
        },
        onOpen: function () {
            modal.btnFocus('cancelar')
        },
        buttons: {
            OK: {
                html: 'OK',
                click: () => {
                    arg.call && arg.call()
                    modal.close();
                }
            },
            cancelar: {
                html: 'Cancelar',
                click: () => {
                    arg.cancel && arg.cancel()
                    modal.close();
                }
            }
        }
    })

    modal.open()

};

let pnAguarde = null;
const aguarde = function (arg) {

    let argDefault = {
        msg: '',
        title: 'Mensagem do Sistema',
        theme: 'xModal-bublue',
    }

    if (typeof arg == 'string') {
        if (arg.toUpperCase() === 'CLOSE')
            pnAguarde.close()
        return false;
    }

    arg = Object.assign(argDefault, arg);
    let id = 'pnAguarde'
    let body = document.querySelector('body')
    let div = document.createElement('div')
    div.setAttribute('id', id)
    div.innerHTML = `<div style="text-align: center; font-weight: bold;">${arg.msg}</div>
                        <div style="text-align: center; font-weight: bold;">
                            <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="font-size=15px;"></i>
                        </div>`

    body.append(div)

    // if (pnAguarde == null)
    pnAguarde = new xModal.create({
        el: "#" + id,
        theme: arg.theme,
        title: arg.title,
        closeBtn: false,
        esc: false,
        width: 300,
        height: 130,
        onClose: function () {
            pnAguarde.destroy()
            document.querySelector('#' + id).remove()
        }
    })

    pnAguarde.open()


}
