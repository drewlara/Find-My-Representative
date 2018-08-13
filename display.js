//global variables for pages
const PAGE_INTERVAL = 8
let begin = 0;
let end = 8;

function displaySearchAddress(data){
	$('.rep-display-title').text(renderRepDisplayTitle(data));
}

function nextButton(results){
	$('main').off('click', '.next');
	$('main').on('click', '.next', function (event) {
        event.preventDefault();
        begin = end;
        end += PAGE_INTERVAL;
        console.log('nextButton: ','begin:', begin, 'end:', end);
        let displayed = results.slice(begin, end);
        $('.rep-box-container').html(displayed);
        $('.prev').css('display', 'inline');
        if (end >= results.length) {
            $('.next').css('display', 'none');
        }
    });
}

function prevButton(results){
	$('main').off('click', '.prev');
	$('main').on('click', '.prev', function (event) {
        event.preventDefault();
        end = begin;
        begin -= PAGE_INTERVAL;
        console.log('prevButton: ','begin:', begin, 'end:', end);
        let displayed = results.slice(begin, end);
        $('.rep-box-container').html(displayed);
        $('.next').css('display', 'inline');
        if (begin <= 0 || end >= results.length) {
            $('.prev').css('display', 'none');
        }
    });
}

function displayBox(officials){
	let results = officials.map(official => renderBox(official));

	//empty container
	$('rep-box-container').empty();

	//reset global variables for pages
	begin = 0;
	end = PAGE_INTERVAL;

	//displaying 8 official per page
	$('.next').css('display', 'inline');
	$('.prev').css('display', 'none');
	console.log('displayBox: ','begin:', begin, 'end:', end);
	let displayed = results.slice(begin, end);
    $('.rep-box-container').html(displayed);

    //navigating each page
    nextButton(results);
    prevButton(results);
}

function displayModals(officials){
	let results = officials.map(official => renderModal(official));

	$('main').on('click', '.expand', function(event){
        event.preventDefault();
        let repName = $(this).attr('id'); //data attr
        officials.forEach(function(official, index){
            if(official.name === repName){
            	getDataFromNewsApi(official, displayModalNews);
                $('.rep-modal-container').html(results[index]);
                $('.modal').css('display', 'block');
            }
        });
    });
    
    $('main').on('click', '.closeBtn', function(){
        $('.modal').css('display', 'none');
    });

}

function displayModalNews(newsData) {
	results = newsData.articles.map(article => renderModalNews(article))
	$('.modal-news').html(results);
}

function displayCivicErr() {
	$('.rep-display-title').text('Address submitted is not valid, please enter a valid US address');
}

function displayNewsErr() {
	$('.modal-news-container').text('ERROR FETCHING ARTICLES');
}

























