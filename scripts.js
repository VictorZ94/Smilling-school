function carrouselQuotes(data) {
    $('.section-carousel .carousel-inner').append(`<div class="carousel-item">
        <blockquote>
            <div class="container">
                <div class="row align-items-center px-md-5">
                    <div class="col-sm-3 text-center">
                        <img class="img-carousel rounded-circle" src="${data.pic_url}" alt="...">
                    </div>
                    <div class="col-sm-9 mt-5 mt-sm-0">
                        <p class="text-white"><span>&#171;</span>${data.text}<span>&#187;</span></p>
                        <h3 class="text-white">${data.name}</h3>
                        <small class="text-white">${data.title}</small>
                    </div>
                </div>
            </div>
        </blockquote>
    </div>`);

    $('div.carousel-item').first().addClass('active');  
}

function request() {
    let url = "https://smileschool-api.hbtn.info/quotes";
    $.ajax(url, {
        beforeSend: function() {
            $('#spinner').show();
        },
        complete: function(){
            $('#spinner').empty();
        }
    })
    .done(function(response) {
        response.forEach(item => {
            carrouselQuotes(item);
        })
    })
}

$().ready(request());