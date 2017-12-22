$(document).ready(function () {
    $('#header_search_input').keyup(function () {
        var query = $(this).val().trim();
        if (!query.length) {
            // Clear results if search input is empty
            $('#jquery-live-search').html('');
            return;
        }
        // Add category ID to search request if it is set
        var categoryId = jQuery('#search-categories-id').val();
        var category = categoryId ? '&filters=' + categoryId : '';
        // Trigger liveSearch keyup
        $('#product_search').val(query + category).keyup();
    });

    $('#product_search').liveSearch({url: '/search/context?keyword='});

    $('form.search input[name="keyword"]').each(function () {
        checkEmptySearchInput($(this));
    });

    $('form.search input[name="keyword"]').keyup(function () {
        checkEmptySearchInput($(this));
    });

    // Disable search submit button if search query is empty
    function checkEmptySearchInput(input) {
        var keyword = input.val().trim();
        // Don't allow search phrase to begin with space
        if (!keyword.length) {
            input.val('');
        }
        var submitButton = input.closest('form').find('button[type="submit"]');
        var disabled = !keyword.length;
        submitButton.prop('disabled', disabled);
    }

    // Show/hide categories selection block
    $('#search-categories-input').click(function () {
        $('#search-categories-block').toggle().toggleClass('search-categories-opened');
    });

    // Open categories in a group
    $('.search-group').click(function () {
        // Selected group
        var groupName = $(this).attr('data-groupName');
        // Currently opened group
        var openedGroupName = $('.search-group-opened').attr('data-groupName');
        // Close all groups
        $('.search-group-block').removeClass('search-group-opened').hide(200);
        // Open selected group
        if (groupName !== openedGroupName) {
            $('div[data-groupName="' + groupName + '"]').addClass('search-group-opened').show(200);
        }
    });

    // Change input category upon selection
    $('a.search-category').click(function () {
        // Set category ID
        $('#search-categories-id').val('categories_id:' + $(this).attr('data-categoryId'));
        // Set category name
        $('#search-categories-input').html($(this).text() + ' &blacktriangledown;');
        // Highlight selected category
        highlightSelected($(this));
        // Hide selection block
        $('#search-categories-block').hide();
        // Close all groups
        $('.search-group-block').removeClass('search-group-opened').hide(200);
        // Scroll to the top of the page
        $('html, body').animate({scrollTop : 0}, '500');
    });

    // Hide search results on click outside
    $(document).click(function (e) {
        if (e.target.id !== 'jquery-live-search') {
            $('#jquery-live-search').slideUp(100);
        }
    });

    // Hide categories selection block on click outside it
    $(document).click(function (e) {
        if (e.target.id !== 'search-categories-input' && e.target.id !== 'search-categories-block' && $(e.target).attr('class') !== 'search-group') {
            $('#search-categories-block').hide();
            $('#search-categories-block').removeClass('search-categories-opened');
        }
    });

    highlightSelected();

    // Highlight selected category in selection block
    function highlightSelected(category) {
        if (!category) {
            $('.search-group-block a').first().addClass('search-categories-selected');
            return;
        }

        $('.search-category').each(function (index, item) {
            $(item).removeClass('search-categories-selected');
        });
        category.addClass('search-categories-selected');
    }
});
