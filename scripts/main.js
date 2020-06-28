$(document).ready(function () {
    let inputBox = $('#inputData');
    inputBox.val('');
    $('.numBtn, .btn').click(function (e) {
        if (this.id == 'clear')
            inputBox.val('');
        else
            inputBox.val(inputBox.val() + this.innerText.replace('x', ''));
    });
    function pressEnter() {
        try {
            let data = inputBox.val();
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
            if (answer != undefined)
                inputBox.val(answer);
        }
        catch (error) { }
    }
    $('#answerBtn').click(pressEnter);
    $(document).keydown(function (e) {
        let reg = /([0-9*/\*+-\/\(\)\.])+/g;
        try {
            if (e.key.match(reg).length > 0) {
                inputBox.val(inputBox.val() + e.key);
            }
        }
        catch (error) { }
        if (e.keyCode == 13) {
            pressEnter();
        }
        if (e.keyCode == 8) {
            inputBox.val(inputBox.val().substring(0, inputBox.val().length - 1));
        }
    });
});
