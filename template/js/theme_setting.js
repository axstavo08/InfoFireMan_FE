//BEGIN THEME SETTING
$('#theme-setting > a.btn-theme-setting').click(function(){
    if($('#theme-setting').css('right') < '0'){
        $('#theme-setting').css('right', '0');
    } else {
        $('#theme-setting').css('right', '-250px');
    }
});

// Begin Change Theme Color
var list_style = $('#theme-setting > .content-theme-setting > select#list-style');
var list_color = $('#theme-setting > .content-theme-setting > ul#list-color > li');
// FUNCTION CHANGE URL STYLE ON HEAD TAG
var setTheme = function (style, color) {
    $.cookie('style',style);
    $.cookie('color',color);
    $('#theme-change').attr('href', 'css/themes/'+ style + '/' + color + '.css');
}
// INITIALIZE THEME FROM COOKIE
// HAVE TO SET VALUE FOR STYLE&COLOR BEFORE AND AFTER ACTIVE THEME
if ($.cookie('style')) {
    list_style.find('option').each(function(){
        if($(this).attr('value') == $.cookie('style')) {
            $(this).attr('selected', 'selected');
        }
    });
    list_color.removeClass("active");
    list_color.each(function(){
        if($(this).attr('data-color') == $.cookie('color')){
            $(this).addClass('active');
        }
    });
    setTheme($.cookie('style'), $.cookie('color'));
};
// SELECT EVENT
list_style.on('change', function() {
    list_color.each(function() {
        if($(this).hasClass('active')){
            color_active  = $(this).attr('data-color');
        }
    });
    setTheme($(this).val(), color_active);
});
// LI CLICK EVENT
list_color.on('click', function() {
    list_color.removeClass('active');
    $(this).addClass('active');
    setTheme(list_style.val(), $(this).attr('data-color'));
});
// End Change Theme Color
//END THEME SETTING
