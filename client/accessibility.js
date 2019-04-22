// Attaches accessibiliity, until added to core package.. based off:
// https://github.com/harvesthq/chosen/pull/2596
// https://github.com/harvesthq/chosen/issues/264#issuecomment-215124540
const withAccessibility = ($) => {
    const $select = $('#account-lead-lookup--search select');
    const $input = $('.chosen-search-input');
    const $list = $('.chosen-results');

    // add aria elements to the search input box
    $input.attr('role', 'combobox');
    $input.attr('aria-owns', 'account-lead-lookup--search-results');
    $input.attr('aria-autocomplete', 'list');
    $input.attr('aria-label', 'Select a Department');

    $input.on('keydown', () => {
        const $options = $('.chosen-results .active-result');
        // add attributes to each individual option in the list of options
        $options.each((i, option) => {
            const $option = $(option);
            $option.attr('id', `account-lead-lookup--search-results-${i}`);
            $option.attr('role', 'option');
        });

        const id = $('.chosen-results .active-result.highlighted').attr('id');
        $input.attr('aria-activedescendant', id);
    });

    // add attributes to the list of options
    $list.attr('id', 'account-lead-lookup--search-results');
    $list.attr('role', 'listbox');
    $list.attr('aria-busy', 'true');

    $select.on('chosen:showing_dropdown', () => {
        $input.attr('aria-expanded', 'true');
        $list.attr('aria-busy', 'false');
    });

    $select.on('chosen:hiding_dropdown', () => {
        $input.attr('aria-expanded', 'false');
    });
}

export default withAccessibility;