setInterval(function() { myFunction() } , 1000);

function myFunction() {
    let d = new Date();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(time);
}
