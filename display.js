//global variables for pages
let begin = 0;
let end = 8;


function displaySearchAddress(data){
	$('.rep-display-title').text(renderRepDisplayTitle(data));
}

function nextButton(results){
	$('main').on('click', '.next', function () {
        begin = end;
        end += 8;
        let displayed = results.slice(begin, end);
        $('.rep-box-container').html(displayed);
        $('.prev').css('display', 'inline');
        if (end >= results.length) {
            $('.next').css('display', 'none');
        }
    });
}

function prevButton(results){
	$('main').on('click', '.prev', function () {
        end = begin;
        begin -= 8;
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
	end = 8;

	//displaying 8 official per page
	$('.next').css('display', 'inline');
	$('.prev').css('display', 'none');
	let displayed = results.slice(begin, end);
    $('.rep-box-container').html(displayed);

    //navigating each page
    nextButton(results);
    prevButton(results);
}

function displayModals(officials){
	let results = officials.map(official => renderModal(official));

	$('main').on('click', '.expand', function(){
        let repName = $(this).attr('id');
        officials.forEach(function(official, index){
            if(official.name === repName){
                $('.rep-modal-container').html(results[index]);
                $('.modal').css('display', 'block');
            }
        });
    });
    
    $('main').on('click', '.closeBtn', function(){
        $('.modal').css('display', 'none');
    });

}

function displayCivicErr() {
	$('.rep-display-title').text('Address submitted is not valid, please enter a valid US address');
}



























