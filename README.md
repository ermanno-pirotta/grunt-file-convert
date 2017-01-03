# grunt-file-convert

> Parses a set of input files, applies some custom trasformation to each read line, and writes the result of the trasformation to a set of output files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-convert --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-convert');
```

## The "file_convert" task

### Overview
In your project's Gruntfile, add a section named `file_convert` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  file_convert: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.skipRegex
Type: `String`
Default value: undefined

A string value that is used as a regex to check the lines to be skipped.

#### options.filePrefix
Type: `String`
Default value: ''

A string value that is prepended to the result file.

#### options.filePostfix
Type: `String`
Default value: ''

A string value that is appended to the result file.

#### options.transformer
Type: `Function`
Default value: `function(line, index){return line;}`

A function that applies a transformation to each line of the source file.  

### Usage Examples

#### Skip lines with javascript comments
In this example, skipRegex option is used to skip all the lines which adheres to the javascript multiline comment format. So if the `source` file has the content `/* asdas */ \n abc` the generated result would be `abc`.

```js
grunt.initConfig({
  file_convert: {
    files: {
      'tmp/remove_lines': ['test/fixtures/input_file_with_lines_to_be_removed']
    },

    options: {
        skipRegex: '^\\/\\*.*\\*\/$'
    }
  },
});
```

#### Apply a custom transformer
In this example, a custom transformer is used. So if the `source` file has contains the string `TO BE TRANSFORMED` the generated result in this case would be `TRANSFORMED!!!`

```js
grunt.initConfig({
  file_convert: {
    files: {
      'tmp/trasform_lines': ['test/fixtures/input_file_to_be_transformed']
    },

    options: {
      transformer: function(line){
          var regex = new RegExp("TO BE TRANSFORMED");
          return line.replace(regex,'TRANSFORMED!!!');
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
