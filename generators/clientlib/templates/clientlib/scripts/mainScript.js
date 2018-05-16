/**
 * <%= jsDescription %>
 *
 * @author      Accenture
 *
 * @date        <%= currentDate %>
 * @version     1.0
 *
 * @copyright   Copyright <%= currentYear %> by Carmichael-Lynch. 110 North 5th St., Minneapolis, MN 55403 USA. All rights reserved.
 * This software is the confidential and proprietary information of Carmichael-Lynch. ("Confidential Information").
 */

/* eslint no-console: ["error", { allow: ["log", "error"] }] */
/**
 * [description]
 * @param  {object} <%= namespace %> [<%= namespace %> namespace]
 * @param  {Object} $      [jQuery]
 * @return {Object}        [Initiated Object with all the public functionality and attributes]
 */

(function(<%= namespace %>, $) {
    /**
     * New component main functionality
     * @return {object} [object with the new compoent page functionality]
     */
    const NewComponent = (() => {
        //==========================================================================
        // 1.0 VARIABLES
        //==========================================================================
        // CONSTANTS
        const CURRENT_LANGUAGE = 'en';
        //--------------------------------------------------------------------------
        let _privateData = {};
        let _cacheElements = {};
        let _publicNewCompoent = {};

        //==========================================================================
        // 2.0 PRIVATE FUNCTIONS
        //==========================================================================
        /**
         * Cache all elements that will be use
         */
        function cache() {
            _cacheElements.testingLink = $('.testing-link');
        }

        /**
         * [bind description]
         * @return {[type]} [description]
         */
        function bind() {
            // Create necessary binds to the DOM
            // Include the off and on to reset the binds
            _cacheElements.testingLink.off('click');
            _cacheElements.testingLink.on('click', (event) => {
                event.preventDefault();
            });
        }

        /**
         * [getServiceData description]
         * @return {[type]} [description]
         */
        function getServiceData() {
            $.getJSON('/vendor/example.json', (exampleData) => {
                updatePrivateData(exampleData);
            });
        }

        /**
         * [init description]
         */
        function init() {
            //cache elements
            cache();
            //init binds
            bind();
        }
        //==========================================================================
        // 3.0 PUBLIC FUNCTIONS
        //==========================================================================
        /**
         * [reset description]
         */
        _publicNewCompoent.reset = () => {
            cache(); // cache the elements
            bind(); // set the event binds
        };

        //--------------------------------------------------------------------------
        // Self Initialize the component before the return
        init();
        //--------------------------------------------------------------------------
        return Object.seal(_publicNewCompoent);
    })();

    // Set component object to the global namespace
    <%= namespace %>.NewComponent = NewComponent;
})(window.<%= namespace %> = window.<%= namespace %> || {}, jQuery);
// NOTE: !IMPORTANT add aditional dependencies always at the end of the parameters
