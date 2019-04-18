import 'whatwg-fetch'; // fetch support for old browsers
// import testRecords from './ignore/testRecords';

/**
 * account lead lookup javascript
 * requires chosen.js and jQuery are present.
 */
document.addEventListener('DOMContentLoaded', () => {
    const $ = jQuery;

    // helpers for display/hiding elements
    const showLoading = () => $('#account-lead-lookup--loading').removeClass('hidden');    
    const hideLoading = () => $('#account-lead-lookup--loading').addClass('hidden');

    const showContent = () => $('#account-lead-lookup--content').removeClass('hidden');    
    const hideContent = () => $('#account-lead-lookup--content').addClass('hidden');

    const showError = () => $('#account-lead-lookup--error').removeClass('hidden');    
    const hideError = () => $('#account-lead-lookup--error').addClass('hidden');

    // build hash map of records for quicker lookup
    const buildRecordMap = (records) => records.reduce((acc, cur) => {
        acc[cur.Id] = cur;
        return acc;
    }, {});

    // build options for select/dropdown to display
    const buildOptions = ($select, records) => {
        let option;

        records.forEach((record) => {
            option = document.createElement('option');
            option.value = record.Id;
            option.text = record.Name;
            $select.append(option);
        });
    };

    // main functionality - build options, attach listeners, hide/display the things..
    const accountLeadLookup = (records) => {
        const $select = $('#account-lead-lookup--search select');
        // build map of records for faster lookup
        const recordsById = buildRecordMap(records);
        // build list of options for chosen.js to build from
        buildOptions($select, records);
        // initialize dropdown using chosen.js
        $select.chosen({ width: "100%" });
        // populate records info on click
        $select.change((event) => {
            const { value } = event.target;
            const record = recordsById[value];

            if (record) {
                const {
                    Name: name,
                    DOT_Email__c: email,
                    CDT_Office_Phone__c: phone,
                    CDT_Photo__c: src,
                } = record.DOT_Account_Lead__r;
                
                const $dept = $('[data-lookup-id=dept]');
                $dept.text(record.Name);
                
                const $img = $('[data-lookup-id=img]');
                $img.attr('src', src);
                $img.attr('alt', `Profile picture for ${name}`);
                
                const $name = $('[data-lookup-id=name]');
                $name.text(name);
                
                const $email = $('[data-lookup-id=email]');
                $email.attr('href', `mailto:${email}`);
                $email.text(email);
                
                const $phone = $('[data-lookup-id=phone]');
                $phone.attr('href', `tel:${phone}`);
                $phone.text(phone);

                showContent();
            } else {
                hideContent();
            }
        });

        hideLoading();
    };

    // error handling for any issues with fetching/processing records
    const setError = (error) => {
        const errorMessage = error && error.message || '';
        // set error message        
        $('[data-lookup-id=error-message]').text(errorMessage);
        // retry on button click
        $('[data-lookup-id=error-button]').click(() => {
            hideError();
            showLoading();
            run();
        });
        // hide other stuff
        hideLoading();
        hideContent();
        // show the error
        showError();
    }

    // get records then process them
    const run = () => {
        const options = { headers: { 'Content-Type': 'application/json' } };
        const account = process.env.DEPLOY_ACCOUNT;
        const container = process.env.DEPLOY_CONTAINER;

        fetch(`https://${account}.blob.core.windows.net/${container}/all.json`, options)
            .then(res => res.json())
            .then(res => accountLeadLookup(res.records))
            .catch(setError)
    };

    run();

    // const testRun = () => {
    //     accountLeadLookup(testRecords);
    // }
    
    // setTimeout(testRun, 12000);
});
