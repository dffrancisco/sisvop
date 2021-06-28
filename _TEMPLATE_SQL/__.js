
$(function () {
    exemplo.getExemplo()
});


var exemplo = (function () {

    function getExemplo() {
        axios.post('empresa/per.empresa.php', {
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
