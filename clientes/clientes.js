
$(function () {
    exemplo.getExemplo()
});


var exemplo = (function () {

    function getExemplo() {
        axios.post('clientes/per.clientes.php', {
            call: 'exemplo'
        })
            .then(r => {
                console.log(r);
            })
    }

    return {
        getExemplo: getExemplo
    }
})();
