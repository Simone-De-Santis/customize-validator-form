console.log('start')

$(document).ready(function () {


    $('.form').submit(function (e) {
        e.preventDefault()
        console.log('field', e.target)
    })

})