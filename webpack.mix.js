const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

mix.js('resources/js/embedded.js', 'public/js');
mix.js('resources/js/custom-survey.js', 'public/js');

mix.sass("resources/css/normalize.scss", 'public/css', []);

mix.webpackConfig({
    output: {
        publicPath: process.env.MIX_APP_URL + '/'
    }
});
