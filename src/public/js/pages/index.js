$(function () {
    $(document).on('click', 'a.bookmarklet', function onBookmarkClick() {
        alert('Please drag the bookmarklet of your choice, like the one you just clicked, to your bookmarks bar. Then, when viewing a record in Dynamics CRM, click the bookmark to activate it.');
        return false;
    });
});