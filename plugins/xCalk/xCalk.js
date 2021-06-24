function xCalk(params) {
    let argDefault = {
        el: '',
        theme: 'xCalkDark',
    }
    const ax = {
        arg: Object.assign(argDefault, params),
        elHistory: null,
        elHistoryBox: null,
        elDisplay: null,
        elCount: null,
        elAutoSum: 0,
        display: "",
        ultimoValor: "",
        op: "",
        soma: 0,
        controle: false,
        quantidade: 0,
        main() {
            let main = document.createElement('div')
            let div
            if (this.arg.el)
                div = document.querySelector(this.arg.el)
            else
                div = document.createElement('div')

            div.setAttribute('tabindex', '1')

            div.classList.add('xCalk', this.arg.theme)

            this.elHistory = document.createElement('div')
            this.elHistory.classList.add('xCalkHistory')
            div.appendChild(this.elHistory)

            div.appendChild(this.setResult())

            div.appendChild(this.setButtons())

            div.addEventListener('keydown', this.keyDown)

            div.addEventListener('focusin', () => {
                div.style.opacity = 1
            })
            div.addEventListener('focusout', () => {
                div.style.opacity = .85
            })

            if (this.arg.el == '')
                document.body.prepend(div)

        },
        setResult() {
            let div = document.createElement('div')
            div.classList.add('xCalkResult')
            this.elDisplay = document.createElement('span')
            this.elDisplay.innerHTML = '0,00'
            div.appendChild(this.elDisplay)

            let span = document.createElement('span')
            span.innerHTML = 'Quantidade de Itens'
            div.appendChild(span)

            this.elCount = document.createElement('label')
            this.elCount.innerHTML = '0'
            div.appendChild(this.elCount)

            this.elAutoSum = document.createElement('span')
            this.elAutoSum.innerHTML = ''
            this.elAutoSum.classList.add('xCalkAutoSum')
            div.appendChild(this.elAutoSum)

            return div
        },
        setButtons() {
            let div = document.createElement('div')
            div.classList.add('xCalkButtons')
            let btns = ['AC', '«', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '', '0', ',', '=']
            let classs = ['ax', 'ax', 'ax', 'op', 'num', 'num', 'num', 'op', 'num', 'num', 'num', 'op', 'num', 'num', 'num', 'op', 'ax', 'num', 'ax', 'like']

            for (let i in btns) {
                let btn = document.createElement('div')
                btn.classList.add(classs[i])
                btn.innerHTML = btns[i]

                if (btns[i] == '%')
                    btn.addEventListener('click', this.percento)
                else if (btns[i] == '«')
                    btn.addEventListener('click', ax.backSpace)
                else if (btns[i] == 'AC')
                    btn.addEventListener('click', this.clearAll)
                else
                    switch (classs[i]) {
                        case 'op':
                            btn.addEventListener('click', this.operadorClick)
                            break;
                        case 'like':
                            btn.addEventListener('click', this.igual)
                            break;

                        default:
                            btn.addEventListener('click', this.clickBtn)
                            break;
                    }
                div.appendChild(btn)
            }
            return div
        },
        formatValor(num) {
            if (num == "") return "";

            let x = 0;
            if (num < 0) {
                num = Math.abs(num);
                x = 1;
            }
            if (isNaN(num)) num = "0";
            let cents = Math.floor((num * 100 + 0.5) % 100);
            num = Math.floor((num * 100 + 0.5) / 100).toString();
            if (cents < 10) cents = "0" + cents;
            for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num =
                num.substring(0, num.length - (4 * i + 3)) +
                "." +
                num.substring(num.length - (4 * i + 3));
            let ret = num + "," + cents;
            if (x == 1) ret = " - " + ret;
            return ret;
        },
        keyDown(e) {
            let CharKey = String.fromCharCode(e.keyCode);
            if (e.keyCode > 47 && e.keyCode < 58 && !e.shiftKey)
                ax.valorCalc(CharKey);
            let mozila = e.keyCode;
            let chrome = e.keyCode;
            if (chrome === 189 || mozila === 173 || e.keyCode === 109)
                ax.operador("-");
            if ((chrome === 187 && e.shiftKey) || (mozila === 61 && e.shiftKey) || e.keyCode === 107)
                ax.operador("+");
            if ((e.keyCode === 56 && e.shiftKey) || e.keyCode === 106)
                ax.operador("x");
            if (e.keyCode === 191 || e.keyCode === 111) ax.operador("÷");
            if (e.keyCode === 13) ax.igual();
            if (e.keyCode === 39) ax.percento();
            if (e.keyCode === 96) ax.valorCalc("0");
            if (e.keyCode === 97) ax.valorCalc("1");
            if (e.keyCode === 98) ax.valorCalc("2");
            if (e.keyCode === 99) ax.valorCalc("3");
            if (e.keyCode === 100) ax.valorCalc("4");
            if (e.keyCode === 101) ax.valorCalc("5");
            if (e.keyCode === 102) ax.valorCalc("6");
            if (e.keyCode === 103) ax.valorCalc("7");
            if (e.keyCode === 104) ax.valorCalc("8");
            if (e.keyCode === 105) ax.valorCalc("9");
            if (
                e.keyCode === 110 ||
                e.keyCode === 108 ||
                e.keyCode === 188 ||
                e.keyCode === 190
            )
                ax.valorCalc(",");
            if (e.keyCode === 8) ax.backSpace(e);
            if (e.keyCode === 67) ax.clearAll();
            // if (e.keyCode === 40) _cal("P");
        },
        operador(value) {
            if (this.soma == 0)
                this.setHistory('', this.ultimoValor)
            else
                this.setHistory(value, this.ultimoValor)

            this.calcular();

            ax.op = value;
            ax.controle = true;
        },
        operadorClick(e) {
            ax.operador(e.target.innerText);
        },
        calcular() {
            this.quantidade++;
            this.elCount.innerHTML = this.quantidade
            if (this.soma != 0) {
                switch (this.op) {
                    case "+":
                        this.soma += parseFloat(this.ultimoValor);
                        break;
                    case "-":
                        this.soma -= parseFloat(this.ultimoValor);
                        break;
                    case "x":
                        this.soma *= parseFloat(this.ultimoValor);
                        break;
                    case "÷":
                        this.soma /= parseFloat(this.ultimoValor);
                        break;
                }
                this.display = this.soma;
                this.elDisplay.innerHTML = this.formatValor(this.display)

            } else
                this.soma = parseFloat(this.ultimoValor);

            setTimeout(() => {
                this.elHistory.scrollBy(0, 9999999999);
            }, 50);
        },
        percento() {
            if (ax.op === "x")
                ax.soma = (parseFloat(ax.soma) * parseFloat(ax.ultimoValor)) / 100;

            if (ax.op === "+")
                ax.soma = (parseFloat(ax.soma) * parseFloat(ax.display)) / 100 + parseFloat(ax.soma);

            if (ax.op === "-")
                ax.soma = parseFloat(ax.soma) - (parseFloat(ax.soma) * parseFloat(ax.display)) / 100;

            if (ax.op === "÷")
                ax.soma = (parseFloat(ax.soma) * parseFloat(ax.display)) / 100 / parseFloat(ax.soma);

            ax.setHistory(ax.op + ' %', ax.ultimoValor)
            ax.setHistory('=%', ax.soma)

            ax.display = ax.soma;
            ax.elDisplay.innerHTML = ax.formatValor(ax.display)

            setTimeout(() => {
                ax.elHistory.scrollBy(0, 9999999999);
            }, 50);

            ax.clear();
        },
        igual() {
            ax.setHistory(ax.op, ax.display)
            ax.calcular();
            // ax.setHistory('=', ax.soma)
            ax.setHistory('=' + ax.quantidade, ax.soma)
                // ax.setHistory('Qto ' + ax.quantidade + " ===============", '')
                // ax.setHistory('QTO', ax.quantidade)
            ax.display = ax.soma;
            ax.elDisplay.innerHTML = ax.formatValor(ax.display)
            ax.ultimoValor = ax.soma;
            ax.clear();
        },
        clickBtn(e) {
            ax.valorCalc(e.target.innerText);
        },
        valorCalc(num) {
            if (this.controle) {
                this.display = "";
                this.elDisplay.innerHTML = ''
                this.ultimoValor = "";
                this.controle = false;
            }

            if (num == ",") num = this.display.indexOf(".") == -1 ? "." : "";
            this.display += num;
            this.elDisplay.innerHTML = this.formatValor(this.display)
            this.ultimoValor += num;
            this.autoSum()

        },
        backSpace(e) {
            let str = ax.display.toString();
            str = str.substring(0, str.length - 1);
            let ult = str.substring(str.length - 1, str.length);
            if (ult == ".") str = str.substring(0, str.length - 1);

            ax.display = str;
            ax.elDisplay.innerHTML = ax.formatValor(ax.display)
            ax.ultimoValor = str;

            if (ax.display == '')
                ax.elDisplay.innerHTML = '0,00'

            ax.autoSum()

            e.stopPropagation
            e.preventDefault
        },
        autoSum() {
            if (this.soma != 0) {
                let ex = (this.soma + this.op + this.display).toString().replace('x', '*').replace('÷', '/')
                this.elAutoSum.innerHTML = this.formatValor(eval(ex))
            }
        },
        clear() {
            this.op = "";
            this.soma = 0;
            this.controle = true;
            this.quantidade = 0;
            this.elCount.innerHTML = 0
            ax.elAutoSum.innerHTML = ''
        },
        clearAll() {
            ax.clear();
            ax.elHistory.innerHTML = ''
            ax.display = "";
            ax.elDisplay.innerHTML = '0,00'

        },
        setHistory(op, value) {
            let div = document.createElement('div')
            let labelOp = document.createElement('label')
            let labelSum = document.createElement('label')
            let span = document.createElement('span')
            labelOp.classList.add('xCalkLabelOp')
            labelSum.classList.add('xCalkLabelAutoSum')

            if (this.soma == 0) {
                this.elHistoryBox = document.createElement('div')
                this.elHistoryBox.classList.add('xCalkHistoryBox')
                this.elHistory.appendChild(this.elHistoryBox)
            }

            if (op.substr(0, 1) == '=') {
                span.innerHTML = this.formatValor(value)
                span.style.borderTop = '1px solid #697380'
                span.style.fontSize = '1.2em'
                labelOp.innerHTML = op.substr(1)
                labelOp.style.float = 'left'
                labelOp.style.padding = '5px 10px'
            } else {
                labelOp.innerHTML = op
                labelSum.innerHTML = this.elAutoSum.innerHTML
                span.innerHTML = this.formatValor(value)
            }

            div.appendChild(labelSum)
            div.appendChild(labelOp)
            div.appendChild(span)
            this.elHistoryBox.appendChild(div)
        }
    }
    ax.main()
}


function xCalkModal(params) {

    let pnCalk = document.createElement('div')
    let divCalk = document.createElement('div')
    pnCalk.setAttribute('id', 'pnCalk')
    divCalk.setAttribute('id', 'calk')
    pnCalk.appendChild(divCalk)
    document.body.prepend(pnCalk);
    let argDefault = {
        themeModal: 'xModal-bublue',
        themeCalk: 'xCalkBlue',
        height: 535,
        width: 230,
        modal: false,
        left: 0,
        top: 0,
    }

    let arg = Object.assign(argDefault, params)

    new xCalk({
        el: '#calk'
    })

    const pnCalculator = new xModal.create({
        el: '#pnCalk',
        theme: 'xModal-bublue',
        title: 'Calculadora',
        height: 535,
        width: 240,
        modal: false,
        left: 0,
        top: 0,
        onOpen: () => {
            document.querySelector('.xCalk').focus()
        }
    })

    document.querySelector('#pnCalk').querySelector('.xModal-modal-head').addEventListener('click', () => {
        document.querySelector('.xCalk').focus()
    })

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 115) {
            pnCalculator.open()
            e.stopPropagation
            e.preventDefault
        }
    })

    return {
        open: pnCalculator.open
    }
}