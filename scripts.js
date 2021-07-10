// *********************************///////////////*************************************/
// carousel of quotes
// *********************************///////////////*************************************/
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

    $('.section-carousel .carousel-item').first().addClass('active');  
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
// *********************************///////////////*************************************/
// Carousel Videos
// *********************************///////////////*************************************/
function carouselVideos(data) {
    $('.carousel-videos .carousel-inner').append(`
            <div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card mx-auto d-block"> 
                    <img class="card-img-top position-relative" src="${data.thumb_url}" alt="Card image cap">
                    <div class="card-image position-absolute">
                        <img src="/images/play.png" alt="" width="64px" height="64px">
                    </div>
                    <div class="card-body py-3">
                        <h4 class="card-title font-weight-bold color-text">${data.title}</h4>
                        <p class="card-text text-muted">${data['sub-title']}</p>
                        <div class="d-flex align-items-center">
                            <img src="${data.author_pic_url}" class="rounded-circle" alt="..." width="40px" height="40px">
                            <div>
                                <h4 class="font-weight-bold pl-3"><span class="color">${data.author}</span></h4>
                            </div>
                        </div>
                        <div class="d-flex mt-2 justify-content-between">
                            <div class="rating">
                            </div>
                            <div class="minutes">
                                <p><span class="color">${data.duration}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
    
        $('.carousel-videos .carousel-item').first().addClass('active');
        $('#carouselLast .carousel-item').first().addClass('active');

        for (let i = 0; i < 5; i++) {
            if (i < data.star) {
                $('.carousel-videos .carousel-inner .carousel-item:last-child .rating')
                .append(`<img src="/images/star_on.png" alt="" width="15px" height="15px">`)
            } else {
                $('.carousel-videos .carousel-inner .carousel-item:last-child .rating')
                .append(`<img src="/images/star_off.png" alt="" width="15px" height="15px">`)
            }
        }
}

function requestVideos() {
    let url = "https://smileschool-api.hbtn.info/popular-tutorials";
    $.ajax(url, {
        beforeSend: function() {
            $('.loader').show();
        },
        complete: function(){
            $('.loader').hide();
        }
    })
    .done(function(res) {
        res.forEach(item => {
            carouselVideos(item);
        })
    })
}

function carouselVideoSlide() {
    $('#carouselLast').on('slide.bs.carousel', function (e) {
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let itemsPerSlide = 5;
        let totalItems = $('.carousel-videos .carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            let it = itemsPerSlide - (totalItems - idx);
            for (let i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-videos .carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-videos .carousel-inner');
                }
            }
        }
    });

    $('#carouselVideos').on('slide.bs.carousel', function (e) {
        let $e = $(e.relatedTarget);
        let idx = $e.index();
        let itemsPerSlide = 5;
        let totalItems = $('.carousel-videos .carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            let it = itemsPerSlide - (totalItems - idx);
            for (let i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-videos .carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-videos .carousel-inner');
                }
            }
        }
    });
}

// *********************************///////////////*************************************/
// Section courses
// *********************************///////////////*************************************/

function requestCourses(data) {
    // $('.section-result .amount').append(`<p class="text-muted">${data.length} videos</p>`);

    $('.section-result .listCourses').append(`
        <div class="card col-12 col-sm-6 col-md-4 col-lg-3" id="${data.id}">
            <div class="position-relative">
                <img class="card-img-top" src="${data.thumb_url}" alt="Card image cap">
                <div class="card-image position-absolute">
                    <img src="/images/play.png" alt="" width="64px" height="64px">
                </div>
            </div>
            <div class="card-body py-3">
                <h4 class="card-title font-weight-bold color-text">${data.title}</h4>
                <p class="card-text text-muted">${data['sub-title']}</p>
                <div class="d-flex align-items-center">
                    <img src="${data.author_pic_url}" class="rounded-circle" alt="..." width="40px" height="40px">
                    <div>
                        <h4 class="font-weight-bold pl-3"><span class="color">${data.author}</span></h4>
                    </div>
                </div>
                <div class="d-flex mt-2 justify-content-between">
                    <div class="rating">
                    </div>
                    <div class="minutes">
                        <p><span class="color">${data.duration}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `);

    for (let i = 0; i < 5; i++) {
        if (i < data.star) {
            $('.section-result .listCourses .card:last-child .rating')
            .append(`<img src="/images/star_on.png" alt="" width="15px" height="15px">`)
        } else {
            $('.section-result .listCourses .card:last-child .rating')
            .append(`<img src="/images/star_off.png" alt="" width="15px" height="15px">`)
        }
    }
}

function requestApi() {
    let url = "https://smileschool-api.hbtn.info/courses";

    $.get(url, function(data) {
        // request Topics
        data.topics.forEach(elm => {
            let text = capitalize(elm);
            $('#topic').append(`<option value="${text}" class="option">${text}</option>`);
        })
        $("#topic option[value=All]").attr("selected","selected");

        //request Sort Keys
        data.sorts.forEach(elm => {
            let text = elm.split('_').map(t => capitalize(t)).join(' '); //transform lowercase to capitalize word
            $('#sort').append(`<option value="${elm}" class="option">${text}</option>`);
        })
        $("#sort option[value=most_popular]").attr("selected","selected");

    });

    $('.target').on('change', function() {
        $.ajax(url, {
            beforeSend: function() {
                $('.loader').show();
            },
            complete: function(){
                $('.loader').hide();
            }
        })
        .done(function(res) {
            $('.section-result .listCourses .card').remove();
            if ($('#sort').val() === "most_recent" && $('#topic').val() !== "All") {
                if ($('#search').val() !== "") {
                    let value = capitalize($('#search').val());
                    res.courses.filter(item => item.topic === $('#topic').val() && item.keywords.includes(value)).sort(function(a, b) {
                        return b.published_at - a.published_at;
                    }).forEach(item => {
                        requestCourses(item);
                    });
                }
                else {
                    res.courses.filter(item => item.topic === $('#topic').val()).sort(function(a, b) {
                        return b.published_at - a.published_at;
                    }).forEach(item => {
                        requestCourses(item);
                    });
                }

            } else if ($('#sort').val() === "most_viewed" && $('#topic').val() !== "All")  {
                if ($('#search').val() !== "") {
                    let value = capitalize($('#search').val());
                    res.courses.filter(item => item.topic === $('#topic').val() && item.keywords.includes(value)).sort(function(a, b) {
                        return b.views - a.views;
                    }).forEach(item => {
                        requestCourses(item);
                    });
                } else {
                    res.courses.filter(item => item.topic === $('#topic').val()).sort(function(a, b) {
                        return b.views - a.views;
                    }).forEach(item => {
                        requestCourses(item);
                    });
                }

            } else if ($('#sort').val() === "most_popular" && $('#topic').val() !== "All") {
                if ($('#search').val() !== "") {
                    let value = capitalize($('#search').val());
                    res.courses.filter(item => item.topic === $('#topic').val() && item.keywords.includes(value)).forEach(item => {
                        requestCourses(item);
                    });
                } else {
                    res.courses.filter(item => item.topic === $('#topic').val()).forEach(item => {
                        requestCourses(item);
                    });
                }
            } else {
                start();
            }
        })
    });
}

function start() {
    let url ="https://smileschool-api.hbtn.info/courses";
    $.ajax(url, {
        beforeSend: function() {
            $('.loader').show();
        },
        complete: function(){
            $('.loader').hide();
        }
    }).
    done(function(res) {
        res.courses.forEach(item => {
            requestCourses(item);
        });
    })
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}


$().ready(request(),
    requestVideos(),
    start(),
    carouselVideoSlide(),
    requestApi()
);
