export default (function () {

    const versao = '2.0';

    function create(param, owner) {

        if (this)
            owner = this;

        var countItems = 0;
        var elContainerMenu = undefined; // essa variável serve para armazenar a refencia do container do menu após ter sido adicionado no body;
        var keyDown = {};

        const argDefault = {
            el: '',
            items: {},
            buttonLeft: false,
            disable: false,
            animate: undefined,
            onOpen: undefined,
            onCreate: undefined,
            parent: undefined,
            callClick: {}
        };

        // validarParams

        let arg = Object.assign(argDefault, param);

        arg.id = arg.el.replace(/[#. ]/g, '');

        let ax = {
            element: '',    // popup
            list: [],       // items do popup
            background: '',
            elList: {},

            createDivLeft(name, props) {
                let divLeft = document.createElement('div');

                let icon = document.createElement('i');
                if (props.icon !== undefined)
                    icon.classList = props.icon + ' icon';
                divLeft.appendChild(icon);

                if (props.checkbox && props.subMenu === undefined) {
                    let label = document.createElement('label');
                    label.classList.add('xMenuCheckLa');

                    let inputCheck = document.createElement('input');
                    inputCheck.setAttribute('type', 'checkbox');
                    inputCheck.setAttribute('id', 'sw' + name + countItems);

                    label.appendChild(inputCheck);
                    divLeft.appendChild(label);
                }

                return divLeft;
            },

            createDivCenter(name, props) {
                let divCenter = document.createElement('div');

                let html = document.createElement('span');
                html.innerHTML = props.html === undefined ? name : props.html;

                divCenter.appendChild(html);
                return divCenter;
            },

            createDivRight(name, props) {
                let divRight = document.createElement('div');
                let shortkey = document.createElement('span');

                if (props.shortkey !== undefined && props.subMenu === undefined) {
                    let [keyName, keyCode] = Object.entries(props.shortkey)[0];
                    shortkey.classList.add('short');
                    shortkey.innerHTML = keyName;
                    keyDown[String(keyCode).toUpperCase()] = props.click;
                }

                if (props.subMenu !== undefined) {
                    shortkey.innerText = '►';
                    shortkey.classList.add('short-submenu');
                }

                divRight.appendChild(shortkey);
                return divRight;
            },

            setMain(arg) {
                this.element = document.createElement('ul');
                this.element.setAttribute('id', 'xMenu_' + arg.id);
                this.element.classList = "xMenu hide";
                this.element.setAttribute('hidden', 'hidden');
                if (arg.buttonLeft)
                    this.element.classList.add("pop_up_btn_left");
            },

            setList(arg) {
                //loop que adiciona os items passados para o menu

                Object.entries(arg.items).forEach(ln => {
                    let [name, props] = ln;

                    countItems++;

                    let divLeft = this.createDivLeft(name, props);
                    let divCenter = this.createDivCenter(name, props);
                    let divRight = this.createDivRight(name, props);

                    let li = document.createElement('li');
                    li.setAttribute('id', 'xMenu_' + name);

                    li.appendChild(divLeft);
                    li.appendChild(divCenter);
                    li.appendChild(divRight);

                    if (props.click)
                        li.addEventListener('click', props.click);

                    if (props.subMenu === undefined) {
                        li.addEventListener('click', () => {
                            let timeout = props.checkbox ? 400 : 0;
                            setTimeout(() => {
                                this.eventCloseClick(event, li);
                            }, timeout);
                        })
                    }

                    if (props.checkbox) {
                        li.addEventListener('change', () => {
                            if (divLeft.querySelector('label').classList.contains('checked'))
                                divLeft.querySelector('label').classList.remove('checked')
                            else
                                divLeft.querySelector('label').classList.add('checked');
                        });
                    }

                    this.element.appendChild(li);
                    this.elList[name] = li

                });
            },

            setBackground(arg) {
                if (arg.backgroundParent) {
                    ax.background = arg.backgroundParent;
                    return;
                }

                ax.background = document.createElement('div');
                ax.background.setAttribute('id', 'pnBackgroudxMenu' + arg.id);
                ax.background.classList.add('pnBackgroudxMenu');
                ax.background.style.display = 'none';
            },

            append(arg) {
                if (arg.parent) {
                    arg.parent.appendChild(this.element);
                }
                else {
                    document.body.append(this.element);
                    document.body.append(this.background);
                }
                console.log(arg.el);
                elContainerMenu = document.querySelector(arg.el)
            },

            setOpenMenu(arg) {

                const openMenu = (e) => {
                    if (arg.onOpen)
                        arg.onOpen(ax.elList);

                    let posParent = arg.parent ? arg.parent.getClientRects()[0] : undefined;
                    let parentX = posParent ? posParent.x : 0;
                    let parentY = posParent ? posParent.y : 0;
                    let parentWidth = arg.parentWidth ? arg.parentWidth : 0;
                    // let parentHeight = arg.parentHeight ? arg.parentHeight : 0;

                    let top = parentY === 0 ? e.pageY + 2 : parentY;
                    let left = parentX === 0 ? e.pageX + 2 : parentX + parentWidth;

                    let width = arg.width;
                    let height = arg.height;

                    let windowHeight = window.innerHeight;
                    let windowWidth = window.innerWidth;

                    if (windowHeight - (top + height) < 0)
                        top = windowHeight - height - 2;

                    if (windowWidth - (left + width + parentWidth ) < 0)
                        left = left - width - parentWidth

                    ax.element.style.top = top + 'px';
                    ax.element.style.left = left + 'px';
                    ax.element.style.display = 'block';
                    ax.element.classList.remove('hide');

                    if (arg.animate !== undefined)
                        elContainerMenu.classList.add('animated ' + arg.animate);

                    if (ax.background)
                        ax.background.style.display = 'block'

                    e.preventDefault();
                    e.stopPropagation();
                }

                const hideMenu = (e) => {
                    ax.element.classList.add('hide');
                    e.preventDefault();
                    e.stopPropagation();
                }

                if (arg.parent) {
                    // a implementação de abertura com o hover não deu muito certo, depois tentar novamente.
                    elContainerMenu.addEventListener('mouseenter', openMenu)
                    elContainerMenu.addEventListener('mouseleave', hideMenu);
                    // elContainerMenu.addEventListener('click', openMenu)
                } else {
                    let context = arg.buttonLeft === true ? 'click' : 'contextmenu';
                    elContainerMenu.addEventListener(context, openMenu)
                }

            },

            setCloseMenu() {
                if (ax.background)
                    ax.background.addEventListener('click', this.eventCloseClick);
            },

            eventCloseClick(e, li = undefined) {
                ax.element.classList.add('hide');
                if (ax.background)
                    ax.background.style.display = 'none'

                if (li === undefined)
                    return

                let parentUL = li.parentNode;
                parentUL.classList.add('hide');
                if(parentUL.parentNode && parentUL.parentNode.nodeName == 'LI')
                    this.eventCloseClick(e, parentUL.parentNode);
                
                
            },

            disableAll(arg) {
                Object.keys(arg.items).forEach(key => {
                    this.disableItem(key, arg);
                })
            },

            enableAll(arg) {
                Object.keys(arg.items).forEach(key => {
                    this.enableItem(key, arg);
                })
            },

            disableItem(item, arg) {

                let element = this.elList[item];
                element.disable = true;

                if (element.className.indexOf('dis_ok') === -1) {
                    element.setAttribute('disable', true);

                    if (arg.items[item].click)
                        element.removeEventListener('click', arg.items[item].click)

                    element.classList.add('dis_ok');
                    element.classList.remove('ena_ok');

                    let checkbox = element.querySelector('input[type="checkbox"]');
                    if (checkbox)
                        checkbox.setAttribute('disabled', 'disabled');
                }

            },

            enableItem(item, arg) {
                let element = this.elList[item];
                arg.items[item].disable = false;

                if (element.className.indexOf('ena_ok') === -1) {
                    element.setAttribute('disable', false);

                    if (arg.items[item].click)
                        element.addEventListener('click', arg.items[item].click)

                    element.classList.remove('dis_ok');
                    element.classList.add('ena_ok');

                    let checkbox = element.querySelector('input[type="checkbox"]');
                    if (checkbox)
                        checkbox.removeAttribute('disabled');

                }
            },

            enable(item, boolean) {
                if (boolean)
                    this.enableItem(item, arg)
                else
                    this.disableItem(item, arg)
            },

            setHtml(item, html) {
                let element = this.elList[item];
                if (element)
                    element.getElementsByTagName('span')[0].innerHTML = html;
            },

            setIcon(item, icon) {
                let element = this.elList[item];
                if (element) 
                    element.getElementsByTagName('i')[0].classList = icon + ' icon';
            },

            setDisable(arg) {
                Object.entries(arg.items).forEach(el => {
                    let [key, props] = el;
                    if (arg.disable === true || props.disable === true)
                        this.disableItem(key, arg);
                })
            },

            setCreate(arg) {
                if (arg.onCreate)
                    arg.onCreate();
            },

            setkeyDown() {

                document.addEventListener('keydown', (e) => {

                    if (this.element.classList.contains('hide'))
                        return;

                    let ctrlKey = e.ctrlKey ? "CTRL+" : "";
                    let shiftKey = e.shiftKey ? "SHIFT+" : "";
                    let altKey = e.altKey ? "ALT+" : "";
                    let key = ctrlKey + shiftKey + altKey + e.keyCode;
                    key = key.replace('+16', '').replace('+17', '').replace('+18', '');

                    if (keyDown[key]) {
                        keyDown[key]();
                        this.eventCloseClick();
                        if (e.preventDefault)
                            e.preventDefault();
                        if (e.stopPropagation)
                            e.stopPropagation();
                        return false;
                    }

                })
            },

            subMenuCreate(owner, arg) {
                Object.entries(arg.items).forEach(el => {
                    let [name, props] = el;
                    if (props.subMenu) {
                        create({
                            el: '#xMenu_' + name,
                            items: props.subMenu.items,
                            onOpen: props.subMenu.onOpen,
                            parent: ax.elList[name],
                            parentWidth: arg.width,
                            parentHeight: arg.height,
                            backgroundParent: ax.background
                        }, owner);
                    }
                })
            },

            getDimensionsMenu() {
                /* como a posição do menu é calculada antes do mesmo ser renderizado é
                necessário clonar o objeto pra saber sua largura e altura e depois destrui-lo.*/
                var cloneMenu = this.element.cloneNode(true);
                cloneMenu.setAttribute('type', 'hidden');
                cloneMenu.classList.remove('hide');
                cloneMenu.style.display = 'block';
                cloneMenu.style.top = '-9999px';
                cloneMenu.style.left = '-9999px';

                document.body.appendChild(cloneMenu);
                let width = cloneMenu.offsetWidth;
                let height = cloneMenu.offsetHeight;
                cloneMenu.remove();

                arg.width = width;
                arg.height = height;
            }

        }

        ax.setMain(arg);
        ax.setBackground(arg);
        ax.setList(arg);
        ax.append(arg);
        ax.getDimensionsMenu(arg);
        ax.setOpenMenu(arg);
        ax.setCloseMenu(arg);
        ax.setDisable(arg);
        ax.setCreate(arg);
        ax.setkeyDown();
        ax.subMenuCreate(owner, arg);

        owner.disableAll = () => ax.disableAll(arg);

        owner.enableAll = () => ax.enableAll(arg)

        owner.disableItem = (item) => ax.disableItem(item, arg);

        owner.enableItem = (item) => ax.enableItem(item, arg);

        owner.enable = (item, boolean) => ax.enable(item, boolean);

        owner.setHtml = (item, html) => ax.setHtml(item, html, arg)

        owner.setIcon = (item, icon) => ax.setIcon(item, icon, arg);

    }

    function getVersion() {
        return versao;
    }

    return {
        create: create,
        getVersion: getVersion
    }

})();