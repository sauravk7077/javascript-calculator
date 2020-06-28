$(document).ready(function () {
    let input = $('#inputData').get(0);
    $('.numBtn, .btn').click(function (e) {
        if (this.id == 'clear')
            input.value = '';
        else
            input.value += this.innerText.replace('x²', '²');
    });
    function pressEnter() {
        try {
            let data = input.value;
            data = data.replace('×', '*').replace('÷', '/').replace('(', '*(');
            let regex = /([1-9])+\²/g;
            let p = data.match(regex);
            if (p != undefined) {
                for (const a of p) {
                    let chars = data.substring(data.indexOf(a), data.indexOf('²'));
                    data = data.replace(a, `Math.pow(${chars}, 2)`);
                }
            }
            let answer = eval(data);
            console.log(data);
            if (answer != undefined)
                input.value = answer;
        }
        catch (error) { }
    }
    $('#answerBtn').click(pressEnter);
    $(document).keydown(function (e) {
        let reg = /([0-9*/\*+-\/\(\)\.])+/g;
        try {
            if (e.key.match(reg).length > 0) {
                input.value += e.key;
            }
        }
        catch (error) { }
        if (e.keyCode == 13) {
            pressEnter();
        }
        if (e.keyCode == 8) {
            input.value = input.value.substring(0, input.value.length - 1);
        }
    });
});
