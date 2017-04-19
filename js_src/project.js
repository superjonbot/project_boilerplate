/**
 * Project Instance
 * by Jonathan Robles
 *
 * Date: 12/16/15
 *
 */

// Start Receiver instance

require(['js_src/modules/base/extendedmodule'],
    function (Instance) {

        window.myProject = new Instance({
            //variable:value
        });

        window.myProject.init();

    });



