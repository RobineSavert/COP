$(window).load(function(){


    $.Isotope.prototype._masonryReset = function() {
        // layout-specific props
        this.masonry = {};
        this._getSegments();
        var i = this.masonry.cols;
        this.masonry.colYs = [];
        while (i--) {
            this.masonry.colYs.push( 0 );
        }

        if ( this.options.masonry.cornerStampSelector ) {
            var $cornerStamp = this.element.find( this.options.masonry.cornerStampSelector ),
                stampWidth = $cornerStamp.outerWidth(true) - ( this.element.width() % this.masonry.columnWidth ),
                cornerCols = Math.ceil( stampWidth / this.masonry.columnWidth ),
                cornerStampHeight = $cornerStamp.outerHeight(true);

            //use for right stamp -> for ( i = ( this.masonry.cols - cornerCols ); i < this.masonry.cols; i++ ) {
            for ( i = 0; i < ( this.masonry.cols - cornerCols, cornerCols ); i++ ) {
                this.masonry.colYs[i] = cornerStampHeight;
            }
        }
    };

    var $container = $('#container'),
        filters = {};
    $container.imagesLoaded(function(){
        $container.isotope({

            layoutMode : 'masonry',
            itemSelector : '.element',
            sortBy: 'random',
            masonry: {
                columnWidth: 10,
                cornerStampSelector: '.corner-stamp'

            }
        });
    });




    // filter buttons
    $('.filter a').click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
            return;
        }

        var $optionSet = $this.parents('.option-set');
        // change selected class
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // store filter value in object
        // i.e. filters.color = 'red'
        var group = $optionSet.attr('data-filter-group');
        filters[ group ] = $this.attr('data-filter-value');
        // convert object into array
        var isoFilters = [];
        for ( var prop in filters ) {
            isoFilters.push( filters[ prop ] )
        }
        var selector = isoFilters.join('');
        $container.isotope({ filter: selector });

        return false;
    });

});


$(function(){
    $('.all-option').click(function(){
        $('html').removeClass('silent-moon gypsy-soul free-spirit arabian-collection');
    });

    $('.arabian-collection-option').click(function(){
        $('html').removeClass('silent-moon gypsy-soul free-spirit').addClass('arabian-collection');
    });

    $('.silent-moon-option').click(function(){
        $('html').removeClass('arabian-collection gypsy-soul free-spirit').addClass('silent-moon');
    });

    $('.gypsy-soul-option').click(function(){
        $('html').removeClass('silent-moon arabian-collection free-spirit').addClass('gypsy-soul');
    });
    $('.free-spirit-option').click(function(){
        $('html').removeClass('silent-moon arabian-collection gypsy-soul').addClass('free-spirit');
    });

    $("a[href='#top']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
	