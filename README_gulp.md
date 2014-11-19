# Front End Development #

## Directory structure ##

* **source** - Work in here
* **deploy** - This is what you upload to your server
* **test** - Do your Jasmine BDD JavaScript unit testing in here (see [below](#jasmine) for more info)
* **documentation** - This is where your JSDoc3 API docs will be output (see [below](#jsdoc) for more info)


## NodeJS, NPM & Gulp ##

You need to install NodeJS and NPM (Node Package Manager) for your OS: [https://www.google.nl/search?q=install+npm&oq=install+npm] (https://www.google.nl/search?q=install+npm&oq=install+npm)

For Mac, I use Homebrew:

    ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
    brew install nodejs

For Windows, I prefer Chocolatey:

    @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

    cinst nodejs.install

On Linux distro's, just use your package manager of choice, but make sure you get at least v0.10.2+ and that you also get npm.


Once you have NodeJS and NPM installed, open a terminal window / command prompt and navigate to the root of the project (where gulpfile.js and package.json are located).

    cd /path/to/project

Now install Gulp globally:

    sudo npm install -g gulp

And then install the npm dependencies defined in package.json:

    npm install

## Gulp tasks ##

The complete list of commands for the gulp tasks is:

    # do a full build:
    gulp
    
    # process JS files (concat & minify to xs4all.js and vendors.js):
    gulp js
    
    # process SASS / CSS files (compile SASS, add browser prefixes,
    # concat & minify to desktop.css, mobile.css, print.css, tablet.css & xs4all.css)
    gulp css
    
    # watch for SASS / JS / JS Vendor source changes (runs the appropriate sub-task from
    # those listed above depending on which file was changed)
    gulp watch
    
    # copy resources to the deploy directory
    gulp resources

    # copy HTML to the deploy directory
    gulp html

    # run Jasmine BDD JavaScript tests
    gulp test

    # run JSHint checks
    gulp jshint
    
    # generate JSDoc documentation
    gulp jsdoc

**All these commands must be run in the root directory of the project (where gulpfile.js is)!**

There are also smaller tasks that make up each of the ones listed above, but these are not really useful on their own.

<a name="jsdoc"></a>
## JavaScript Documentation ##

Use JSDoc3 standard for inline documentation for all your code: [@use JSDoc](http://usejsdoc.org/index.html)

Then, when you run `gulp jsdoc` or just `gulp` for a complete build, you will get lovely, autogenerated API docs here:

    build/build/output/documentation/jsdoc/XS4ALL/index.html

<a name="jshint"></a>
## JavaScript quality & convention checking (LINT) ##

Running `gulp jshint`, `gulp js` or just `gulp` for a full build will cause JSHint analysis to be run against all the JavaScript source code.
Any problems will only be output to the console (not to a file).
Make sure you watch this and keep your code nice!

To add or remove rules, edit the `www/.jshintrc` file.
See [here](http://www.jshint.com/docs/options/) for a list of options.

If JSHint is complaining that an object "is not defined." that you know is defined in another file (like `$`, `jQuery`, `window`, `XS4ALL` etc.) then you can add it to the "predef" list in `www/.jshintrc`

<a name="jasmine"></a>
## JavaScript Unit Testing ##

You should unit test ALL your classes and methods!

*   Your test specs should go in `test/js/specs` and be named `classname-spec.js`.
*   You then need to import your new spec in `test/js/specrunner.html` under the `<!-- Include spec files -->` section.
*   You also need to import the new class file you are testing under the `<!-- Include source files -->` section.
*   Finally, if you have added any new 3rd party vendor files, you need to import them under the `<!-- Include vendor files -->` section.

For instructions on how to write Jasmine BDD 2.0 test specs, see [here](http://jasmine.github.io/2.0/introduction.html)

If you need to stub commonly used objects or write test helper functions, do so in `test/js/specs/spec-helper.js`

Running `gulp test` or just `gulp` for a full build will cause Jasmine BDD to run all your specs.

You can also run the tests in your browser by opening `test/js/specrunner.html`. This is REALLY useful because you can use the JavaScript console / Firebug / whatever to debug not only the tests, but also the source code they are testing!